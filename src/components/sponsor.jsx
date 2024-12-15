// src/components/Sponsor.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Komponenti për Redaktimin e Sponsorit
const EditSponsor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // Funksioni për të marrë të dhënat e sponsorit për redaktim
  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Merr tokenin nga localStorage
        const response = await axios.get(`http://localhost:5000/sponsors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setAddress(response.data.address);
      } catch (error) {
        console.error('Gabim gjatë marrjes së sponsorit:', error.message);
      }
    };

    fetchSponsor();
  }, [id]);

  // Funksioni për të përditësuar sponsorin
  const updateSponsor = async () => {
    if (!name || !email) {
      alert('Emri dhe emaili janë të detyrueshme!');
      return;
    }
    try {
      const token = localStorage.getItem('access_token'); // Merr tokenin nga localStorage
      await axios.put(`http://localhost:5000/sponsors/${id}`, 
        { name, email, phone, address }, 
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true 
        }
      );
      navigate('/sponsors');
    } catch (error) {
      console.error('Gabim gjatë përditësimit të sponsorit:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Redakto Sponsorin</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emri"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emaili"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Telefoni"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Adresa"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={updateSponsor}>Përditëso Sponsorin</button>
    </div>
  );
};

// Komponenti për Shtimin e Sponsorit
const AddSponsor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const addSponsor = async () => {
    if (!name || !email) {
      alert('Emri dhe emaili janë të detyrueshme!');
      return;
    }
    try {
      const token = localStorage.getItem('access_token'); // Merr tokenin nga localStorage
      const response = await axios.post('http://localhost:5000/sponsors', 
        { name, email, phone, address }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      );
      if (response.status === 201) {
        alert('Sponsori u krijua me sukses!');
        navigate('/sponsors');
      }
    } catch (error) {
      console.error('Gabim gjatë shtimit të sponsorit:', error.message);
      alert('Shtimi i sponsorit dështoi. Ju lutemi provoni përsëri.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shto Sponsorin</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emri"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emaili"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Telefoni"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Adresa"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={addSponsor}>Shto Sponsorin</button>
    </div>
  );
};

// Komponenti për Listën e Sponsorëve
const SponsorList = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Merr tokenin nga localStorage
        const response = await axios.get('http://localhost:5000/sponsors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });
        setSponsors(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const deleteSponsor = async (id) => {
    try {
      const token = localStorage.getItem('access_token'); // Merr tokenin nga localStorage
      await axios.delete(`http://localhost:5000/sponsors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      setSponsors(sponsors.filter(sponsor => sponsor.id !== id));
    } catch (err) {
      console.error('Gabim gjatë fshirjes së sponsorit:', err.message);
    }
  };

  if (loading) return <p>Po ngarkohen sponsorët...</p>;
  if (error) return <p>Gabim: {error}</p>;

  return (
    <div>
      <h1>Lista e Sponsorëve</h1>
      {sponsors.length === 0 ? (
        <p>Nuk ka sponsorë të shtuar.</p>
      ) : (
        <ul>
          {sponsors.map((sponsor) => (
            <li key={sponsor.id} className="mb-4">
              <h2 className="text-xl font-semibold">{sponsor.name}</h2>
              <p>Email: {sponsor.email}</p>
              <p>Telefon: {sponsor.phone}</p>
              <p>Adresa: {sponsor.address}</p>
              <div className="mt-2">
                <Link to={`/edit-sponsor/${sponsor.id}`} className="bg-yellow-500 text-white px-4 py-2">Redakto</Link>
                <button
                  onClick={() => deleteSponsor(sponsor.id)}
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

export { EditSponsor, AddSponsor, SponsorList };
