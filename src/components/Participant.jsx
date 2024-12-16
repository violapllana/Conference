// src/components/Participant.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Komponenti për Shtimin e Pjesëmarrësit
const AddParticipant = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [schedule, setSchedule] = useState('paradite');
  const navigate = useNavigate();

  const addParticipant = async () => {
    if (!firstName || !lastName || !email || !birthYear) {
      alert('Të gjitha fushat janë të detyrueshme!');
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post('http://localhost:5000/participants', 
        { firstName, lastName, email, birthYear, schedule }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      );
      if (response.status === 201) {
        alert('Pjesemarrja u krijua me sukses!');
        navigate('/menu');
      }
    } catch (error) {
      console.error('Gabim gjatë shtimit të pjesëmarrësit:', error.message);
      alert('pjesemmarja dështoi. Ju lutemi provoni emer tjeter');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Shto Pjesëmarrësin</h1>
      
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emri"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Mbiemri"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emaili"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Viti i Lindjes"
        type="number"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
      />
      
      <select
        className="border border-gray-300 p-2 w-full mb-4"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      >
        <option value="paradite">Paradite</option>
        <option value="pasdite">Pasdite</option>
      </select>

      <button className="bg-blue-500 text-white px-4 py-2" onClick={addParticipant}>
        Shto Pjesëmarrësin
      </button>
    </div>
  );
};

// Komponenti për Redaktimin e Pjesëmarrësit
const EditParticipant = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [schedule, setSchedule] = useState('paradite');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`http://localhost:5000/participants/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setBirthYear(response.data.birthYear);
        setSchedule(response.data.schedule);
      } catch (error) {
        console.error('Gabim gjatë marrjes së pjesëmarrësit:', error.message);
      }
    };

    fetchParticipant();
  }, [id]);

  const updateParticipant = async () => {
    if (!firstName || !lastName || !email || !birthYear) {
      alert('Të gjitha fushat janë të detyrueshme!');
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      await axios.put(`http://localhost:5000/participants/${id}`, 
        { firstName, lastName, email, birthYear, schedule }, 
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true 
        }
      );
      navigate('/participants');
    } catch (error) {
      console.error('Gabim gjatë përditësimit të pjesëmarrësit:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Redakto Pjesëmarrësin</h1>
      
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emri"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Mbiemri"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emaili"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Viti i Lindjes"
        type="number"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
      />
      
      <select
        className="border border-gray-300 p-2 w-full mb-4"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      >
        <option value="paradite">Paradite</option>
        <option value="pasdite">Pasdite</option>
      </select>

      <button className="bg-blue-500 text-white px-4 py-2" onClick={updateParticipant}>
        Përditëso Pjesëmarrësin
      </button>
    </div>
  );
};

// Komponenti për Listën e Pjesëmarrësve
const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:5000/participants', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });
        setParticipants(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const deleteParticipant = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://localhost:5000/participants/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      setParticipants(participants.filter(participant => participant.id !== id));
    } catch (err) {
      console.error('Gabim gjatë fshirjes së pjesëmarrësit:', err.message);
    }
  };

  if (loading) return <p>Po ngarkohen pjesëmarrësit...</p>;
  if (error) return <p>Gabim: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista e Pjesëmarrësve</h1>
      {participants.length === 0 ? (
        <p>Nuk ka pjesëmarrës të shtuar.</p>
      ) : (
        <ul>
          {participants.map((participant) => (
            <li key={participant.id} className="mb-4">
              <h2 className="text-xl font-semibold">{participant.firstName} {participant.lastName}</h2>
              <p>Email: {participant.email}</p>
              <p>Viti i Lindjes: {participant.birthYear}</p>
              <p>Orari: {participant.schedule}</p>
              <div className="mt-2">
                <Link to={`/edit-participant/${participant.id}`} className="bg-yellow-500 text-white px-4 py-2">Redakto</Link>
                <button
                  onClick={() => deleteParticipant(participant.id)}
                  className="bg-red-500 text-white px-4 py-2 ml-2"
                >
                  Fshi
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { AddParticipant, EditParticipant, ParticipantList };