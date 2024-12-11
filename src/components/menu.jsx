import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

const Menu = () => {
  const [items, setItems] = useState([]); // For conferences
  const [sponsors, setSponsors] = useState([]); // For sponsors
  const [posts, setPosts] = useState([]); // For posts
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [message, setMessage] = useState('');
  const [numriPjesmarresve, setNumriPjesmarresve] = useState(null);




  // Fetch items, sponsors, and posts on initial load
  useEffect(() => {
    fetchItems();
    fetchSponsors();
    fetchPosts();
    fetchItem();
    fetchCount();

  }, []);




  const fetchCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/numri_pjesmarresve', { withCredentials: true });
      setNumriPjesmarresve(response.data);
    } catch (error) {
      console.error('Error fetching items:', error.response || error.message);
    }
  };


  const addItem = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/items',
        { name: newName, description: newDescription },
        { withCredentials: true }
      );

      setItems((prevItems) => [...prevItems, response.data]); // Shto itemin në listë
      setNewName(''); // Pastro inputet
      setNewDescription('');
      setShowAddForm(false); // Mbyll formën
    } catch (error) {
      console.error('Error adding item:', error.response || error.message);
    }
  };

  // const handleAddParticipant = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/user', {
  //       withCredentials: true, // Përfshin cookies në kërkesë
  //     });

  //     if (response.data.user) {
  //       // Nëse përdoruesi është i kyçur
  //       setMessage('Je shtuar me sukses si pjesëmarrës!');
  //     }
  //   } catch (error) {
  //     // Nëse përdoruesi nuk është i kyçur
  //     setMessage('Duhet të kyçeni në llogari për t\'u shtuar si pjesëmarrës.');
  //   }
  // };

  const handleAddParticipant = async (itemId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/add-participant/${itemId}`,
        {},
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        setMessage('Je shtuar me sukses si pjesëmarrës!');
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.status === 404) {
        setMessage('Konferenca nuk u gjet.');
      } else {
        setMessage('Duhet të kyçeni në llogari për t\'u shtuar si pjesëmarrës.');
      }
    }
  };



  const startEditing = (id, name, description) => {
    setEditingId(id);
    setEditName(name);
    setEditDescription(description);
  };


  const stopEditing = async () => {
    try {
      if (editingId !== null) {
        await axios.put(`http://localhost:5000/items/${editingId}`, {
          name: editName,
          description: editDescription,
        }, { withCredentials: true });

        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editingId ? { ...item, name: editName, description: editDescription } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating item:', error.response || error.message);
    } finally {
      setEditingId(null);
      setEditName('');
      setEditDescription('');
    }
  };


  // Function to fetch items (conferences)
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items', { withCredentials: true });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error.response || error.message);
    }
  };

  const fetchItem = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/items/${id}`, { withCredentials: true });
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error fetching item:', error.response || error.message);
    }
  };

  // Function to fetch sponsors
  const fetchSponsors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sponsors', { withCredentials: true });
      setSponsors(response.data);
    } catch (error) {
      console.error('Error fetching sponsors:', error.response || error.message);
    }
  };

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts', { withCredentials: true });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error.response || error.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`, { withCredentials: true });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error.response || error.message);
    }
  };

  
  const updateItem = async (id) => {
    try {
      await axios.put(`http://localhost:5000/items/${id}`, { name, description }, { withCredentials: true });
      // navigate('/items');
    } catch (error) {
      console.error('Error updating item:', error.response || error.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <ul className="flex flex-col space-y-6"> {/* Flex column for vertical stack */}
        
        {/* Main "Konferencat" link */}
        <li className="flex items-center justify-between px-6 py-3">
  {/* Konferencat */}
  <div className="text-lg font-semibold hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg transition duration-300">
    Konferencat
  </div>

  {/* Shto Konferencen */}
  <button
          onClick={() => setShowAddForm(!showAddForm)} // Toggle për shfaqjen e formës
          className="text-lg font-semibold text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          Shto Konferencen
        </button>
</li>

{showAddForm && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
          <input
            type="text"
            placeholder="Emri i Konferencës"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="block mb-2 w-full p-2 text-black rounded-lg border border-gray-300"
          />
          <textarea
            placeholder="Përshkrimi i Konferencës"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="block mb-2 w-full p-2 text-black rounded-lg border border-gray-300"
          ></textarea>
          <button
            onClick={addItem}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Shto
          </button>
        </div>
      )}


{/* Dynamically display the added items with name and description */}
{items.map((item) => (
        <li
          key={item.id}
          className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          {editingId === item.id ? (
            <div>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="block mb-2 p-2 text-black rounded-lg border border-gray-300"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="block mb-2 p-2 text-black rounded-lg border border-gray-300"
              ></textarea>
              <button
                onClick={stopEditing}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Ruaj
              </button>
            </div>
          ) : (
            <div>
              <Link
                to={`/items/${item.id}`}
                className="block mb-4 hover:bg-blue-500 hover:text-black px-6 py-3 rounded-lg transition duration-300 text-xl font-semibold"
              >
                <span className="block">{item.name}</span>
              </Link>
              <p className="text-sm text-gray-400">{item.description}</p>

              <p>Numri i Pjesmarresve: {numriPjesmarresve !== null ? numriPjesmarresve : 'Po merret...'} </p>
              </div>
          )}

          <div className="flex justify-end mt-4 space-x-2">

          <button
  onClick={() => handleAddParticipant(item.id)}  // Pass the item.id to the handler
  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
>
  Shtohu si pjesëmarrës
</button>
      {message && (
        <p className="mt-4 text-lg font-semibold text-blue-500">{message}</p>
      )}
 
            <button
              onClick={() => startEditing(item.id, item.name, item.description)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Përditëso
            </button>
            <button
              onClick={() => deleteItem(item.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Fshi
            </button>
          </div>
        </li>
      ))}


        {/* Main "Sponsorët" link */}
        <li className="flex items-center">
          <Link
            to="/sponsors"
            className="hover:bg-green-500 hover:text-white px-6 py-3 rounded-lg transition duration-300 text-lg font-semibold"
          >
            Sponsorët
          </Link>
        </li>

        {/* Dynamically display the added sponsors with name, email, and phone */}
        {sponsors.map((sponsor) => (
          <li
            key={sponsor.id}
            className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Container for each sponsor */}
            <Link
              to={`/sponsors/${sponsor.id}`}
              className="block mb-4 hover:bg-green-500 hover:text-white px-6 py-3 rounded-lg transition duration-300 text-xl font-semibold"
            >
              <span className="block">{sponsor.name}</span>
            </Link>

            {/* Email of the sponsor */}
            <p className="text-sm text-gray-400">Email: {sponsor.email}</p>

            {/* Phone number of the sponsor */}
            <p className="text-sm text-gray-400">Telefon: {sponsor.phone}</p>

            {/* Description of the sponsor */}
            <p className="text-sm text-gray-400">{sponsor.description}</p>
          </li>
        ))}

        {/* Main "Postimet" link */}
        <li className="flex items-center">
          <Link
            to="/posts"
            className="hover:bg-yellow-500 hover:text-white px-6 py-3 rounded-lg transition duration-300 text-lg font-semibold"
          >
            Postimet
          </Link>
        </li>

        {/* Dynamically display the added posts with title and content */}
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Container for each post */}
            <Link
              to={`/posts/${post.id}`}
              className="block mb-4 hover:bg-yellow-500 hover:text-white px-6 py-3 rounded-lg transition duration-300 text-xl font-semibold"
            >
              <span className="block">{post.title}</span>
            </Link>

            {/* Content of the post */}
            <p className="text-sm text-gray-400">{post.content}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
