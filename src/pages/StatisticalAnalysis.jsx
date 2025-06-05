import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';
import '../styles/StatisticalAnalysis.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const StatisticalAnalysis = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('pie'); // default chart

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const q = query(
          collection(db, 'transactions'),
          where('type', '==', 'expense'),
          where('date', '>=', Timestamp.fromDate(startOfMonth)),
          orderBy('date', 'desc')
        );

        const snapshot = await getDocs(q);

        const expensesList = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: data.date?.toDate ? data.date.toDate() : new Date(),
          };
        });

        setExpenses(expensesList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <div className="loading">Loading data...</div>;

  const totalExpense = expenses.reduce((acc, cur) => acc + (cur.amount || 0), 0);

  const expenseByCategory = expenses.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + (cur.amount || 0);
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        label: 'Expense by Category',
        data: Object.values(expenseByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8BC34A',
          '#FF9800',
          '#9C27B0',
          '#00BCD4',
          '#E91E63',
        ],
        hoverOffset: 10,
      },
    ],
  };

  const expenseByDate = {};
  expenses.forEach(exp => {
    const dateKey = exp.date.toLocaleDateString('en-CA');
    expenseByDate[dateKey] = (expenseByDate[dateKey] || 0) + (exp.amount || 0);
  });

  const sortedDates = Object.keys(expenseByDate).sort();

  const barData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Daily Expenses (₹)',
        data: sortedDates.map(date => expenseByDate[date]),
        backgroundColor: '#42A5F5',
      },
    ],
  };

  let cumulative = 0;
  const lineData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Cumulative Expense (₹)',
        data: sortedDates.map(date => {
          cumulative += expenseByDate[date];
          return cumulative;
        }),
        fill: false,
        borderColor: '#FF6384',
        tension: 0.3,
      },
    ],
  };

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return <Pie data={pieData} />;
      case 'bar':
        return <Bar data={barData} />;
      case 'line':
        return <Line data={lineData} />;
      default:
        return null;
    }
  };

  return (
    <div className="statistical-analysis-container">
      <h2>📊 Expense Statistical Analysis (This Month)</h2>

      <div className="summary">
        <h3>Total Expenses: ₹{totalExpense.toFixed(2)}</h3>
        <p>Total Transactions: {expenses.length}</p>
      </div>

      <div className="chart-type-selector">
        <label htmlFor="chart-select">Choose chart type:</label>
        <select
          id="chart-select"
          value={chartType}
          onChange={e => setChartType(e.target.value)}
        >
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Graph</option>
          <option value="line">Line Chart</option>
        </select>
      </div>

      <div className="chart-container">{renderChart()}</div>
    </div>
  );
};

export default StatisticalAnalysis;



