import React, {useState} from 'react';
import {getAuth} from 'firebase/auth';
import {getFirestore, collection, addDoc, Timestamp} from 'firebase/firestore';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/UpcomingPayments.css';

const UpcomingPayments = () => {
  const [category, setCategory] = useState ('');
  const [amount, setAmount] = useState ('');
  const [dueDate, setDueDate] = useState ('');
  const [description, setDescription] = useState ('');
  const [loading, setLoading] = useState (false);

  const auth = getAuth ();
  const db = getFirestore ();

  const handleSubmit = async e => {
    e.preventDefault ();

    if (!category || !amount || !dueDate) {
      toast.error ('Please fill in all required fields.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error ('You must be logged in to add payments.');
      return;
    }

    setLoading (true);

    try {
      await addDoc (collection (db, 'payments'), {
        userId: user.uid,
        category,
        amount: parseFloat (amount),
        dueDate: Timestamp.fromDate (new Date (dueDate)),
        description,
      });

      toast.success ('Payment added successfully!');
      setCategory ('');
      setAmount ('');
      setDueDate ('');
      setDescription ('');
    } catch (error) {
      console.error ('Error adding payment: ', error);
      toast.error ('Failed to add payment. Try again.');
    } finally {
      setLoading (false);
    }
  };

  return (
    <div className="upcoming-payments-container">
      <h3>🔔 Add Upcoming Payment</h3>
      <form onSubmit={handleSubmit} className="upcoming-payments-form">
        <label>
          Category*:
          <input
            type="text"
            value={category}
            onChange={e => setCategory (e.target.value)}
            placeholder="e.g. Rent"
            required
          />
        </label>

        <label>
          Amount*:
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={e => setAmount (e.target.value)}
            placeholder="e.g. 1200.00"
            required
          />
        </label>

        <label>
          Due Date*:
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate (e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={e => setDescription (e.target.value)}
            placeholder="Additional details (optional)"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Payment'}
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default UpcomingPayments;
