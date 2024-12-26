import React, { useEffect, useState } from 'react';

const Items = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/items', {
        method: 'GET',
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
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
    <div>
      <form
        onSubmit={editItem ? handleEditSubmit : handleSubmit}
        className="max-w-xl mx-auto"
      >
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Conference Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-md"
        />
        <textarea
          placeholder="Conference Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-md"
        />
        <input
          type="text"
          placeholder="Conference Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md"
        />
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:bg-blue-700"
        >
          {editItem ? 'Save Conference' : 'Add Conference'}
        </button>
      </form>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="bg-gray-200 p-4 rounded-md shadow-lg">
              <h4 className="text-xl mb-2">{item.name}</h4>
              <p className="text-sm mb-2">Description: {item.description}</p>
              {item.address && <p className="text-sm mb-4">Address: {item.address}</p>}
              <button
                onClick={() => handleEditItem(item)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No conferences found.</p>
        )}
      </div>
    </div>
  );
};

export default Items;
