import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook për navigim pas logout

  // Verifiko që përdoruesi është i kyçur
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
        if (response.status === 200) {
          setIsLoggedIn(true); // Përdoruesi është i kyçur
        }
      } catch (error) {
        setIsLoggedIn(false); // Përdoruesi nuk është i kyçur
        alert('Ju nuk jeni të kyçur. Ju lutemi, kyçuni për të përdorur këtë funksionalitet.');
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      
      // Shfaq mesazh alert kur logout bëhet me sukses
      alert(response.data.message);  // Përdor mesazhin nga backend
      setIsLoggedIn(false);  // Përdoruesi është çkyçur
      navigate('/login'); // Ridrejtoje përdoruesin në login pas logout
    } catch (error) {
      console.error('Error during logout:', error.response || error.message);
      alert('Ka ndodhur një gabim gjatë çkyçjes.');
    }
  };

  // Nëse përdoruesi nuk është i kyçur, shfaq një mesazh alert
  if (!isLoggedIn) return null;

  return (
    <button
      onClick={handleLogout}
      className="bg-red-400 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-red-500 hover:shadow-2xl transition duration-300 ease-in-out"
    >
      LogOut
    </button>
  );
};

export default LogoutButton;
