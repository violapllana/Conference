import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SponsorDetails = () => {
  const { id } = useParams();
  const [sponsor, setSponsor] = useState(null);

  useEffect(() => {
    fetch(`/sponsors/${id}`)
      .then((res) => res.json())
      .then((data) => setSponsor(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!sponsor) return <p>Duke ngarkuar...</p>;

  return (
    <div>
      <h1>{sponsor.name}</h1>
      <img src={sponsor.logo} alt={sponsor.name} style={{ width: '300px' }} />
      <p>{sponsor.description}</p>
    </div>
  );
};

export default SponsorDetails;
