import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [editPost, setEditPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch posts
  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  // Fetch contacts
  useEffect(() => {
    fetch('http://localhost:5000/contact')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  const deletePost = (id) => {
    fetch(`http://localhost:5000/posts/${id}`, { method: 'DELETE' })
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      })
      .catch((error) => console.error('Error deleting post:', error));
  };

  const deleteContact = (id) => {
    fetch(`http://localhost:5000/contact/${id}`, { method: 'DELETE' })
      .then(() => {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
      })
      .catch((error) => console.error('Error deleting contact:', error));
  };

  // Handle Add or Edit Post
  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content };
    console.log('Submit post', newPost);

    if (editPost) {
      // Update the post
      fetch(`http://localhost:5000/posts/${editPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      })
        .then((response) => response.json())
        .then((updatedPost) => {
          // Update the post in the list after editing
          const updatedPosts = posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          );
          setPosts(updatedPosts);
          setEditPost(null); // Clear the edit state
          setTitle('');
          setContent('');
        })
        .catch((error) => console.error('Error updating post:', error));
    } else {
      // Add a new post
      fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      })
        .then((response) => response.json())
        .then((newPostData) => {
          setPosts((prevPosts) => [...prevPosts, newPostData]);
          setTitle('');
          setContent('');
        })
        .catch((error) => console.error('Error adding post:', error));
    }
  };

  const handleEditPost = (post) => {
    setEditPost(post); // Set the post to be edited
    setTitle(post.title);
    setContent(post.content);
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
      </div>

      <div className="main-content">
        <h1 className="title">Dashboard</h1>

        {/* Posts Section */}
        {activeTab === 'posts' && (
          <div className="section" id="posts">
            <h2 className="section-title">Posts</h2>

            {/* Form to Add or Edit a Post */}
            <form onSubmit={handlePostSubmit} className="add-form">
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
              <button type="submit" className="btn-add">
                {editPost ? 'Save Post' : 'Add Post'}
              </button>
            </form>

            {/* Displaying posts */}
            <div className="item-list">
              {posts.map((post) => (
                <div key={post.id} className="item">
                  <span>{post.title}</span>
                  <div>
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
        )}

        {/* Contact Messages Section */}
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
      </div>
    </div>
  );
};

export default Dashboard;
