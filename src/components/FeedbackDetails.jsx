import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FeedbackDetails = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetch(`/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedback(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!feedback) return <p>Duke ngarkuar...</p>;

  return (
    <div>
      <h1>{feedback.title}</h1>
      <p>{feedback.content}</p>
      <p><strong>Autori:</strong> {feedback.author}</p>
      <p><strong>Data:</strong> {feedback.date}</p>
    </div>
  );
};

export default FeedbackDetails;
