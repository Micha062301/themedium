import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import PublicationPage from './pages/PublicationPage';
import GroupReadingPage from './pages/GroupReadingPage';
import { UserProvider } from './context/UserContext';
import { SocketProvider } from './context/SocketContext';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <UserProvider>
      <SocketProvider>
        <Router>
          <div className="app font-charter bg-white min-h-screen">
            <Header isLoggedIn={isLoggedIn} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/publication/:id" element={<PublicationPage />} />
              <Route path="/group-reading/:id" element={<GroupReadingPage />} />
            </Routes>
          </div>
        </Router>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;
