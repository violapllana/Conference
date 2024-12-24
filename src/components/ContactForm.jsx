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
    <div className="bg-gray-300 flex flex-col min-h-screen justify-center items-center">
      <header className="bg-blue-600 shadow-md w-full">
        <nav className="flex justify-between items-center px-8 py-6 text-white">
          <div className="text-3xl font-extrabold">Menaxhimi i Konferencave</div>
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
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg flex flex-col gap-6 mt-12 mb-16"
      >
        <h1 className="text-xl font-semibold text-gray-800 text-center">Contact Us</h1>
        {responseMessage && (
          <div className="text-green-600 text-center mb-2">{responseMessage}</div>
        )}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
          required
        />
        <textarea
          name="message"
          placeholder="Enter your message!"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700 resize-none"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <footer className="bg-gray-800 text-white text-center py-6 w-full mt-auto">
        <p>&copy; 2024 Menaxhimi i Konferencave. Të gjitha të drejtat të rezervuara.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
