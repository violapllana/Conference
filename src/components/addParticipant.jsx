import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const AddParticipantForm = ({ onParticipantAdded }) => {
  const [newParticipant, setNewParticipant] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthYear: '',
    schedule: 'paradite',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParticipant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addParticipant = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newParticipant),
      });

      if (!response.ok) {
        throw new Error('Failed to add participant');
      }

      const addedParticipant = await response.json();
      onParticipantAdded(addedParticipant);

      // Reset form after submission
      setNewParticipant({
        firstName: '',
        lastName: '',
        email: '',
        birthYear: '',
        schedule: 'paradite',
      });

      // Redirect to the menu page after successful submission

    } catch (err) {
      console.error('Error adding participant:', err);
      setError('Pjesmarrja u konfirmua me sukses');
      navigate('/menu'); // You can change '/menu' to your desired route
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className="bg-teal-400 min-h-screen flex items-center justify-center">
      <form
        onSubmit={addParticipant}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Konfirmo Pjesemarrjen</h1>

        {error && (
          <div className="text-green-600 text-center py-2 px-4 rounded bg-green-100">
            {error}
          </div>
        )}

        <input
          type="text"
          name="firstName"
          value={newParticipant.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
          required
        />
        <input
          type="text"
          name="lastName"
          value={newParticipant.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
          required
        />
        <input
          type="email"
          name="email"
          value={newParticipant.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
          required
        />
        <input
          type="number"
          name="birthYear"
          value={newParticipant.birthYear}
          onChange={handleInputChange}
          placeholder="Birth Year"
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
          required
        />
        <select
          name="schedule"
          value={newParticipant.schedule}
          onChange={handleInputChange}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
          required
        >
          <option value="paradite">Paradite</option>
          <option value="pasdite">Pasdite</option>
        </select>

        <button
          type="submit"
          className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Confirm'}
        </button>
      </form>
    </div>
  );
};

export default AddParticipantForm;
