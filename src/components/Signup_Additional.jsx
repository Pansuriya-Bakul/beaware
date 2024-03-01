import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';

const SignupAdditional = () => {
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [streamColor, setStreamColor] = useState('');
  const [error, setError] = useState('');
  const location = useLocation(); // Retrieve location state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = location.state;

    // Validation for required fields
    if (!name || !logoUrl || !streamColor) {
      setError('Please fill in all fields');
      return;
    }

    try {

      const docRef = await addDoc(collection(db, 'users'), {
        email: email,
        password: password,
        name: name,
        logoUrl: logoUrl,
        streamColor: streamColor
      });
      console.log('Document written with ID: ', docRef.id);


      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Failed to store data. Please try again.');
    }
  };

  return (
    <div className="signup-additional-container">
      <h2>Additional Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="logoUrl">Logo URL:</label>
        <input
          type="text"
          id="logoUrl"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          required
        />

        <label htmlFor="streamColor">Stream Color (Hex Code):</label>
        <input
          type="text"
          id="streamColor"
          value={streamColor}
          onChange={(e) => setStreamColor(e.target.value)}
          required
        />

        {error && <div className="error">{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignupAdditional;
