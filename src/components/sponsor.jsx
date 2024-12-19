import React, { useEffect, useState } from 'react';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]); // Initialize as an empty array
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [editSponsor, setEditSponsor] = useState(null);

  // Fetch sponsors on component load
  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response = await fetch('http://localhost:5000/sponsors', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
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
        credentials: 'include',  // Përdor cookies të sesionit
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
        credentials: 'include',  // Përdor cookies të sesionit
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
        credentials: 'include',  // Përdor cookies të sesionit
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
    <div className="section">
      <form onSubmit={editSponsor ? handleEditSubmit : handleSubmit} className="add-form">
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit" className="btn-add">
          {editSponsor ? 'Save Sponsor' : 'Add Sponsor'}
        </button>
      </form>

      <div className="post-list">
        {sponsors.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="post-item" style={{ width: 'calc(33% - 20px)' }}>
                <h4>{sponsor.name}</h4>
                <p>Email: {sponsor.email}</p>
                {sponsor.phone && <p>Phone: {sponsor.phone}</p>}
                {sponsor.address && <p>Address: {sponsor.address}</p>}
                <div className="post-actions">
                  <button onClick={() => handleEditSponsor(sponsor)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => deleteSponsor(sponsor.id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No sponsors found.</p>
        )}
      </div>
    </div>
  );
};

export default Sponsors;
