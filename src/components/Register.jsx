import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importoni useNavigate

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Përdorimi i useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password });

      // Pas regjistrimit të suksesshëm, drejtojeni përdoruesin në faqen e login-it
      navigate('/login');  // Përdorni navigate për të kaluar në login

    } catch (error) {
      console.error("Gabim gjatë regjistrimit:", error);
      // Mund të shtoni ndonjë trajtim për gabimin nëse dëshironi
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
              <a href="/login" className="hover:text-teal-300 transition duration-200">
                Log In
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Regjistrohu</h2>
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
              Regjistrohu
            </button>
          </form>

          {/* Linku për në faqen e login-it */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Keni një llogari? <a href="/login" className="text-green-600 hover:underline">Kyçu këtu</a>
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

export default Register;
