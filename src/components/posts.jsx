import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Komponenti për Redaktimin e Postimit
const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`, { withCredentials: true });
        setTitle(response.data.title);
        setContent(response.data.content);
        setImage(response.data.image);
      } catch (error) {
        console.error('Gabim gjatë marrjes së postimit:', error.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const updatePost = async () => {
    if (!title || !content) {
      alert('Titulli dhe përmbajtja janë të detyrueshme!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:5000/posts/${id}`, formData, { withCredentials: true });
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
      <input
        type="file"
        className="mb-4"
        onChange={handleImageChange}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={updatePost}>Përditëso Postimin</button>
    </div>
  );
};

// Komponenti për Shtimin e Postimit
const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Krijo preview për imazhin
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const addPost = async () => {
    if (!title || !content) {
      alert('Titulli dhe përmbajtja janë të detyrueshme!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (response.status === 201) {
        alert('Postimi u krijua me sukses!');
        navigate('/posts');
      }
    } catch (error) {
      console.error('Gabim gjatë shtimit të postimit:', error.message);
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
      <input
        type="file"
        className="mb-4"
        onChange={handleImageChange}
      />
      
      {/* Preview i imazhit */}
      {imagePreview && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Imazhi i zgjedhur:</p>
          <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover" />
        </div>
      )}

      <button className="bg-blue-500 text-white px-4 py-2" onClick={addPost}>Shto Postimin</button>
    </div>
  );
};

// Komponenti për Listën e Postimeve
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`, { withCredentials: true });
      setPosts(posts.filter(post => post._id !== id));  // Përditëson listën pas fshirjes
    } catch (err) {
      console.error('Gabim gjatë fshirjes së postimit:', err.message);
    }
  };

  if (loading) return <p>Po ngarkohen postimet...</p>;
  if (error) return <p>Gabim: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Lista e Postimeve</h1>
      {posts.length === 0 ? (
        <p>Aktualisht nuk ka postime!</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id} className="mb-4 p-4 border rounded-md">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.content}</p>
              {post.image && <img src={`http://localhost:5000/${post.image}`} alt={post.title} className="mt-2 w-32 h-32 object-cover" />}
              <div className="mt-4 flex justify-between">
                <Link to={`/edit-post/${post._id}`} className="bg-yellow-500 text-white px-4 py-2">Redakto</Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-4 py-2 ml-2"
                >
                  Fshi
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { EditPost, AddPost, PostList };
