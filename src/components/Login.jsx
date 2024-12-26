import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook për navigim pas login-it

  // Kontrollo nëse përdoruesi është tashmë i kyçur
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
        if (response.status === 200) {
          // Nëse përdoruesi është i kyçur, navigo në faqen përkatëse
          const userRole = response.data.user.role;  // Merr rolin e përdoruesit
          if (userRole === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        // Nëse nuk është i kyçur, vazhdo me formularin e login-it
        console.log('User not logged in.');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        { username, password },
        { withCredentials: true }
      );
      console.log('Login response:', response);

      // Kontrollojmë rolin dhe drejtojmë përdoruesin
      const userRole = response.data.user.role;  // Merr rolin e përdoruesit nga përgjigja

      if (userRole === 'admin') {
        // Përdoruesi është admin, drejtoje në dashboard
        window.location.href = '/dashboard';
      } else {
        // Përdoruesi është user, drejtoje në homepage
        window.location.href = '/';
      }

    } catch (error) {
      console.error('Login error:', error.response || error.message);
      setMessage('Gabim gjatë login.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-300 to-gray-500">
      {/* Header */}
      <header className="bg-blue-600 shadow-md">
        <nav className="flex justify-between items-center px-8 py-6 text-white">
          <div className="text-3xl font-semibold text-center tracking-wide">Rrjeti i Konferencave 🌍💬</div>
          <ul className="flex space-x-6 text-lg">
            <li>
              <a href="/" className="hover:text-teal-300 transition duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/menu" className="hover:text-teal-300 transition duration-200">
                Menu
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:text-teal-300 transition duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-teal-300 transition duration-200">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-teal-300 transition duration-200">
                Register
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Hyr</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Shkruani username tuaj"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Shkruani password tuaj"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ease-in-out"
            >
              Hyr
            </button>
          </form>
          {message && <p className="mt-4 text-red-500 text-center">{message}</p>}

          {/* Linku për në faqen e regjistrimit */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Nuk keni një llogari?{' '}
              <a href="/register" className="text-green-600 hover:underline">
                Regjistrohu këtu
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
      <p>&copy; 2024 Rrjeti i Konferencave 🌍💬. Të gjitha të drejtat të rezervuara.</p>
      </footer>
    </div>
  );
};

export default Login;
