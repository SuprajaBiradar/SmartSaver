import React from 'react';
import '../styles/Dashboard.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faWallet,
  faTags,
  faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-page">
        <main style={{flex: 1, width: '100%'}}>
          <h1 className="dashboard-heading">SmartSaver Your BudgetBuddy</h1>
          <h2 className="dashboard-subheading">
            Smarter Spending Starts With SmartSaver
          </h2>
          <p className="dashboard-description">
            Access your finances instantly – track expenses, analyze spending, and discover great deals!
          </p>

          <div className="dashboard-cards">
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <FontAwesomeIcon icon={faWallet} className="card-icon" />
                <h3><a href="/expenses">Track Expenses</a></h3>
                <p>Monitor all your monthly spending in one place.</p>
              </div>

              <div className="dashboard-card">
                <FontAwesomeIcon icon={faChartPie} className="card-icon" />
                <h3><a href="/analysis">Analysis</a></h3>
                <p>Get smart insights on your spending behavior.</p>
              </div>

              <div className="dashboard-card">
                <FontAwesomeIcon icon={faTags} className="card-icon" />
                <h3><a href="/dealfinder">Best Deals</a></h3>
                <p>Discover top discounts across online platforms.</p>
              </div>

              <div className="dashboard-card">
                <FontAwesomeIcon icon={faMoneyBillWave} className="card-icon" />
                <h3><a href="/payments">Upcoming Payments</a></h3>
                <p>Never miss a bill – stay notified on due dates.</p>
              </div>
            </div>

          </div>
        </main>
      </div>

      <footer className="footer">
        © 2025 <strong> SmartSaver</strong>. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
