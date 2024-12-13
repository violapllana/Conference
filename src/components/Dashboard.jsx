// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [posts, setPosts] = useState([]);
//   const [sponsors, setSponsors] = useState([]); 
//   const [editPost, setEditPost] = useState(null);
//   const [editSponsor, setEditSponsor] = useState(null);
//   const [activeSection, setActiveSection] = useState('posts'); // Pjesa aktive (posts ose sponsors)
  
//   // Për postimet
//   const [title, setTitle] = useState(''); // Variabli për titullin e postimit
//   const [content, setContent] = useState(''); // Variabli për përmbajtjen e postimit

//   // Merr postimet nga serveri
//   useEffect(() => {
//     fetch('http://localhost:5000/posts')
//       .then((response) => response.json())
//       .then((data) => setPosts(data))
//       .catch((error) => console.error('Error fetching posts:', error));
//   }, []);

//   // Merr sponsorët nga serveri
//   useEffect(() => {
//     fetch('http://localhost:5000/sponsors')
//       .then((response) => response.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setSponsors(data);
//         } else {
//           console.error('Të dhënat për sponsorët janë në format të pasaktë');
//         }
//       })
//       .catch((error) => console.error('Error fetching sponsors:', error));
//   }, []);

//   // Funksioni për të dërguar postimin te backend-i
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
//         setPosts([...posts, data]); // Shto postimin e ri në listën e postimeve
//         setTitle('');
//         setContent('');
//       })
//       .catch((error) => console.error('Error adding post:', error));
//   };

//   // Funksioni për të shtuar një sponsor
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

//   // Funksioni për të edituar një postim
//   const handleEditPost = (post) => {
//     setEditPost(post);
//     setTitle(post.title); // Vendosni titullin dhe përmbajtjen për editimin
//     setContent(post.content);
//   };

//   // Funksioni për të edituar një sponsor
//   const handleEditSponsor = (sponsor) => {
//     setEditSponsor(sponsor);
//   };

//   // Funksioni për të ruajtur postimin e edituar
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

//   // Funksioni për të ruajtur sponsorin e edituar
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

//   // Funksioni për të fshirë një postim
//   const deletePost = (id) => {
//     const updatedPosts = posts.filter((post) => post.id !== id);
//     setPosts(updatedPosts);
//   };

//   // Funksioni për të fshirë një sponsor
//   const deleteSponsor = (id) => {
//     const updatedSponsors = sponsors.filter((sponsor) => sponsor.id !== id);
//     setSponsors(updatedSponsors);
//   };

//   // Funksioni për të ndërruar seksionet (posts ose sponsors)
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

//         {/* Seksioni i Postimeve */}
//         {activeSection === 'posts' && (
//           <div className="section">
//             <h2 className="section-title">Postimet</h2>

//             {/* Formulari për të shtuar një postim */}
//             <form onSubmit={addPost} className="add-form">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Titulli i postimit"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)} // Lidhni me useState
//                 required
//                 className="input-field"
//               />
//               <textarea
//                 name="content"
//                 placeholder="Përmbajtja e postimit"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)} // Lidhni me useState
//                 required
//                 className="textarea-field"
//               />
//               <button type="submit" className="btn-add">
//                 Shto Postim
//               </button>
//             </form>

//             {/* Editimi i postimeve */}
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

//         {/* Seksioni i Sponsorëve */}
//         {activeSection === 'sponsors' && (
//           <div className="section">
//             <h2 className="section-title">Sponsorët</h2>

//             {/* Formulari për të shtuar një sponsor */}
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

//             {/* Editimi i sponsorëve */}
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
  const [sponsors, setSponsors] = useState([]); 
  const [editPost, setEditPost] = useState(null);
  const [editSponsor, setEditSponsor] = useState(null);
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

  // Fetch sponsors from server
  useEffect(() => {
    fetch('http://localhost:5000/sponsors')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSponsors(data);
        } else {
          console.error('Sponsor data is in incorrect format');
        }
      })
      .catch((error) => console.error('Error fetching sponsors:', error));
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

  // Function to add a new sponsor
  const addSponsor = (e) => {
    e.preventDefault();
    const newSponsor = {
      id: sponsors.length + 1,
      name: e.target.name.value,
      details: e.target.details.value,
    };
    setSponsors([...sponsors, newSponsor]);
    e.target.reset();
  };

  // Function to edit a post
  const handleEditPost = (post) => {
    setEditPost(post);
    setTitle(post.title); // Set title and content for editing
    setContent(post.content);
  };

  // Function to edit a sponsor
  const handleEditSponsor = (sponsor) => {
    setEditSponsor(sponsor);
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

  // Function to save the edited sponsor
  const saveEditedSponsor = (e) => {
    e.preventDefault();
    const updatedSponsors = sponsors.map((sponsor) =>
      sponsor.id === editSponsor.id
        ? { ...sponsor, name: e.target.name.value, details: e.target.details.value }
        : sponsor
    );
    setSponsors(updatedSponsors);
    setEditSponsor(null);
  };

  // Function to delete a post
  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  // Function to delete a sponsor
  const deleteSponsor = (id) => {
    const updatedSponsors = sponsors.filter((sponsor) => sponsor.id !== id);
    setSponsors(updatedSponsors);
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
        <a href="#sponsors" onClick={() => handleSectionChange('sponsors')}>
          Sponsorët
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

        {/* Sponsors Section */}
        {activeSection === 'sponsors' && (
          <div className="section">
            <h2 className="section-title">Sponsorët</h2>

            {/* Form to add a sponsor */}
            <form onSubmit={addSponsor} className="add-form">
              <input
                type="text"
                name="name"
                placeholder="Emri i sponsorit"
                required
                className="input-field"
              />
              <textarea
                name="details"
                placeholder="Detajet e sponsorit"
                required
                className="textarea-field"
              />
              <button type="submit" className="btn-add">
                Shto Sponsor
              </button>
            </form>

            {/* Edit sponsor form */}
            {editSponsor && (
              <form onSubmit={saveEditedSponsor} className="add-form">
                <input
                  type="text"
                  name="name"
                  defaultValue={editSponsor.name}
                  required
                  className="input-field"
                />
                <textarea
                  name="details"
                  defaultValue={editSponsor.details}
                  required
                  className="textarea-field"
                />
                <button type="submit" className="btn-add">
                  Ruaj Sponsorin
                </button>
              </form>
            )}

            <div className="item-list">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="item">
                  <span>{sponsor.name}</span>
                  <div>
                    <button onClick={() => handleEditSponsor(sponsor)} className="btn-edit">
                      Edito
                    </button>
                    <button onClick={() => deleteSponsor(sponsor.id)} className="btn-delete">
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
