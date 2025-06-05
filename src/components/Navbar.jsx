import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {getAuth, signOut} from 'firebase/auth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faPiggyBank,
  faUserCircle,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

const Navbar = () => {
  const auth = getAuth ();
  const navigate = useNavigate ();

  const handleLogout = async () => {
    try {
      await signOut (auth);
      navigate ('/');
    } catch (error) {
      console.error ('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">
        <FontAwesomeIcon icon={faPiggyBank} style={{marginRight: '10px'}} />
        SmartSaver
      </h1>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/dashboard"
            title="Go to Dashboard"
            className="home-icon"
          >
            <FontAwesomeIcon icon={faHome} size="2x" />
          </NavLink>
        </li>
        <li>
          <button className="logout-icon" onClick={handleLogout} title="Logout">
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
