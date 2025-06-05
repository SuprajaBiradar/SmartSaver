import {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import {useNavigate, Link} from 'react-router-dom';
import '../styles/Login.css';

export default function Login () {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const navigate = useNavigate ();

  const handleLogin = async e => {
    e.preventDefault ();
    try {
      await signInWithEmailAndPassword (auth, email, password);
      navigate ('/dashboard');
    } catch (error) {
      alert (error.message);
    }
  };

  return (
    <div className="login-bg">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Welcome Back!</h2>

        <input
          type="email"
          placeholder="Email Address"
          className="login-input"
          onChange={e => setEmail (e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={e => setPassword (e.target.value)}
          required
        />

        <button type="submit" className="login-button">Login</button>

        <p className="login-link-text">
          Don’t have an account?{' '}
          <Link to="/signup" className="login-link">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
