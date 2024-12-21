import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Menu = () => {
  const [items, setItems] = useState([]); // For conferences
  const [sponsors, setSponsors] = useState([]); // For sponsors
  const [posts, setPosts] = useState([]); // For posts

  // Fetch items, sponsors, and posts on initial load
  useEffect(() => {
    fetchItems();
    fetchSponsors();
    fetchPosts();
  }, []);

  // Function to fetch items (conferences)
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items', { withCredentials: true });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error.response || error.message);
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

  return (
    <div className="font-sans text-gray-800 bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 shadow-md">
        <nav className="flex justify-between items-center px-8 py-6 text-white">
          <div className="text-3xl font-extrabold">Menaxhimi i Konferencave</div>
          <ul className="flex space-x-6 text-lg">
            <li><a href="/" className="hover:text-teal-300 transition duration-200">Home</a></li>
            <li><a href="/about-us" className="hover:text-teal-300 transition duration-200">About Us</a></li>
            <li><a href="" className="hover:text-teal-300 transition duration-200">Workshops</a></li>
            <li><a href="#" className="hover:text-teal-300 transition duration-200">Event Highlights</a></li>
            <li><a href="/contact-us" className="hover:text-teal-300 transition duration-200">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Secondary Navigation for "Konferencat" */}
      <nav className="bg-gray-300 text-black p-4 rounded-none shadow-md mt-0">
        <ul className="flex flex-col space-y-6">
        <li className="flex flex-col items-start bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
  <div className="text-3xl font-semibold mb-2">Konferencat</div>
  <p className="text-lg opacity-80 mb-4">Zgjedh njërën nga konferencat dhe konfirmo pjesëmarrjen</p>
          </li>

         {/* Dynamically display the added items with name and description */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.length > 0 ? (
    items.map((item) => (
      <li key={item.id} className="bg-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Link to="/add-participant" className="block mb-4 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg transition duration-300 text-xl font-semibold">
          <span className="block">{item.name}</span>
        </Link>
        <p className="text-sm text-gray-600">{item.description}</p>
        <p className="text-sm text-gray-600">Adresa: {item.address}</p>
      </li>
    ))
  ) : (
    <p>No conferences found.</p>
  )}
</div>
          {/* Main "Sponsorët" link */}
          <li className="flex flex-col items-start bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
  <div className="text-3xl font-semibold mb-2">Sponzorët</div></li>

          {/* Dynamically display the added sponsors with name, email, and phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsors.length > 0 ? (
              sponsors.map((sponsor) => (
                <li key={sponsor.id} className="bg-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h1 to={`/sponsors/${sponsor.id}`} className="block mb-4 hover:bg-green-500 hover:text-white px-6 py-3 rounded-lg transition duration-300 text-xl font-semibold">
                    <span className="block">{sponsor.name}</span>
                  </h1>
                  <div className="flex flex-col text-sm text-gray-600">
                    <p>Email: {sponsor.email}</p>
                    <p>Telefon: {sponsor.phone}</p>
                    <p>Adresa: {sponsor.address}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>No sponsors found.</p>
            )}
          </div>

          {/* Main "Postimet" link */}
          <li className="flex flex-col items-start bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
  <div className="text-3xl font-semibold mb-2">Postimet</div></li>
{/* 
          Dynamically display the added posts with title and content */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {posts.length > 0 ? (
    posts.map((post) => (
      <li
        key={post.id}
        className="bg-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <h1
          to={`/posts/${post.id}`}
          className="block mb-4 hover:bg-yellow-500 hover:text-white px-6 py-3 rounded-lg transition duration-300 text-xl font-semibold"
        >
          <span className="block"> {post.title}</span>
        </h1>

        {/* Display image if exists */}
        {post.image && (
          <div className="mb-4">
            <img
              src={post.image} 
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        <p className="text-sm text-gray-600">
          Pershkrimi:
          <span className="block mt-2">{post.content}</span>
        </p>
      </li>
    ))
  ) : (
    <p>No posts found.</p>
  )}
</div>

        </ul>
      </nav>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-auto">
        &copy; 2024 Menaxhimi i Konferencave. Të gjitha të drejtat të rezervuara.
      </footer>
    </div>
  );
};

export default Menu;
