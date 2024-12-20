// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import Sponsors from './sponsor'; // Import Sponsors component
// import Participants from './Participant'; // Import Participants component
// import Items from "./CrudTest";
// import ContactUs from './ContactForm';


// const Dashboard = () => {
//   const [posts, setPosts] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [activeTab, setActiveTab] = useState('posts');
//   const [editPost, setEditPost] = useState(null);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState('');
//   const [error, setError] = useState('');

//   // Fetch posts
//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/posts');
//       const data = await response.json();
//       console.log('Fetched posts:', data); // Kontrolloni të dhënat që po merrni
//       setPosts(data);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };
//   useEffect(() => {
//     fetchContacts();
//   }, []);
//   // Fetch contacts
//   const fetchContacts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/contact');
//       const data = await response.json();
//       setContacts(data);
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//     }
//   };
  

//   const deleteContact = (id) => {
//     fetch(`http://localhost:5000/contact/${id}`, { method: 'DELETE' })
//       .then(() => {
//         setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
//       })
//       .catch((error) => console.error('Error deleting contact:', error));
//   };

//   const deletePost = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/posts/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         console.log(`Postimi me ID ${id} u fshi me sukses`);
//         setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
//       } else {
//         const result = await response.json();
//         console.error('Gabim gjatë fshirjes së postimit:', result);
//       }
//     } catch (error) {
//       console.error('Gabim gjatë lidhjes me serverin për fshirjen e postimit:', error);
//     }
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!title || !content || (!editPost && !imageFile)) {
//       setError('Ju lutem plotësoni të gjitha fushat dhe ngarkoni një imazh.');
//       return;
//     }
//     setError('');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);

//     if (imageFile) {
//       formData.append('image', imageFile);
//     }

//     const requestOptions = {
//       method: editPost ? 'PUT' : 'POST',
//       body: formData,
//     };

//     const url = editPost
//       ? `http://localhost:5000/posts/${editPost.id}`
//       : 'http://localhost:5000/posts';

//     try {
//       const response = await fetch(url, requestOptions);

//       if (!response.ok) {
//         const result = await response.json();
//         console.error('Error submitting post:', result);
//         setError('Dështoi shtimi i postimit. Ju lutem kontrolloni të dhënat.');
//         return;
//       }

//       const result = await response.json();

//       if (editPost) {
//         setPosts((prevPosts) =>
//           prevPosts.map((post) => (post.id === result.id ? result : post))
//         );
//       } else {
//         setPosts((prevPosts) => [...prevPosts, result]);
//       }

//       setEditPost(null);
//       setTitle('');
//       setContent('');
//       setImageFile(null);
//       setPreviewImage('');
//     } catch (error) {
//       console.error('Error submitting post:', error);
//       setError('Gabim gjatë lidhjes me serverin.');
//     }
//   };

//   const handleEditPost = (post) => {
//     setEditPost(post);
//     setTitle(post.title);
//     setContent(post.content);
//     setPreviewImage(post.image ? `http://localhost:5000/uploads/${post.image}` : '');
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     setPreviewImage(file ? URL.createObjectURL(file) : '');
//   };
// <ContactUs onMessageAdded={fetchContacts} />

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <h2>Admin Panel</h2>
//         <a
//           href="#posts"
//           onClick={() => setActiveTab('posts')}
//           className={activeTab === 'posts' ? 'active' : ''}
//         >
//           Posts
//         </a>
//         <a
//           href="#contacts"
//           onClick={() => setActiveTab('contacts')}
//           className={activeTab === 'contacts' ? 'active' : ''}
//         >
//           Contact Messages
//         </a>
//         <a
//           href="#sponsors"
//           onClick={() => setActiveTab('sponsors')}
//           className={activeTab === 'sponsors' ? 'active' : ''}
//         >
//           Sponsors
//         </a>
//         <a
//           href="#participants"
//           onClick={() => setActiveTab('participants')}
//           className={activeTab === 'participants' ? 'active' : ''}
//         >
//           Participants
//         </a>
//         <a
//   href="#items"
//   onClick={() => setActiveTab('items')}
//   className={activeTab === 'items' ? 'active' : ''}
// >
//   Conferences
// </a>

//       </div>

//       <div className="main-content">
//         <h1 className="title">Dashboard</h1>

//         {/* Posts Tab */}
//         {activeTab === 'posts' && (
//   <div className="section" id="posts">
//     <h2 className="section-title">Posts</h2>


//             {/* Form to Add or Edit a Post */}
           
//     {/* Form to Add or Edit a Post */}
//     <form onSubmit={handlePostSubmit} className="add-form">
//       {error && <p className="error-message">{error}</p>}
//       <input
//         type="text"
//         placeholder="Post Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//         className="input-field"
//       />
//       <textarea
//         placeholder="Post Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         required
//         className="textarea-field"
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="file-input"
//       />
//       {previewImage && (
//         <div className="preview-image-container">
//           <img src={previewImage} alt="Preview" className="preview-image" />
//         </div>
//       )}
//       <button type="submit" className="btn-add">
//         {editPost ? 'Save Post' : 'Add Post'}
//       </button>
//     </form>


//     <div className="post-list">
//       <h3 className="post-list-title">Post List</h3>
//       <div className="post-items">
//         {posts.map((post) => (
//           <div key={post.id} className="post-item">
//             <h4>{post.title}</h4>
//             <img src={`http://localhost:5000/uploads/${post.image}`} alt="Image" />

//             {/* Display Image in Post */}
//             {post.image && (
//               <img src={post.imageURL} alt={post.title} style={{ width: '100px', height: '100px' }} />

//             )}
//             <p>{post.content}</p>

//             <div className="post-actions">
//               <button onClick={() => handleEditPost(post)} className="btn-edit">
//                 Edit
//               </button>
//               <button onClick={() => deletePost(post.id)} className="btn-delete">
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// )}

//         {/* Contacts Tab */}
//         {activeTab === 'contacts' && (
//           <div className="section" id="contacts">
//             <h2 className="section-title">Contact Messages</h2>
//             <div className="item-list">
//               {contacts.map((contact) => (
//                 <div key={contact.id} className="item">
//                   <span>{contact.emri} ({contact.email})</span>
//                   <p>{contact.mesazhi}</p>
//                   <div>
//                     <button onClick={() => deleteContact(contact.id)} className="btn-delete">
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Sponsors Tab */}
//         {activeTab === 'sponsors' && (
//           <div className="section" id="sponsors">
//             <h2 className="section-title">Sponsors</h2>
//             <Sponsors /> {/* Render Sponsors Component */}

