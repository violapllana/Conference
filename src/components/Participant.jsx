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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {participants.length > 0 ? (
          participants.map((participant) => (
            <div
              key={participant.id}
              className="bg-gray-200 p-4 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <h4 className="text-xl font-bold mb-2">
                {participant.firstName} {participant.lastName}
              </h4>
              <p className="text-gray-600 mb-1">
                <strong>Email:</strong> {participant.email}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Viti Lindjes:</strong> {participant.birthYear}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Orari:</strong> {participant.schedule === 'paradite' ? 'Paradite' : 'Pasdite'}
              </p>
              <button
                onClick={() => deleteParticipant(participant.id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No participants found.</p>
        )}
      </div>
    </div>
  );
};

export default Participants;
