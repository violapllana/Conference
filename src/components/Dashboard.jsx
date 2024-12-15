import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]); // Posts
  const [messages, setMessages] = useState([]); // Messages
  const [editPost, setEditPost] = useState(null); // Post to edit
  const [title, setTitle] = useState(''); // Post title
  const [content, setContent] = useState(''); // Post content
  const [showMessages, setShowMessages] = useState(false); // Flag to toggle message section visibility
  const [showPosts, setShowPosts] = useState(true); // Flag to toggle posts section visibility

  // Fetch posts and messages
  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));

    fetch('http://localhost:5000/contact')
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error('Error fetching messages:', error));
  }, []);

  // CRUD Functions for Posts
  const addPost = (e) => {
    e.preventDefault();
    const newPost = { title, content };

    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts((prevPosts) => [...prevPosts, data]);
        setTitle('');
        setContent('');
      })
      .catch((error) => console.error('Error adding post:', error));
  };

  const deletePost = (id) => {
    fetch(`http://localhost:5000/posts/${id}`, { method: 'DELETE' })
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      })
      .catch((error) => console.error('Error deleting post:', error));
  };

  const handleEditPost = (post) => {
    setEditPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  const saveEditedPost = (e) => {
    e.preventDefault();
    const updatedPost = { ...editPost, title, content };

    fetch(`http://localhost:5000/posts/${editPost.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedPosts = posts.map((post) =>
          post.id === data.id ? data : post
        );
        setPosts(updatedPosts);
        setEditPost(null);
        setTitle('');
        setContent('');
      })
      .catch((error) => console.error('Error updating post:', error));
  };

  // CRUD Functions for Messages
  const deleteMessage = (id) => {
    fetch(`http://localhost:5000/contact/${id}`, { method: 'DELETE' })
      .then(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== id)
        );
      })
      .catch((error) => console.error('Error deleting message:', error));
  };

  const toggleSection = (section) => {
    if (section === 'posts') {
      setShowPosts(true);
      setShowMessages(false);
    } else if (section === 'messages') {
      setShowPosts(false);
      setShowMessages(true);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <a href="#posts" onClick={() => toggleSection('posts')}>
          Posts
        </a>
        <a href="#messages" onClick={() => toggleSection('messages')}>
          Messages
        </a>
      </div>

      <div className="main-content">
        <h1 className="title">Dashboard</h1>

        {/* Post Section */}
        {showPosts && (
          <div id="posts" className="section">
            <h2 className="section-title">Posts</h2>

            <form onSubmit={editPost ? saveEditedPost : addPost} className="add-form">
              <input
                type="text"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input-field"
              />
              <textarea
                placeholder="Post content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="textarea-field"
              />
              <button type="submit" className="btn-add">
                {editPost ? 'Save Post' : 'Add Post'}
              </button>
            </form>

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

        {/* Messages Section */}
        {showMessages && (
          <div id="messages" className="section">
            <h2 className="section-title">Messages</h2>

            <div className="item-list">
              {messages.map((message) => (
                <div key={message.id} className="item">
                  <p>
                    <strong>{message.name}</strong> ({message.email})
                  </p>
                  <p>{message.message}</p>
                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
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
