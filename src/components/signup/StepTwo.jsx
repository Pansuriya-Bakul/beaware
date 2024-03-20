import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { Row, Col } from 'react-bootstrap';

import { db } from '../../firebase/config';
import InputComponent from '../Input';
import ColorPickerComponent from '../ColorPicker';

const StepOne = ({ userId }) => {
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [streamColor, setStreamColor] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp2 = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!name || !logoUrl || !streamColor) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'streams'), {
        userId: userId,
        name: name,
        logoUrl: logoUrl,
        streamColor: streamColor
      });

      navigate('/dashboard');

    } catch (error) {
      console.error('Error adding document: ', error.message);
      setError('Failed to store data. Please try again.');
    }

    setLoading(false);
  };

  const handleLogoUrl = (value) => {

    // Validation for URL
    const regex = /^(http|https):\/\/[^ "]+$/;
    if (!regex.test(value)) {
      setError('Invalid URL format');
      document.getElementById('logo-url').classList.add('error-border');
      return;
    }
    document.getElementById('logo-url').classList.remove('error-border');
    setError('');
    setLogoUrl(value);
  }

  const handleName = (value) => {
    // Validation for name
    if (! /^[a-zA-Z-]+$/.test(value)) {
      setError('Only alphabets and hyphens are allowed');
      document.getElementById('stream-name').classList.add('error-border');
      return;
    }

    setError('');
    document.getElementById('stream-name').classList.remove('error-border');
    setName(value);
  }

  const handleColorHex = (value) => {
    document.getElementById('stream-color-text').value = value;
    setStreamColor(value.split('#')[1]);
  }

  return (
    <>
      <Row>
        <InputComponent
          type={"text"}
          input_id={"stream-name"}
          placeholder={"Stream Name"}
          label={"Stream Name"}
          centered={true}
          onChange={(e) => handleName(e.target.value)}
          disabled={loading}
          required={true} />
      </Row>
      <Row>

        <InputComponent
          type={"text"}
          input_id={"logo-url"}
          placeholder={"Paste Logo URL"}
          label={"Logo URL"}
          centered={true}
          onChange={(e) => handleLogoUrl(e.target.value)}
          disabled={loading}
          required={true} />
      </Row>

      <ColorPickerComponent
        type={"color"}
        input_id={"stream-color"}
        placeholder={"Enter Color Hex"}
        label={"Stream Color"}
        centered={true}
        onChange={(e) => handleColorHex(e.target.value)}
        disabled={loading}
        required={true} />

      <Row>
        <Col className='col-2'></Col>
        <Col className='col-8'>
          {error && <div className="error">{error}</div>}
        </Col>
        <Col className='col-2'></Col>
      </Row>

      <Row>
        <Col className='col-2'></Col>
        <Col className='col-8 d-flex flex-row-reverse'>
          <button
            className={'btn px-5 py-2 my-3 bg-color-sec'}
            type="submit"
            onClick={handleSignUp2}
            disabled={error ? true : false || loading}
          >
            <span className='fs-7 text-uppercase fw-bold color-pri'>
              Sign Up
            </span>
          </button>
        </Col>
        <Col className='col-2'></Col>
      </Row>
    </>);
}

export default StepOne;