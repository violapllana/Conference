import React, { useEffect, useState } from 'react';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [editSponsor, setEditSponsor] = useState(null);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response = await fetch('http://localhost:5000/sponsors', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Kërkesa e sponsorizuar ka dështuar');
      }

      const data = await response.json();
      setSponsors(data);
    } catch (err) {
      console.error('Gabim në marrjen e sponsorëve:', err);
      setError('Gabim gjatë lidhjes me serverin.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Emri dhe email-i janë të detyrueshëm.');
      return;
    }

    setError('');
    const newSponsor = { name, email, phone, address };

    try {
      const response = await fetch('http://localhost:5000/sponsors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSponsor),
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setSponsors((prev) => [...prev, result.sponsor]);
        resetForm();
      } else {
        setError('Gabim gjatë krijimit të sponsorit.');
      }
    } catch (err) {
      console.error('Gabim:', err);
      setError('Gabim gjatë lidhjes me serverin.');
    }
  };

  const deleteSponsor = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/sponsors/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setSponsors((prev) => prev.filter((s) => s.id !== id));
      } else {
        setError('Gabim gjatë fshirjes së sponsorit.');
      }
    } catch (err) {
      console.error('Gabim gjatë fshirjes së sponsorit:', err);
    }
  };

  const handleEditSponsor = (sponsor) => {
    setEditSponsor(sponsor);
    setName(sponsor.name);
    setEmail(sponsor.email);
    setPhone(sponsor.phone);
    setAddress(sponsor.address);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setEditSponsor(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedSponsor = { name, email, phone, address };

    try {
      const response = await fetch(`http://localhost:5000/sponsors/${editSponsor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSponsor),
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setSponsors((prev) =>
          prev.map((sponsor) =>
            sponsor.id === result.id ? result : sponsor
          )
        );
        resetForm();
      } else {
        setError('Gabim gjatë përditësimit të sponsorit.');
      }
    } catch (err) {
      console.error('Gabim:', err);
      setError('Gabim gjatë lidhjes me serverin.');
    }
  };

  return (
    <div>
      <form
        onSubmit={editSponsor ? handleEditSubmit : handleSubmit}
        className="max-w-xl mx-auto"
      >
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Sponsor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-md"
        />
        <input
          type="email"
          placeholder="Sponsor Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-md"
        />
        <input
          type="text"
          placeholder="Sponsor Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md"
        />
        <input
          type="text"
          placeholder="Sponsor Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md"
        />
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:bg-blue-700"
        >
          {editSponsor ? 'Save Sponsor' : 'Add Sponsor'}
        </button>
      </form>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.length > 0 ? (
          sponsors.map((sponsor) => (
            <div key={sponsor.id} className="bg-gray-200 p-4 rounded-md shadow-lg">
              <h4 className="text-xl mb-2">{sponsor.name}</h4>
              <p className="text-sm mb-2">Email: {sponsor.email}</p>
              {sponsor.phone && <p className="text-sm mb-2">Phone: {sponsor.phone}</p>}
              {sponsor.address && <p className="text-sm mb-4">Address: {sponsor.address}</p>}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEditSponsor(sponsor)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSponsor(sponsor.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No sponsors found.</p>
        )}
      </div>
    </div>
  );
};

export default Sponsors;
