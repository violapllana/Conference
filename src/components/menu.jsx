
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
    <nav className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <ul className="flex flex-col space-y-6"> {/* Flex column for vertical stack */}
        
        {/* Main "Konferencat" link */}
        <li className="flex items-center">
          <Link
            to="/items"
            className="hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg transition duration-300 text-lg font-semibold"
          >
            Konferencat
          </Link>
        </li>

        {/* Dynamically display the added items with name and description */}
        {items.map((item) => (
          <li
            key={item.id}
            className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Container for each conference */}
            <Link
              to={`/items/${item.id}`}
              className="block mb-4 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg transition duration-300 text-xl font-semibold"
            >
              <span className="block">{item.name}</span>
            </Link>

            {/* Description of the conference */}
            <p className="text-sm text-gray-400">{item.description}</p>
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