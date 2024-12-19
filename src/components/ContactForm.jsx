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
  
    const newMessage = { emri: name, email, mesazhi: messageContent };
    console.log('Duke dërguar mesazhin:', newMessage); // Log mesazhin që dërgohet
  
    fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Mesazhi u ruajt:', data);
        setName('');
        setEmail('');
        setMessageContent('');
        setResponseMessage('Mesazhi u dërgua me sukses!');
        setLoading(false);
  
        // Përditëso mesazhet ose njofto përdoruesin
        if (onMessageAdded) onMessageAdded();
      })
      .catch((error) => {
        console.error('Gabim në API:', error);
        setResponseMessage('Pati një gabim gjatë dërgimit të mesazhit.');
        setLoading(false);
      });
  };
  
  return (
    <div className="bg-teal-400 min-h-screen flex items-center justify-center">
      <form
        onSubmit={addMessage}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
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
          className="bg-white border-2 border-teal-500 text-teal-500 py-2 px-4 rounded-full hover:bg-teal-500 hover:text-white transition"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
