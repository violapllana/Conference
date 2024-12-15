// import React, { useState, useEffect } from 'react';

// const ContactForm = () => {
//   const [messages, setMessages] = useState([]); // Mesazhet e dërguara
//   const [editMessage, setEditMessage] = useState(null); // Mesazhi për t'u redaktuar
//   const [name, setName] = useState(''); // Emri i përdoruesit
//   const [email, setEmail] = useState(''); // Email-i i përdoruesit
//   const [messageContent, setMessageContent] = useState(''); // Përmbajtja e mesazhit
//   const [loading, setLoading] = useState(false); // Loading state për butonin
//   const [responseMessage, setResponseMessage] = useState(''); // Mesazhi i përgjigjes nga backend

//   // Fetch messages
//   useEffect(() => {
//     fetch('http://localhost:5000/contact')
//       .then((response) => response.json())
//       .then((data) => setMessages(data))
//       .catch((error) => console.error('Error fetching messages:', error));
//   }, []);

//   // Function to add a new message (Contact Us form)
//   const addMessage = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const newMessage = { name, email, message: messageContent };

//     fetch('http://localhost:5000/contact', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newMessage),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setMessages((prevMessages) => [...prevMessages, data]); // Shto mesazhin e ri në listë
//         setName('');
//         setEmail('');
//         setMessageContent('');
//         setResponseMessage('Message sent successfully!');
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error adding message:', error);
//         setResponseMessage('There was an error sending your message.');
//         setLoading(false);
//       });
//   };

//   // Function to delete a message
//   const deleteMessage = (id) => {
//     fetch(`http://localhost:5000/contact/${id}`, { method: 'DELETE' })
//       .then(() => {
//         setMessages((prevMessages) =>
//           prevMessages.filter((message) => message.id !== id) // Heq mesazhin nga lista pas fshirjes
//         );
//       })
//       .catch((error) => console.error('Error deleting message:', error));
//   };

//   // Function to handle editing a message
//   const handleEditMessage = (message) => {
//     setEditMessage(message);
//     setName(message.name);
//     setEmail(message.email);
//     setMessageContent(message.message);
//   };

//   // Function to save the edited message
//   const saveEditedMessage = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const updatedMessage = { ...editMessage, name, email, message: messageContent };

//     fetch(`http://localhost:5000/contact/${editMessage.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedMessage),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const updatedMessages = messages.map((message) =>
//           message.id === data.id ? data : message
//         );
//         setMessages(updatedMessages);
//         setEditMessage(null);
//         setName('');
//         setEmail('');
//         setMessageContent('');
//         setResponseMessage('Message updated successfully!');
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error updating message:', error);
//         setResponseMessage('There was an error updating your message.');
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="bg-teal-400 min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={editMessage ? saveEditedMessage : addMessage}
//         className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
//       >
//         <h1 className="text-xl font-semibold text-gray-800 text-center">Contact Us</h1>
//         {responseMessage && (
//           <div className="text-green-600 text-center mb-2">{responseMessage}</div>
//         )}
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
//         />
//         <textarea
//           name="message"
//           placeholder="Enter your message!"
//           value={messageContent}
//           onChange={(e) => setMessageContent(e.target.value)}
//           className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700 resize-none"
//         ></textarea>
//         <button
//           type="submit"
//           className="bg-white border-2 border-teal-500 text-teal-500 py-2 px-4 rounded-full hover:bg-teal-500 hover:text-white transition"
//           disabled={loading}
//         >
//           {loading ? 'Sending...' : 'Send Message'}
//         </button>
//       </form>

//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md mt-8">
//         <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Messages</h2>
//         <ul>
//           {messages.map((message) => (
//             <li key={message.id} className="border-b border-gray-300 py-4">
//               <p><strong>{message.name}</strong> ({message.email})</p>
//               <p>{message.message}</p>
//               <div className="flex justify-between mt-2">
//                 <button
//                   onClick={() => handleEditMessage(message)}
//                   className="text-teal-500 hover:text-teal-700"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteMessage(message.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;
import React, { useState } from 'react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  // Function to add a new message
  const addMessage = (e) => {
    e.preventDefault();
    setLoading(true);
    const newMessage = { name, email, message: messageContent };

    fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    })
      .then((response) => response.json())
      .then(() => {
        setName('');
        setEmail('');
        setMessageContent('');
        setResponseMessage('Message sent successfully!');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error adding message:', error);
        setResponseMessage('There was an error sending your message.');
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
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700"
        />
        <textarea
          name="message"
          placeholder="Enter your message!"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-teal-500 py-2 px-4 text-gray-700 resize-none"
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
