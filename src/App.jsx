import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import BestDealFinder from './pages/BestDealFinder';
import StatisticalAnalysis from './pages/StatisticalAnalysis';
import Expenses from './pages/Expenses';
import UpcomingPayments from './pages/UpcomingPayments';
import Navbar from './components/Navbar';
import './firebase';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/dealfinder"
          element={
            <>
              <Navbar />
              <BestDealFinder />
            </>
          }
        />
        <Route
          path="/expenses"
          element={
            <>
              <Navbar />
              <Expenses />
            </>
          }
        />
        <Route
          path="/analysis"
          element={
            <>
              <Navbar />
              <StatisticalAnalysis />
            </>
          }
        />
        <Route
          path="/payments"
          element={
            <>
              <Navbar />
              <UpcomingPayments />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
