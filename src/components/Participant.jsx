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
    <div className="section">
      {error && <p className="error-message">{error}</p>}

      <div className="post-list">
        {participants.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {participants.map((participant) => (
              <div key={participant.id} className="post-item" style={{ width: 'calc(33% - 20px)' }}>
                <h4>
                  {participant.firstName} {participant.lastName}
                </h4>
                <p>Email: {participant.email}</p>
                <p>Birth Year: {participant.birthYear}</p>
                <p>Schedule: {participant.schedule === 'paradite' ? 'Morning' : 'Afternoon'}</p>
                <div className="post-actions">
                  <button onClick={() => deleteParticipant(participant.id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No participants found.</p>
        )}
      </div>
    </div>
  );
};

export default Participants;
