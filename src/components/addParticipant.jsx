import React, { useState } from 'react';

const AddParticipant = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthYear: '',
    schedule: 'paradite',
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const token = localStorage.getItem('authToken'); // Ensure that you retrieve the token from localStorage, sessionStorage, or cookies

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if the token is present
    if (!token) {
      setResponseMessage('Token not found! Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Add the Bearer token to the request header
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage('Pjesëmarrësi u shtua me sukses!');
      } else {
        setResponseMessage('Gabim gjatë shtimit të pjesëmarrësit!');
      }
    } catch (err) {
      console.error('Gabim gjatë lidhjes me serverin:', err);
      setResponseMessage('Gabim gjatë shtimit të pjesëmarrësit!');
    }
    setLoading(false);
  };

  return (
    <div className="bg-teal-400 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
      >
        <h1 className="text-xl font-semibold text-gray-800 text-center">Shto Pjesëmarrës</h1>

        {responseMessage && (
          <div className="text-green-600 text-center mb-2">{responseMessage}</div>
        )}

        <input
          type="text"
          name="firstName"
          placeholder="Emri"
          value={formData.firstName}
          onChange={handleChange}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
        />

        <input
          type="text"
          name="lastName"
          placeholder="Mbiemri"
          value={formData.lastName}
          onChange={handleChange}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
        />

        <input
          type="number"
          name="birthYear"
          placeholder="Viti i lindjes"
          value={formData.birthYear}
          onChange={handleChange}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
        />

        <select
          name="schedule"
          value={formData.schedule}
          onChange={handleChange}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
        >
          <option value="paradite">Paradite</option>
          <option value="pasdite">Pasdite</option>
        </select>

        <button
          type="submit"
          className="bg-white border-2 border-teal-500 text-teal-500 py-2 px-4 rounded-full hover:bg-teal-500 hover:text-white transition"
          disabled={loading}
        >
          {loading ? 'Duke shtuar...' : 'Shto Pjesëmarrës'}
        </button>
      </form>
    </div>
  );
};

export default AddParticipant;
