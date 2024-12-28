import React, { useEffect, useState } from 'react';

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await fetch('http://localhost:5000/participants', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch participants');
      }

      const data = await response.json();
      setParticipants(data);
    } catch (err) {
      console.error('Error fetching participants:', err);
      setError('Failed to fetch participants. Please try again.');
    }
  };

  const deleteParticipant = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/participants/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setParticipants((prev) => prev.filter((p) => p.id !== id));
      } else {
        setError('Error deleting participant.');
      }
    } catch (err) {
      console.error('Error deleting participant:', err);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="mt-8">
        {participants.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-white text-left">
                  <th className="py-3 px-6">First Name</th>
                  <th className="py-3 px-6">Last Name</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Birth Year</th>
                  <th className="py-3 px-6">Schedule</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr key={participant.id} className="border-b">
                    <td className="py-3 px-6">{participant.firstName}</td>
                    <td className="py-3 px-6">{participant.lastName}</td>
                    <td className="py-3 px-6">{participant.email}</td>
                    <td className="py-3 px-6">{participant.birthYear}</td>
                    <td className="py-3 px-6">
                      {participant.schedule === 'paradite' ? 'Paradite' : 'Pasdite'}
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => deleteParticipant(participant.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No participants found.</p>
        )}
      </div>
    </div>
  );
};

export default Participants;
