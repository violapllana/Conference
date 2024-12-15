import React, { useState, useEffect } from 'react';  // Add useEffect here
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

// AddFeedback Component
const AddFeedback = () => {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const addFeedback = async () => {
    if (!username || !content) {
      alert('Emri dhe përmbajtja janë të detyrueshme!');
      return;
    }
    try {
      console.log('Dërgimi i feedback-ut:', { username, content });
      const response = await axios.post('http://localhost:5000/feedback', { username, content }, { withCredentials: true });
      if (response.status === 201) {
        alert('Feedback-u u krijua me sukses!');
        navigate('/feedback');
      }
    } catch (error) {
      console.error('Gabim gjatë shtimit të feedback-ut:', error.message);
      alert('Shtimi i feedback-ut dështoi. Ju lutemi provoni përsëri.');
    }
  };
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shto Feedback-un</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emri"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <textarea
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Përmbajtja"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={addFeedback}>Shto Feedback-un</button>
    </div>
  );
};

// EditFeedback Component
const EditFeedback = () => {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/feedback/${id}`, { withCredentials: true });
        setUsername(response.data.username); // përdorim 'username' dhe jo 'title'
        setContent(response.data.content);
      } catch (error) {
        console.error('Gabim gjatë marrjes së feedback-ut:', error.message);
      }
    };

    fetchFeedback();
  }, [id]);

  const updateFeedback = async () => {
    if (!username || !content) {
      alert('Emri dhe përmbajtja janë të detyrueshme!');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/feedback/${id}`, { username, content }, { withCredentials: true });
      navigate('/feedback');
    } catch (error) {
      console.error('Gabim gjatë përditësimit të feedback-ut:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Redakto Feedback-un</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emri"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <textarea
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Përmbajtja"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={updateFeedback}>Përditëso Feedback-un</button>
    </div>
  );
};
// FeedbackList Component
const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feedback', { withCredentials: true });
        console.log('Marrja e feedback-ve:', response.data); // Verifikoni këtu që të dhënat janë të sakta
        setFeedbacks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFeedbacks();
  }, []);


  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/feedback/${id}`, { withCredentials: true });
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
    } catch (err) {
      console.error('Gabim gjatë fshirjes së feedback-ut:', err.message);
    }
  };

  if (loading) return <p>Po ngarkohen feedback-et...</p>;
  if (error) return <p>Gabim: {error}</p>;

  return (
    <div>
      <h1>Lista e Feedback-eve</h1>
      {feedbacks.length === 0 ? (
        <p>Nuk ka feedback-e të shtuar.</p>
      ) : (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id} className="mb-4">
              <h2 className="text-xl font-semibold">{feedback.title}</h2>
              <p>{feedback.content}</p>
              <div className="mt-2">
                <Link to={`/edit-feedback/${feedback.id}`} className="bg-yellow-500 text-white px-4 py-2">Edit</Link>
                <button
                  onClick={() => deleteFeedback(feedback.id)}
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

export { AddFeedback, EditFeedback, FeedbackList };