//           </div>
//         )}
//         {/* Participants Tab */}
//         {activeTab === 'participants' && (
//           <div className="section" id="participants">
//             <h2 className="section-title">Participants</h2>
//             <Participants /> {/* Render Participants Component */}
//           </div>
//         )}
//      {activeTab === 'items' && (
//   <div className="section" id="items">
//     <h2 className="section-title">Conferences</h2>
//     <Items /> {/* Render Items Component */}
//   </div>
// )}

        
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sponsors from './sponsor';
import Participants from './Participant';
import Items from "./CrudTest";
import ContactUs from './ContactForm';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [editPost, setEditPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState('');

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/posts');
      const data = await response.json();
      console.log('Fetched posts:', data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/contact');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const deleteContact = (id) => {
    fetch(`http://localhost:5000/contact/${id}`, { method: 'DELETE' })
      .then(() => {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
      })
      .catch((error) => console.error('Error deleting contact:', error));
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Postimi me ID ${id} u fshi me sukses`);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } else {
        const result = await response.json();
        console.error('Gabim gjatë fshirjes së postimit:', result);
      }
    } catch (error) {
      console.error('Gabim gjatë lidhjes me serverin për fshirjen e postimit:', error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || (!editPost && !imageFile)) {
      setError('Ju lutem plotësoni të gjitha fushat dhe ngarkoni një imazh.');
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const requestOptions = {
      method: editPost ? 'PUT' : 'POST',
      body: formData,
    };

    const url = editPost
      ? `http://localhost:5000/posts/${editPost.id}`
      : 'http://localhost:5000/posts';

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const result = await response.json();
        console.error('Error submitting post:', result);
        setError('Dështoi shtimi i postimit. Ju lutem kontrolloni të dhënat.');
        return;
      }

      const result = await response.json();

      if (editPost) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === result.id ? result : post))
        );
      } else {
        setPosts((prevPosts) => [...prevPosts, result]);
      }

      setEditPost(null);
      setTitle('');
      setContent('');
      setImageFile(null);
      setPreviewImage('');
    } catch (error) {
      console.error('Error submitting post:', error);
      setError('Gabim gjatë lidhjes me serverin.');
    }
  };

  const handleEditPost = (post) => {
    setEditPost(post);
    setTitle(post.title);
    setContent(post.content);
    setPreviewImage(post.image ? `http://localhost:5000/uploads/${post.image}` : '');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewImage(file ? URL.createObjectURL(file) : '');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <a
          href="#posts"
          onClick={() => setActiveTab('posts')}
          className={activeTab === 'posts' ? 'active' : ''}
        >
          Posts
        </a>
        <a
          href="#contacts"
          onClick={() => setActiveTab('contacts')}
          className={activeTab === 'contacts' ? 'active' : ''}
        >
          Contact Messages
        </a>
        <a
          href="#sponsors"
          onClick={() => setActiveTab('sponsors')}
          className={activeTab === 'sponsors' ? 'active' : ''}
        >
          Sponsors
        </a>
        <a
          href="#participants"
          onClick={() => setActiveTab('participants')}
          className={activeTab === 'participants' ? 'active' : ''}
        >
          Participants
        </a>
        <a
          href="#items"
          onClick={() => setActiveTab('items')}
          className={activeTab === 'items' ? 'active' : ''}
        >
          Conferences
        </a>
      </div>

      <div className="main-content">
        <h1 className="title">Dashboard</h1>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="section" id="posts">
            <h2 className="section-title">Posts</h2>
            <form onSubmit={handlePostSubmit} className="add-form">
              {error && <p className="error-message">{error}</p>}
              <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input-field"
              />
              <textarea
                placeholder="Post Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="textarea-field"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              {previewImage && (
                <div className="preview-image-container">
                  <img src={previewImage} alt="Preview" className="preview-image" />
                </div>
              )}
              <button type="submit" className="btn-add">
                {editPost ? 'Save Post' : 'Add Post'}
              </button>
            </form>

            <div className="post-list">
              <h3 className="post-list-title">Post List</h3>
              <div className="post-items">
                {posts.map((post) => (
                  <div key={post.id} className="post-item">
                    <h4>{post.title}</h4>
                    <img src={`http://localhost:5000/uploads/${post.image}`} alt="Image" />
                    <p>{post.content}</p>
                    <div className="post-actions">
                      <button onClick={() => handleEditPost(post)} className="btn-edit">
                        Edit
                      </button>
                      <button onClick={() => deletePost(post.id)} className="btn-delete">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="section" id="contacts">
            <h2 className="section-title">Contact Messages</h2>
            <div className="item-list">
              {contacts.map((contact) => (
                <div key={contact.id} className="item">
                  <span>{contact.emri} ({contact.email})</span>
                  <p>{contact.mesazhi}</p>
                  <div>
                    <button onClick={() => deleteContact(contact.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sponsors Tab */}
        {activeTab === 'sponsors' && (
          <div className="section" id="sponsors">
            <h2 className="section-title">Sponsors</h2>
            <Sponsors />
          </div>
        )}

        {/* Participants Tab */}
        {activeTab === 'participants' && (
          <div className="section" id="participants">
            <h2 className="section-title">Participants</h2>
            <Participants />
          </div>
        )}

        {/* Conferences Tab */}
        {activeTab === 'items' && (
          <div className="section" id="items">
            <h2 className="section-title">Conferences</h2>
            <Items />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
