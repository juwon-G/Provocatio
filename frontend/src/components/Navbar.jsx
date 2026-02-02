import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Provocatio
        </Link>
        <div style={styles.links}>
          <Link to="/programs" style={styles.link}>프로그램</Link>
          <Link to="/requests" style={styles.link}>의뢰</Link>
          {isAuthenticated ? (
            <>
              <Link to="/create-program" style={styles.link}>프로그램 등록</Link>
              <Link to="/create-request" style={styles.link}>의뢰 등록</Link>
              <button onClick={handleLogout} style={styles.button}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>로그인</Link>
              <Link to="/register" style={styles.button}>회원가입</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
};

export default Navbar;
