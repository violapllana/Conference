// src/components/updateConference/UpdateConference.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateConference = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/conferences/${id}`, {
        title,
        description,
      });
      alert('Konferenca u përditësua me sukses!');
    } catch (error) {
      console.error('Gabim gjatë përditësimit të konferencës:', error);
    }
  };

  return (
    <div>
      <h2>Përditëso Konferencë</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID e Konferencës:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Titulli:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Përshkrimi:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Përditëso</button>
      </form>
    </div>
  );
};

export default UpdateConference;
