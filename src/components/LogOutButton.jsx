import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook for navigation after logout

  // Verifiko që përdoruesi është i kyçur
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);  // Update the state to logged out
      navigate('/login'); // Redirect to the home page after logout
    } catch (error) {
      console.error('Error during logout:', error.response || error.message);
    }
  };

  if (!isLoggedIn) return null; // Mos shfaq butonin nëse përdoruesi nuk është i kyçur

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
