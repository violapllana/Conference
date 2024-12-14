import React, { useState, useEffect } from 'react';  // Add useEffect here
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const addPost = async () => {
    if (!title || !content) {
      alert('Titulli dhe përmbajtja janë të detyrueshme!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/posts', { title, content }, { withCredentials: true });
      if (response.status === 201) {
        alert('Postimi u krijua me sukses!');
        navigate('/posts');
      }
    } catch (error) {
      console.error('Gabim gjatë shtimit të postimit:', error.message);
      alert('Shtimi i postimit dështoi. Ju lutemi provoni përsëri.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shto Postimin</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Titulli"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Përmbajtja"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={addPost}>Shto Postimin</button>
    </div>
  );
};

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`, { withCredentials: true });
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Gabim gjatë marrjes së postimit:', error.message);
      }
    };

    fetchPost();
  }, [id]);

  const updatePost = async () => {
    if (!title || !content) {
      alert('Titulli dhe përmbajtja janë të detyrueshme!');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/posts/${id}`, { title, content }, { withCredentials: true });
      navigate('/posts');
    } catch (error) {
      console.error('Gabim gjatë përditësimit të postimit:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Redakto Postimin</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Titulli"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Përmbajtja"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={updatePost}>Përditëso Postimin</button>
    </div>
  );
};

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts', { withCredentials: true });
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`, { withCredentials: true });
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error('Gabim gjatë fshirjes së postimit:', err.message);
    }
  };

  if (loading) return <p>Po ngarkohen postimet...</p>;
  if (error) return <p>Gabim: {error}</p>;

  return (
    <div>
      <h1>Lista e Postimeve</h1>
      {posts.length === 0 ? (
        <p>Nuk ka postime të shtuar.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.content}</p>
              <div className="mt-2">
                <Link to={`/edit-post/${post.id}`} className="bg-yellow-500 text-white px-4 py-2">Edit</Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className="bg-red-500 text-white px-4 py-2 ml-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { AddPost, EditPost, PostList };
