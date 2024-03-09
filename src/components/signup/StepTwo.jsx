import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';
import InputComponent from '../Input';

const StepOne = ({ userId }) => {
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [streamColor, setStreamColor] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp2 = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!name || !logoUrl || !streamColor) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'streams'), {
        userId: userId,
        name: name,
        logoUrl: logoUrl,
        streamColor: streamColor
      });

      console.log('Document written with ID: ', docRef.id);


      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding document: ', error.message);
      setError('Failed to store data. Please try again.');
    }
  };
  return (
    <>
      <InputComponent
        type={"text"}
        input_id={"stream-name"}
        placeholder={"Stream Name"}
        label={"Stream Name"}
        onChange={(e) => setName(e.target.value)}
        required={true} />

      <InputComponent
        type={"text"}
        input_id={"logo-url"}
        placeholder={"Paste Logo URL"}
        label={"Logo URL"}
        onChange={(e) => setLogoUrl(e.target.value)}
        required={true} />

      <InputComponent
        type={"text"}
        input_id={"stream-color"}
        placeholder={"Enter Color Hex"}
        label={"Stream Color"}
        onChange={(e) => setStreamColor(e.target.value)}
        required={true} />

      {error && <div className="error">{error}</div>}
      <button className={'btn px-5 py-2 bg-color-sec'} type="submit" onClick={handleSignUp2}><span className='fs-7 text-uppercase fw-bold color-pri'>Sign Up</span></button>
    </>);
}

export default StepOne;