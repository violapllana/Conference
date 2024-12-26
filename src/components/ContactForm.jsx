import React, { useState } from 'react';

const ContactUs = ({ onMessageAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const addMessage = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setResponseMessage('Email nuk është në formatin e saktë!');
      setLoading(false);
      return;
    }

    const newMessage = { emri: name, email, mesazhi: messageContent };
    console.log('Duke dërguar mesazhin:', newMessage);

    fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Mesazhi u ruajt:', data);

        if (data.message) {
          setResponseMessage(data.message);
          if (onMessageAdded) onMessageAdded();
        } else {
          setResponseMessage('Pati një gabim gjatë dërgimit të mesazhit.');
        }

        setName('');
        setEmail('');
        setMessageContent('');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Gabim në API:', error);
        setResponseMessage('Pati një gabim gjatë dërgimit të mesazhit.');
        setLoading(false);
      });
  };

  return (
    <div className="bg-gradient-to-r from-gray-300 to-gray-500 flex flex-col min-h-screen justify-center items-center">
      <header className="bg-blue-600 shadow-md w-full">
        <nav className="flex justify-between items-center px-8 py-6 text-white">
          <div className="text-3xl font-semibold text-center tracking-wide">Rrjeti i Konferencave 🌍💬</div>
          <ul className="flex space-x-6 text-lg">
            <li>
              <a href="/" className="hover:text-teal-300 transition duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/menu" className="hover:text-teal-300 transition duration-200">
                Menu
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:text-teal-300 transition duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-teal-300 transition duration-200">
                Register
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-teal-300 transition duration-200">
                Log In
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <form
        onSubmit={addMessage}
        className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md flex flex-col gap-6 mt-12 mb-16"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Na kontaktoni!</h1>
        {responseMessage && (
          <div className="text-green-600 text-center mb-2">{responseMessage}</div>
        )}
        <input
          type="text"
          name="name"
          placeholder="Emri"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <textarea
          name="message"
          placeholder="Shkruaj mesazhin!"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Dergo mesazhin'}
        </button>
      </form>

      <footer className="bg-gray-800 text-white text-center py-6 w-full mt-auto">
        <p>&copy; 2024 Rrjeti i Konferencave 🌍💬. Të gjitha të drejtat të rezervuara.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
