import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Programs from './pages/Programs';
import Requests from './pages/Requests';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={styles.app}>
          <Navbar />
          <main style={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/requests" element={<Requests />} />
            </Routes>
          </main>
          <footer style={styles.footer}>
            <p>© 2026 Provocatio. 코드를 만들고, 배우고, 거래하는 플랫폼</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f6fa',
  },
  main: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    textAlign: 'center',
    padding: '2rem 1rem',
    marginTop: '4rem',
  },
};

export default App;
