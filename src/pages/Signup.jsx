import {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import {useNavigate, Link} from 'react-router-dom';
import '../styles/Signup.css';

export default function Signup () {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const navigate = useNavigate ();

  const handleSignup = async e => {
    e.preventDefault ();
    try {
      await createUserWithEmailAndPassword (auth, email, password);
      navigate ('/dashboard');
    } catch (error) {
      alert (error.message);
    }
  };

  return (
    <div className="signup-bg">
      <form onSubmit={handleSignup} className="signup-form">
        <h2 className="signup-title">Create Your Account</h2>

        <input
          type="email"
          placeholder="Email Address"
          className="signup-input"
          onChange={e => setEmail (e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="signup-input"
          onChange={e => setPassword (e.target.value)}
          required
        />

        <button type="submit" className="signup-button">Signup</button>

        <p className="signup-link-text">
          Already have an account?{' '}
          <Link to="/" className="signup-link">Login</Link>
        </p>
      </form>
    </div>
  );
}
