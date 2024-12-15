import React, { useState } from 'react';


const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResponseMessage(data.message); // Set the response message from the server
    } catch (error) {
      setResponseMessage('Failed to send message.');
    }
  };

  return (
    <div className="bg-teal-400 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
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
          value={formData.name}
          onChange={handleChange}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
        />
        <textarea
          name="message"
          placeholder="Enter your message!"
          value={formData.message}
          onChange={handleChange}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700 resize-none"
        ></textarea>
        <button
          type="submit"
          className="bg-white border-2 border-teal-500 text-teal-500 py-2 px-4 rounded-full hover:bg-teal-500 hover:text-white transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
