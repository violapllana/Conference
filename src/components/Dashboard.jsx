import React, { useState } from 'react';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('item');
  const [item, setItem] = useState([
    { title: 'Conference 1', amount: '$100', address: 'New York' },
    { title: 'Conference 2', amount: '$200', address: 'London' },
  ]);
  const [users, setUsers] = useState([
    { name: 'User 1', email: 'user1@example.com' },
    { name: 'User 2', email: 'user2@example.com' },
  ]);
  const [sponsors, setSponsors] = useState([
    { name: 'Sponsor 1', amount: '$500' },
    { name: 'Sponsor 2', amount: '$1000' },
  ]);
  const [posts, setPosts] = useState([
    { title: 'Post 1', content: 'Content for post 1' },
    { title: 'Post 2', content: 'Content for post 2' },
  ]);
  const [contactMessages, setContactMessages] = useState([
    { sender: 'Sender 1', message: 'Message 1' },
    { sender: 'Sender 2', message: 'Message 2' },
  ]);

  const [newItem, setNewItem] = useState({
    title: '',
    amount: '',
    address: '',
    name: '',
    email: '',
    content: '',
    message: '',
  });

  const handleAdd = () => {
    if (activeSection === 'item') {
      setItem([...item, { title: newItem.title, amount: newItem.amount, address: newItem.address }]);
    } else if (activeSection === 'users') {
      setUsers([...users, { name: newItem.name, email: newItem.email }]);
    } else if (activeSection === 'sponsors') {
      setSponsors([...sponsors, { name: newItem.name, amount: newItem.amount }]);
    } else if (activeSection === 'posts') {
      setPosts([...posts, { title: newItem.title, content: newItem.content }]);
    } else if (activeSection === 'contactMessages') {
      setContactMessages([...contactMessages, { sender: newItem.name, message: newItem.message }]);
    }
    setNewItem({
      title: '',
      amount: '',
      address: '',
      name: '',
      email: '',
      content: '',
      message: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (section, index) => {
    // Edit logic here
    console.log('Editing item', section, index);
    const itemToEdit = getSectionData(section)[index];
    // Pre-fill form with current item data
    setNewItem(itemToEdit);
    setActiveSection(section); // Rikthe tek lista përkatëse
  setNewItem({ title: '', amount: '', address: '', name: '', email: '', content: '', message: '' });
  };

  const handleDelete = (section, index) => {
    // Delete logic here
    console.log('Deleting item', section, index);
    const updatedItems = getSectionData(section).filter((_, i) => i !== index);
    setSectionData(section, updatedItems);
  };

  const getSectionData = (section) => {
    if (section === 'item') return item;
    if (section === 'users') return users;
    if (section === 'sponsors') return sponsors;
    if (section === 'posts') return posts;
    if (section === 'contactMessages') return contactMessages;
    return [];
  };

  const setSectionData = (section, data) => {
    if (section === 'item') setItem(data);
    if (section === 'users') setUsers(data);
    if (section === 'sponsors') setSponsors(data);
    if (section === 'posts') setPosts(data);
    if (section === 'contactMessages') setContactMessages(data);
  };

  const renderList = (title, items, section) => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-2xl mb-4">{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="p-4 border rounded-md mb-4">
            <h3 className="text-xl font-semibold">{item.title || item.name || item.sender}</h3>
            <p>{item.amount || item.email || item.content || item.message}</p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => handleEdit(section, index)}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(section, index)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderAddForm = () => {
    if (activeSection === 'item') {
      return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl mb-4">Add Conference</h2>
          <input
            type="text"
            name="title"
            value={newItem.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <input
            type="text"
            name="amount"
            value={newItem.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address"
            value={newItem.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Conference
          </button>
        </div>
      );
    } else if (activeSection === 'users') {
      return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl mb-4">Add User</h2>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            value={newItem.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
      );
    } else if (activeSection === 'sponsors') {
      return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl mb-4">Add Sponsor</h2>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <input
            type="text"
            name="amount"
            value={newItem.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Sponsor
          </button>
        </div>
      );
    } else if (activeSection === 'posts') {
      return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl mb-4">Add Post</h2>
          <input
            type="text"
            name="title"
            value={newItem.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <textarea
            name="content"
            value={newItem.content}
            onChange={handleInputChange}
            placeholder="Content"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Post
          </button>
        </div>
      );
    } else if (activeSection === 'contact-us') {
      return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl mb-4">Add Contact Message</h2>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="Sender Name"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <textarea
            name="message"
            value={newItem.message}
            onChange={handleInputChange}
            placeholder="Message"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Message
          </button>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-teal-500 text-white">
        <div className="p-6 text-center font-semibold text-xl">Admin Panel</div>
        <ul className="mt-6 space-y-2">
          <li>
            <button onClick={() => setActiveSection('item')} className="block py-2 px-4 hover:bg-teal-700">
              item
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection('users')} className="block py-2 px-4 hover:bg-teal-700">
              Users
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection('sponsors')} className="block py-2 px-4 hover:bg-teal-700">
              Sponsors
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection('posts')} className="block py-2 px-4 hover:bg-teal-700">
              Posts
            </button>
          </li>
          <li>
            <button onClick={() => setActiveSection('contact-us')} className="block py-2 px-4 hover:bg-teal-700">
              Contact Messages
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </header>

        {renderAddForm()}
        {activeSection === 'item' && renderList('item List', item, 'item')}
        {activeSection === 'users' && renderList('Users List', users, 'users')}
        {activeSection === 'sponsors' && renderList('Sponsors List', sponsors, 'sponsors')}
        {activeSection === 'posts' && renderList('Posts List', posts, 'posts')}
        {activeSection === 'contactMessages' && renderList('Contact Messages List', contactMessages, 'contactMessages')}
      </div>
    </div>
  );
}

export default Dashboard;
