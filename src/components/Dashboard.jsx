// import React, { useState } from 'react';

// function Dashboard() {
//   const [activeSection, setActiveSection] = useState('item');
//   const [item, setItem] = useState([
//     { title: 'Conference 1', amount: '$100', address: 'New York' },
//     { title: 'Conference 2', amount: '$200', address: 'London' },
//   ]);
//   const [users, setUsers] = useState([
//     { name: 'User 1', email: 'user1@example.com' },
//     { name: 'User 2', email: 'user2@example.com' },
//   ]);
//   const [sponsors, setSponsors] = useState([
//     { name: 'Sponsor 1', amount: '$500' },
//     { name: 'Sponsor 2', amount: '$1000' },
//   ]);
//   const [posts, setPosts] = useState([
//     { title: 'Post 1', content: 'Content for post 1' },
//     { title: 'Post 2', content: 'Content for post 2' },
//   ]);
//   const [contactMessages, setContactMessages] = useState([
//     { sender: 'Sender 1', message: 'Message 1' },
//     { sender: 'Sender 2', message: 'Message 2' },
//   ]);

//   const [newItem, setNewItem] = useState({
//     title: '',
//     amount: '',
//     address: '',
//     name: '',
//     email: '',
//     content: '',
//     message: '',
//   });

//   const handleAdd = () => {
//     if (activeSection === 'item') {
//       setItem([...item, { title: newItem.title, amount: newItem.amount, address: newItem.address }]);
//     } else if (activeSection === 'users') {
//       setUsers([...users, { name: newItem.name, email: newItem.email }]);
//     } else if (activeSection === 'sponsors') {
//       setSponsors([...sponsors, { name: newItem.name, amount: newItem.amount }]);
//     } else if (activeSection === 'posts') {
//       setPosts([...posts, { title: newItem.title, content: newItem.content }]);
//     } else if (activeSection === 'contactMessages') {
//       setContactMessages([...contactMessages, { sender: newItem.name, message: newItem.message }]);
//     }
//     setNewItem({
//       title: '',
//       amount: '',
//       address: '',
//       name: '',
//       email: '',
//       content: '',
//       message: '',
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewItem((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEdit = (section, index) => {
//     // Edit logic here
//     console.log('Editing item', section, index);
//     const itemToEdit = getSectionData(section)[index];
//     // Pre-fill form with current item data
//     setNewItem(itemToEdit);
//     setActiveSection(section); // Rikthe tek lista përkatëse
//   setNewItem({ title: '', amount: '', address: '', name: '', email: '', content: '', message: '' });
//   };

//   const handleDelete = (section, index) => {
//     // Delete logic here
//     console.log('Deleting item', section, index);
//     const updatedItems = getSectionData(section).filter((_, i) => i !== index);
//     setSectionData(section, updatedItems);
//   };

//   const getSectionData = (section) => {
//     if (section === 'item') return item;
//     if (section === 'users') return users;
//     if (section === 'sponsors') return sponsors;
//     if (section === 'posts') return posts;
//     if (section === 'contactMessages') return contactMessages;
//     return [];
//   };

//   const setSectionData = (section, data) => {
//     if (section === 'item') setItem(data);
//     if (section === 'users') setUsers(data);
//     if (section === 'sponsors') setSponsors(data);
//     if (section === 'posts') setPosts(data);
//     if (section === 'contactMessages') setContactMessages(data);
//   };

//   const renderList = (title, items, section) => (
//     <div className="bg-white p-6 rounded-lg shadow mb-6">
//       <h2 className="text-2xl mb-4">{title}</h2>
//       <ul>
//         {items.map((item, index) => (
//           <li key={index} className="p-4 border rounded-md mb-4">
//             <h3 className="text-xl font-semibold">{item.title || item.name || item.sender}</h3>
//             <p>{item.amount || item.email || item.content || item.message}</p>
//             <div className="mt-2 flex space-x-2">
//               <button
//                 onClick={() => handleEdit(section, index)}
//                 className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(section, index)}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );

//   const renderAddForm = () => {
//     if (activeSection === 'item') {
//       return (
//         <div className="bg-white p-6 rounded-lg shadow mb-6">
//           <h2 className="text-2xl mb-4">Add Conference</h2>
//           <input
//             type="text"
//             name="title"
//             value={newItem.title}
//             onChange={handleInputChange}
//             placeholder="Title"
//             className="mb-2 p-2 w-full border border-gray-300 rounded"
//           />
//           <input
//             type="text"
//             name="amount"
//             value={newItem.amount}
//             onChange={handleInputChange}
//             placeholder="Amount"
//             className="mb-2 p-2 w-full border border-gray-300 rounded"
//           />
//           <input
//             type="text"
//             name="address"
//             value={newItem.address}
//             onChange={handleInputChange}
//             placeholder="Address"
//             className="mb-2 p-2 w-full border border-gray-300 rounded"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Add Conference
//           </button>
//         </div>
//       );
//     } else if (activeSection === 'users') {
//       return (
//         <div className="bg-white p-6 rounded-lg shadow mb-6">
//           <h2 className="text-2xl mb-4">Add User</h2>
//           <input
//             type="text"
//             name="name"
//             value={newItem.name}
//             onChange={handleInputChange}
//             placeholder="Name"
//             className="mb-2 p-2 w-full border border-gray-300 rounded"
//           />
//           <input
//             type="email"
//             name="email"
//             value={newItem.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             className="mb-2 p-2 w-full border border-gray-300 rounded"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Add User
//           </button>
//         </div>
//       );
//     } else if (activeSection === 'sponsors') {
//       return (
//         <div className="bg-white p-6 rounded-lg shadow mb-6">
//           <h2 className="text-2xl mb-4">Add Sponsor</h2>
//           <input
//             type="text"
//             name="name"
//             value={newItem.name}
//             onChange={handleInputChange}
//             placeholder="Name"
//             className="mb-2 p-2 w-full border border-gray-300 rounded"
//           />
//           <input
//             type="text"
//             name="amount"
//             value={newItem.amount}
//             onChange={handleInputChange}
//             placeholder="Amount"
//             className="mb-2 p-2 w-full border border-gray-300 rounded"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Add Sponsor
//           </button>
//         </div>
//       );
//     } else if (activeSection === 'posts') {
//       return (
//         <div className="bg-white p-6 rounded-lg shadow mb-6">
//           <h2 className="text-2xl mb-4">Add Post</h2>
//           <input
//             type="text"
//             name="title"
//             value={newItem.title}
//             onChange={handleInputChange}
//             placeholder="Title"
//             className="mb-2 p-2 w-full border border-gray-300 rounded"
//           />
//           <textarea
//             name="content"
//             value={newItem.content}
//             onChange={handleInputChange}
//             placeholder="Content"
//             className="mb-2 p-2 w-full border border-gray-300 rounded"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Add Post
//           </button>
//         </div>
//       );
//     } else if (activeSection === 'contact-us') {
//       return (
//         <div className="bg-white p-6 rounded-lg shadow mb-6">
//           <h2 className="text-2xl mb-4">Add Contact Message</h2>
//           <input
//             type="text"
//             name="name"
//             value={newItem.name}
//             onChange={handleInputChange}
//             placeholder="Sender Name"
//             className="mb-2 p-2 w-full border border-gray-300 rounded"
//           />
//           <textarea
//             name="message"
//             value={newItem.message}
//             onChange={handleInputChange}
//             placeholder="Message"
//             className="mb-2 p-2 w-full border border-gray-300 rounded"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Add Message
//           </button>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="w-64 bg-teal-500 text-white">
//         <div className="p-6 text-center font-semibold text-xl">Admin Panel</div>
//         <ul className="mt-6 space-y-2">
//           <li>
//             <button onClick={() => setActiveSection('item')} className="block py-2 px-4 hover:bg-teal-700">
//               item
//             </button>
//           </li>
//           <li>
//             <button onClick={() => setActiveSection('users')} className="block py-2 px-4 hover:bg-teal-700">
//               Users
//             </button>
//           </li>
//           <li>
//             <button onClick={() => setActiveSection('sponsors')} className="block py-2 px-4 hover:bg-teal-700">
//               Sponsors
//             </button>
//           </li>
//           <li>
//             <button onClick={() => setActiveSection('posts')} className="block py-2 px-4 hover:bg-teal-700">
//               Posts
//             </button>
//           </li>
//           <li>
//             <button onClick={() => setActiveSection('contact-us')} className="block py-2 px-4 hover:bg-teal-700">
//               Contact Messages
//             </button>
//           </li>
//         </ul>
//       </div>

//       <div className="flex-1 p-6">
//         <header className="mb-6">
//           <h1 className="text-3xl font-semibold">Dashboard</h1>
//         </header>

//         {renderAddForm()}
//         {activeSection === 'item' && renderList('item List', item, 'item')}
//         {activeSection === 'users' && renderList('Users List', users, 'users')}
//         {activeSection === 'sponsors' && renderList('Sponsors List', sponsors, 'sponsors')}
//         {activeSection === 'posts' && renderList('Posts List', posts, 'posts')}
//         {activeSection === 'contactMessages' && renderList('Contact Messages List', contactMessages, 'contactMessages')}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [posts, setPosts] = useState([]);
//   const [sponsors, setSponsors] = useState([]); 
//   const [editPost, setEditPost] = useState(null);
//   const [editSponsor, setEditSponsor] = useState(null);
//   const [activeSection, setActiveSection] = useState('posts'); // Active section (posts or sponsors)
  
//   // For posts
//   const [title, setTitle] = useState(''); // Post title variable
//   const [content, setContent] = useState(''); // Post content variable

//   // Fetch posts from server
//   useEffect(() => {
//     fetch('http://localhost:5000/posts')
//       .then((response) => response.json())
//       .then((data) => setPosts(data))
//       .catch((error) => console.error('Error fetching posts:', error));
//   }, []);

//   // Fetch sponsors from server
//   useEffect(() => {
//     fetch('http://localhost:5000/sponsors')
//       .then((response) => response.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setSponsors(data);
//         } else {
//           console.error('Sponsor data is in incorrect format');
//         }
//       })
//       .catch((error) => console.error('Error fetching sponsors:', error));
//   }, []);

//   // Function to add a new post
//   const addPost = (e) => {
//     e.preventDefault();

//     const newPost = { title, content };

//     fetch('http://localhost:5000/posts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newPost),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setPosts([...posts, data]); // Add the new post to the list
//         setTitle('');
//         setContent('');
//       })
//       .catch((error) => console.error('Error adding post:', error));
//   };

//   // Function to add a new sponsor
//   const addSponsor = (e) => {
//     e.preventDefault();
//     const newSponsor = {
//       id: sponsors.length + 1,
//       name: e.target.name.value,
//       details: e.target.details.value,
//     };
//     setSponsors([...sponsors, newSponsor]);
//     e.target.reset();
//   };

//   // Function to edit a post
//   const handleEditPost = (post) => {
//     setEditPost(post);
//     setTitle(post.title); // Set title and content for editing
//     setContent(post.content);
//   };

//   // Function to edit a sponsor
//   const handleEditSponsor = (sponsor) => {
//     setEditSponsor(sponsor);
//   };

//   // Function to save the edited post
//   const saveEditedPost = (e) => {
//     e.preventDefault();
//     const updatedPosts = posts.map((post) =>
//       post.id === editPost.id
//         ? { ...post, title: e.target.title.value, content: e.target.content.value }
//         : post
//     );
//     setPosts(updatedPosts);
//     setEditPost(null);
//   };

//   // Function to save the edited sponsor
//   const saveEditedSponsor = (e) => {
//     e.preventDefault();
//     const updatedSponsors = sponsors.map((sponsor) =>
//       sponsor.id === editSponsor.id
//         ? { ...sponsor, name: e.target.name.value, details: e.target.details.value }
//         : sponsor
//     );
//     setSponsors(updatedSponsors);
//     setEditSponsor(null);
//   };

//   // Function to delete a post
//   const deletePost = (id) => {
//     const updatedPosts = posts.filter((post) => post.id !== id);
//     setPosts(updatedPosts);
//   };

//   // Function to delete a sponsor
//   const deleteSponsor = (id) => {
//     const updatedSponsors = sponsors.filter((sponsor) => sponsor.id !== id);
//     setSponsors(updatedSponsors);
//   };

//   // Function to change sections (posts or sponsors)
//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <h2>Admin Panel</h2>
//         <a href="#posts" onClick={() => handleSectionChange('posts')}>
//           Postimet
//         </a>
//         <a href="#sponsors" onClick={() => handleSectionChange('sponsors')}>
//           Sponsorët
//         </a>
//       </div>

//       <div className="main-content">
//         <h1 className="title">Dashboard</h1>

//         {/* Post Section */}
//         {activeSection === 'posts' && (
//           <div className="section">
//             <h2 className="section-title">Postimet</h2>

//             {/* Form to add a post */}
//             <form onSubmit={addPost} className="add-form">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Titulli i postimit"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)} // Bind to useState
//                 required
//                 className="input-field"
//               />
//               <textarea
//                 name="content"
//                 placeholder="Përmbajtja e postimit"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)} // Bind to useState
//                 required
//                 className="textarea-field"
//               />
//               <button type="submit" className="btn-add">
//                 Shto Postim
//               </button>
//             </form>

//             {/* Edit post form */}
//             {editPost && (
//               <form onSubmit={saveEditedPost} className="add-form">
//                 <input
//                   type="text"
//                   name="title"
//                   defaultValue={editPost.title}
//                   required
//                   className="input-field"
//                 />
//                 <textarea
//                   name="content"
//                   defaultValue={editPost.content}
//                   required
//                   className="textarea-field"
//                 />
//                 <button type="submit" className="btn-add">
//                   Ruaj Postimin
//                 </button>
//               </form>
//             )}

//             <div className="item-list">
//               {posts.map((post) => (
//                 <div key={post.id} className="item">
//                   <span>{post.title}</span>
//                   <div>
//                     <button onClick={() => handleEditPost(post)} className="btn-edit">
//                       Edito
//                     </button>
//                     <button onClick={() => deletePost(post.id)} className="btn-delete">
//                       Fshi
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Sponsors Section */}
//         {activeSection === 'sponsors' && (
//           <div className="section">
//             <h2 className="section-title">Sponsorët</h2>

//             {/* Form to add a sponsor */}
//             <form onSubmit={addSponsor} className="add-form">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Emri i sponsorit"
//                 required
//                 className="input-field"
//               />
//               <textarea
//                 name="details"
//                 placeholder="Detajet e sponsorit"
//                 required
//                 className="textarea-field"
//               />
//               <button type="submit" className="btn-add">
//                 Shto Sponsor
//               </button>
//             </form>

//             {/* Edit sponsor form */}
//             {editSponsor && (
//               <form onSubmit={saveEditedSponsor} className="add-form">
//                 <input
//                   type="text"
//                   name="name"
//                   defaultValue={editSponsor.name}
//                   required
//                   className="input-field"
//                 />
//                 <textarea
//                   name="details"
//                   defaultValue={editSponsor.details}
//                   required
//                   className="textarea-field"
//                 />
//                 <button type="submit" className="btn-add">
//                   Ruaj Sponsorin
//                 </button>
//               </form>
//             )}

//             <div className="item-list">
//               {sponsors.map((sponsor) => (
//                 <div key={sponsor.id} className="item">
//                   <span>{sponsor.name}</span>
//                   <div>
//                     <button onClick={() => handleEditSponsor(sponsor)} className="btn-edit">
//                       Edito
//                     </button>
//                     <button onClick={() => deleteSponsor(sponsor.id)} className="btn-delete">
//                       Fshi
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [activeSection, setActiveSection] = useState('posts'); // Active section (posts or sponsors)

  // For posts
  const [title, setTitle] = useState(''); // Post title variable
  const [content, setContent] = useState(''); // Post content variable

  // Fetch posts from server
  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  // Function to add a new post
  const addPost = (e) => {
    e.preventDefault();

    const newPost = { title, content };

    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data]); // Add the new post to the list
        setTitle('');
        setContent('');
      })
      .catch((error) => console.error('Error adding post:', error));
  };

  // Function to edit a post
  const handleEditPost = (post) => {
    setEditPost(post);
    setTitle(post.title); // Set title and content for editing
    setContent(post.content);
  };

  // Function to save the edited post
  const saveEditedPost = (e) => {
    e.preventDefault();
    const updatedPosts = posts.map((post) =>
      post.id === editPost.id
        ? { ...post, title: e.target.title.value, content: e.target.content.value }
        : post
    );
    setPosts(updatedPosts);
    setEditPost(null);
  };

  // Function to delete a post
  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  // Function to change sections (posts or sponsors)
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <a href="#posts" onClick={() => handleSectionChange('posts')}>
          Postimet
        </a>
      </div>

      <div className="main-content">
        <h1 className="title">Dashboard</h1>

        {/* Post Section */}
        {activeSection === 'posts' && (
          <div className="section">
            <h2 className="section-title">Postimet</h2>

            {/* Form to add a post */}
            <form onSubmit={addPost} className="add-form">
              <input
                type="text"
                name="title"
                placeholder="Titulli i postimit"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Bind to useState
                required
                className="input-field"
              />
              <textarea
                name="content"
                placeholder="Përmbajtja e postimit"
                value={content}
                onChange={(e) => setContent(e.target.value)} // Bind to useState
                required
                className="textarea-field"
              />
              <button type="submit" className="btn-add">
                Shto Postim
              </button>
            </form>

            {/* Edit post form */}
            {editPost && (
              <form onSubmit={saveEditedPost} className="add-form">
                <input
                  type="text"
                  name="title"
                  defaultValue={editPost.title}
                  required
                  className="input-field"
                />
                <textarea
                  name="content"
                  defaultValue={editPost.content}
                  required
                  className="textarea-field"
                />
                <button type="submit" className="btn-add">
                  Ruaj Postimin
                </button>
              </form>
            )}

            <div className="item-list">
              {posts.map((post) => (
                <div key={post.id} className="item">
                  <span>{post.title}</span>
                  <div>
                    <button onClick={() => handleEditPost(post)} className="btn-edit">
                      Edito
                    </button>
                    <button onClick={() => deletePost(post.id)} className="btn-delete">
                      Fshi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
