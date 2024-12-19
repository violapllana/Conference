import React, { useEffect, useState } from 'react';

const Items = () => {
  const [items, setItems] = useState([]); // Initialize as an empty array
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [editItem, setEditItem] = useState(null);

  // Fetch items on component load
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/items', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
      });

      if (!response.ok) {
        throw new Error('Kërkesa e items ka dështuar');
      }

      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error('Gabim në marrjen e objekteve:', err);
      setError('Gabim gjatë lidhjes me serverin.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      setError('Emri dhe përshkrimi janë të detyrueshme.');
      return;
    }

    setError('');
    const newItem = { name, description, address };

    try {
      const response = await fetch('http://localhost:5000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
        credentials: 'include',  // Përdor cookies të sesionit
      });

      if (response.ok) {
        const result = await response.json();
        setItems((prev) => [...prev, result.item]);
        resetForm();
      } else {
        setError('Gabim gjatë krijimit të itemit.');
      }
    } catch (err) {
      console.error('Gabim:', err);
      setError('Gabim gjatë lidhjes me serverin.');
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/items/${id}`, {
        method: 'DELETE',
        credentials: 'include',  // Përdor cookies të sesionit
      });
      if (response.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        setError('Gabim gjatë fshirjes së itemit.');
      }
    } catch (err) {
      console.error('Gabim gjatë fshirjes së itemit:', err);
    }
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setName(item.name);
    setDescription(item.description);
    setAddress(item.address);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setAddress('');
    setEditItem(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedItem = { name, description, address };

    try {
      const response = await fetch(`http://localhost:5000/items/${editItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
        credentials: 'include',  // Përdor cookies të sesionit
      });

      if (response.ok) {
        const result = await response.json();
        setItems((prev) =>
          prev.map((item) =>
            item.id === result.id ? result : item
          )
        );
        resetForm();
      } else {
        setError('Gabim gjatë përditësimit të itemit.');
      }
    } catch (err) {
      console.error('Gabim:', err);
      setError('Gabim gjatë lidhjes me serverin.');
    }
  };

  return (
    <div className="section">
      <form onSubmit={editItem ? handleEditSubmit : handleSubmit} className="add-form">
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit" className="btn-add">
          {editItem ? 'Save conference' : 'Add conference'}
        </button>
      </form>

      <div className="post-list">
        {items.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {items.map((item) => (
              <div key={item.id} className="post-item" style={{ width: 'calc(33% - 20px)' }}>
                <h4>{item.name}</h4>
                <p>pershkrimi: {item.description}</p>
                {item.address && <p>Adresa: {item.address}</p>}
                <div className="post-actions">
                  <button onClick={() => handleEditItem(item)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No conference found.</p>
        )}
      </div>
    </div>
  );
};

export default Items;
