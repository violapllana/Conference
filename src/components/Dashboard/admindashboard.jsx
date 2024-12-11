import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { EditPost } from '../posts';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [posts, setPosts] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [users, setUsers] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedConference, setSelectedConference] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, postsRes, sponsorsRes, usersRes, conferencesRes, messagesRes] = await Promise.all([
          axios.get('http://localhost:5000/user', { withCredentials: true }),
          axios.get('http://localhost:5000/posts', { withCredentials: true }),
          axios.get('http://localhost:5000/sponsors', { withCredentials: true }),
          axios.get('http://localhost:5000/users', { withCredentials: true }),
          axios.get('http://localhost:5000/conferences', { withCredentials: true }),
          axios.get('http://localhost:5000/contact-messages', { withCredentials: true }),
        ]);

        setUser(userRes.data.user);
        setPosts(postsRes.data);
        setSponsors(sponsorsRes.data);
        setUsers(usersRes.data);
        setConferences(conferencesRes.data);
        setContactMessages(messagesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (endpoint, id, setState, state) => {
    try {
      await axios.delete(`http://localhost:5000/${endpoint}/${id}`, { withCredentials: true });
      setState(state.filter((item) => item._id !== id));
    } catch (error) {
      console.error(`Error deleting ${endpoint}:`, error.message);
    }
  };

  const renderList = (title, items, selectedItem, setSelectedItem, endpoint, setState) => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-2xl mb-4">{title}</h2>
      <ul>
        {items.map((item) => (
          <li
            key={item._id}
            className={`p-4 border rounded-md mb-4 ${selectedItem?._id === item._id ? 'bg-blue-100' : ''}`}
            onClick={() => setSelectedItem(item)}
          >
            <h3 className="text-xl font-semibold">{item.name || item.title}</h3>
            <p>{item.email || item.content || item.description}</p>
          </li>
        ))}
      </ul>
      {selectedItem && (
        <div className="mt-6 bg-gray-200 p-4 rounded-lg">
          <button
            onClick={() => handleDelete(endpoint, selectedItem._id, setState, items)}
            className="bg-red-500 text-white px-4 py-2 mr-2"
          >
            Delete
          </button>
          {endpoint === 'posts' && <EditPost post={selectedItem} />}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-teal-500 text-white">
        <div className="p-6 text-center font-semibold text-xl">Admin Panel</div>
        <ul className="mt-6 space-y-2">
          <li><button onClick={() => setActiveSection('conferences')} className="block py-2 px-4 hover:bg-teal-700">Conferences</button></li>
          <li><button onClick={() => setActiveSection('users')} className="block py-2 px-4 hover:bg-teal-700">Users</button></li>
          <li><button onClick={() => setActiveSection('sponsors')} className="block py-2 px-4 hover:bg-teal-700">Sponsors</button></li>
          <li><button onClick={() => setActiveSection('posts')} className="block py-2 px-4 hover:bg-teal-700">Posts</button></li>
          <li><button onClick={() => setActiveSection('contactMessages')} className="block py-2 px-4 hover:bg-teal-700">Contact Messages</button></li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          {user?.role === 'admin' && <p className="text-sm text-red-500">This template is under maintenance!</p>}
        </header>

        {activeSection === 'posts' && renderList('Posts List', posts, selectedPost, setSelectedPost, 'posts', setPosts)}
        {activeSection === 'sponsors' && renderList('Sponsors List', sponsors, selectedSponsor, setSelectedSponsor, 'sponsors', setSponsors)}
        {activeSection === 'users' && renderList('Users List', users, selectedUser, setSelectedUser, 'users', setUsers)}
        {activeSection === 'conferences' && renderList('Conferences List', conferences, selectedConference, setSelectedConference, 'conferences', setConferences)}
        {activeSection === 'contactMessages' && renderList('Contact Messages', contactMessages, selectedMessage, setSelectedMessage, 'contact-messages', setContactMessages)}
      </div>
    </div>
  );
};

export default AdminDashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { EditPost } from '../components/posts';  // Assuming EditPost is in the same folder

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [activeSection, setActiveSection] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [sponsors, setSponsors] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [conferences, setConferences] = useState([]);
//   const [contactMessages, setContactMessages] = useState([]);

//   const [selectedPost, setSelectedPost] = useState(null);
//   const [selectedSponsor, setSelectedSponsor] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedConference, setSelectedConference] = useState(null);
//   const [selectedMessage, setSelectedMessage] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [userRes, postsRes, sponsorsRes, usersRes, conferencesRes, messagesRes] = await Promise.all([
//           axios.get('http://localhost:5000/user', { withCredentials: true }),
//           axios.get('http://localhost:5000/posts', { withCredentials: true }),
//           axios.get('http://localhost:5000/sponsors', { withCredentials: true }),
//           axios.get('http://localhost:5000/users', { withCredentials: true }),
//           axios.get('http://localhost:5000/conferences', { withCredentials: true }),
//           axios.get('http://localhost:5000/contact-messages', { withCredentials: true }),
//         ]);

//         setUser(userRes.data.user);
//         setPosts(postsRes.data);
//         setSponsors(sponsorsRes.data);
//         setUsers(usersRes.data);
//         setConferences(conferencesRes.data);
//         setContactMessages(messagesRes.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (endpoint, id, setState, state) => {
//     try {
//       await axios.delete(`http://localhost:5000/${endpoint}/${id}`, { withCredentials: true });
//       setState(state.filter((item) => item._id !== id));
//     } catch (error) {
//       console.error(`Error deleting ${endpoint}:`, error.message);
//     }
//   };

//   const renderList = (title, items, selectedItem, setSelectedItem, endpoint, setState) => (
//     <div className="bg-white p-6 rounded-lg shadow mb-6">
//       <h2 className="text-2xl mb-4">{title}</h2>
//       <ul>
//         {items.map((item) => (
//           <li
//             key={item._id}
//             className={`p-4 border rounded-md mb-4 ${selectedItem?._id === item._id ? 'bg-blue-100' : ''}`}
//             onClick={() => setSelectedItem(item)}
//           >
//             <h3 className="text-xl font-semibold">{item.name || item.title}</h3>
//             <p>{item.email || item.content || item.description}</p>
//           </li>
//         ))}
//       </ul>
//       {selectedItem && (
//         <div className="mt-6 bg-gray-200 p-4 rounded-lg">
//           <button
//             onClick={() => handleDelete(endpoint, selectedItem._id, setState, items)}
//             className="bg-red-500 text-white px-4 py-2 mr-2"
//           >
//             Delete
//           </button>
//           {endpoint === 'posts' && <EditPost post={selectedItem} />}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="w-64 bg-teal-500 text-white">
//         <div className="p-6 text-center font-semibold text-xl">Admin Panel</div>
//         <ul className="mt-6 space-y-2">
//           <li><button onClick={() => setActiveSection('conferences')} className="block py-2 px-4 hover:bg-teal-700">Conferences</button></li>
//           <li><button onClick={() => setActiveSection('users')} className="block py-2 px-4 hover:bg-teal-700">Users</button></li>
//           <li><button onClick={() => setActiveSection('sponsors')} className="block py-2 px-4 hover:bg-teal-700">Sponsors</button></li>
//           <li><button onClick={() => setActiveSection('posts')} className="block py-2 px-4 hover:bg-teal-700">Posts</button></li>
//           <li><button onClick={() => setActiveSection('contactMessages')} className="block py-2 px-4 hover:bg-teal-700">Contact Messages</button></li>
//         </ul>
//       </div>

//       <div className="flex-1 p-6">
//         <header className="mb-6">
//           <h1 className="text-3xl font-semibold">Dashboard</h1>
//           {user?.role === 'admin' && <p className="text-sm text-red-500">This template is under maintenance!</p>}
//         </header>

//         {activeSection === 'posts' && renderList('Posts List', posts, selectedPost, setSelectedPost, 'posts', setPosts)}
//         {activeSection === 'sponsors' && renderList('Sponsors List', sponsors, selectedSponsor, setSelectedSponsor, 'sponsors', setSponsors)}
//         {activeSection === 'users' && renderList('Users List', users, selectedUser, setSelectedUser, 'users', setUsers)}
//         {activeSection === 'conferences' && renderList('Conferences List', conferences, selectedConference, setSelectedConference, 'conferences', setConferences)}
//         {activeSection === 'contactMessages' && renderList('Contact Messages', contactMessages, selectedMessage, setSelectedMessage, 'contact-messages', setContactMessages)}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
