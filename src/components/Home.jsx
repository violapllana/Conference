import React, { useState, useEffect } from "react";
import { Link, Navigate } from 'react-router-dom'; // Updated import
import heroImage from "./image.png";
import LogoutButton from './LogOutButton'; // Import the LogoutButton component
import axios from 'axios';

const MenaxhimiKonferencave = () => {
  const [posts, setPosts] = useState([]); // For posts
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts', { withCredentials: true });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error.response || error.message);
    }
  };

  // Verifying if the user is logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Redirect to home if the user is already logged in and tries to access the login page
  if (isLoggedIn && window.location.pathname === "/login") {
    return <Navigate to="/" />;  // Updated to use Navigate
  }

  return (
    <div className="font-sans text-gray-800 bg-gray-100">
      <header className="bg-blue-600 shadow-md">
        <nav className="flex justify-between items-center px-8 py-6 text-white">
          <div className="text-3xl font-semibold text-center tracking-wide">Rrjeti i Konferencave 🌍💬</div>
          <ul className="flex space-x-6 text-lg">
            <li><a href="/" className="hover:text-teal-300 transition duration-200">Home</a></li>
            <li><a href="/menu" className="hover:text-teal-300 transition duration-200">Menu</a></li>
            <li><a href="/about-us" className="hover:text-teal-300 transition duration-200">About Us</a></li>
            <li><a href="/contact-us" className="hover:text-teal-300 transition duration-200">Contact Us</a></li>
            {!isLoggedIn && (
              <>
                <li><a href="/register" className="hover:text-teal-300 transition duration-200">Register</a></li>
                <li><a href="/login" className="hover:text-teal-300 transition duration-200">Log In</a></li>
              </>
            )}
            {isLoggedIn && (
              <li><LogoutButton /> {/* Show the LogoutButton component */}</li>
            )}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textShadow: "0 2px 5px rgba(0, 0, 0, 0.7)",
          padding: "0 20px",
        }}
      >
        <h1 style={{ fontSize: "4rem", fontWeight: "700" }}>Mirësevini në Platformën tonë</h1>
        <p className="text-xl font-medium text-white mb-4">Pjesëmarrje në konferenca për zhvillimin tuaj profesional!</p>
        <a href="/menu" className="btn bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-lg hover:from-pink-600 hover:to-indigo-600 transition duration-300 ease-in-out">shiko më shumë</a>
      </section>

      {/* Main "Postimet" link */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Postimet</h2>
        <p className="text-center text-gray-600 mb-12">Shikoni postimet e fundit nga konferencat tona</p>
        
        {/* Posts Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                {post.image && (
                  <div className="mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.content}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No posts found.</p>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12">Veçoritë</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
              <img
                src="gallery/photo_9.jpg"
                alt="Planifikimi i Konferencave"
                className="rounded-xl mb-6 transition-transform transform hover:scale-105"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Mundësi për rrjetëzim profesional</h3>
              <p className="text-gray-600">
                Konferencat ofrojnë mundësinë për të lidhur dhe shkëmbyer ide me profesionistë dhe ekspertë të industrisë,
                duke krijuar mundësi për bashkëpunime dhe zhvillim të rrjetit profesional.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
              <img
                src="gallery/photo_2.jpg"
                alt="Pjesëmarrësit"
                className="rounded-xl mb-6 transition-transform transform hover:scale-105"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Përditësim me tendencat më të fundit</h3>
              <p className="text-gray-600">
                Pjesëmarrësit mund të mësojnë për trendet dhe teknologjitë më
                të reja, duke fituar njohuri të vlefshme që mund të aplikohen në karrierën e tyre.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
              <img
                src="gallery/photo_3.jpg"
                alt="Përditësime në Kohë Reale"
                className="rounded-xl mb-6 transition-transform transform hover:scale-105"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Aftësim dhe zhvillim i aftësive praktike</h3>
              <p className="text-gray-600">
                Konferencat shpesh ofrojnë sesione trajnimi dhe punëtori që ndihmojnë pjesëmarrësit
                të zhvillojnë aftësi praktike dhe të thellojnë njohuritë në fusha specifike të interesit të tyre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Momentet e Konferencave</h2>
        <p className="text-center text-gray-600 mb-12">
          Shikoni disa nga momentet më të paharrueshme të konferencave tona!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          <img
            src="gallery/photo_4.jpg"
            alt="Moment 1"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_1.jpg"
            alt="Moment 2"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_6.jpg"
            alt="Moment 3"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_4.jpg"
            alt="Moment 4"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_8.jpg"
            alt="Moment 5"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_5.jpg"
            alt="Moment 6"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_10.jpg"
            alt="Moment 7"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_9.jpg"
            alt="Moment 8"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2024 Rrjeti i Konferencave 🌍💬. Të gjitha të drejtat të rezervuara.</p>
      </footer>
    </div>
  );
};

export default MenaxhimiKonferencave;
