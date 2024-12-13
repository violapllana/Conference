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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
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
  );
};

export default Register;
