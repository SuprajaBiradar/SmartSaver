import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Expenses.css';

const Expenses = ({ onExpensesFetched }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
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

        if (onExpensesFetched) {
          onExpensesFetched(expensesList);
        }

      } catch (error) {
        console.error('Error fetching expenses:', error);
        setLoading(false);
      }
    };

    fetchMonthlyExpenses();
  }, [onExpensesFetched]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhoto(file);

    try {
      const imageRef = ref(storage, `receipts/${uuidv4()}-${file.name}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImageURL(url);
      extractTextFromImage(url);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const extractTextFromImage = async (url) => {
    try {
      const res = await fetch('https://api.ocr.space/parse/imageurl', {
        method: 'POST',
        headers: {
          apikey: 'K86174280588957',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `url=${encodeURIComponent(url)}&language=eng`,
      });

      const data = await res.json();
      const parsedText = data.ParsedResults?.[0]?.ParsedText || '';
      setOcrText(parsedText);

      const match = parsedText.match(/\$?(\d+(\.\d{2})?)/);
      if (match) {
        setAmount(match[1]);
      }
    } catch (err) {
      console.error('OCR failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category) {
      alert("Please enter amount and category");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'transactions'), {
        amount: parseFloat(amount),
        category,
        type: 'expense',
        date: Timestamp.now(),
        photoName: photo ? photo.name : '',
        receiptURL: imageURL || '',
      });

      const newExpense = {
        id: docRef.id,
        amount: parseFloat(amount),
        category,
        type: 'expense',
        date: new Date(),
        photoName: photo ? photo.name : '',
        receiptURL: imageURL || '',
      };

      setExpenses(prev => [newExpense, ...prev]);

      setAmount('');
      setCategory('');
      setPhoto(null);
      setImageURL('');
      setOcrText('');

      alert('Expense added!');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense.');
    }
  };

  if (loading) return <div>Loading expenses...</div>;

  return (
    <div className="expenses-container">
      <h1>🧾Expenses</h1>

      <h2>This Month's Expenses</h2>
      <ul className="expense-list">
        {expenses.length > 0 ? (
          expenses.map((exp) => (
            <li key={exp.id}>
              <strong>{exp.date.toLocaleDateString()}</strong> - {exp.category} - ₹{exp.amount.toFixed(2)}
              {exp.receiptURL && (
                <div>
                  <img
                    src={exp.receiptURL}
                    alt="Receipt"
                    style={{ width: '150px', marginTop: '5px' }}
                  />
                </div>
              )}
            </li>
          ))
        ) : (
          <li>No expenses this month.</li>
        )}
      </ul>

      <div className="expense-form">
        <h3>Add Expense 💸</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            required
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
          />
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          <button type="submit">Add Expense</button>
        </form>
      </div>

      {ocrText && (
        <div>
          <h4>Extracted Text from Receipt:</h4>
          <pre>{ocrText}</pre>
        </div>
      )}
    </div>
  );
};

export default Expenses;
