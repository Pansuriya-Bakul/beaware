import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing navigate from React Router
import { auth } from '../firebase/config';
import {firebase} from "../firebase/config";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Using navigate from React Router

  const handleForgotPassword = async () => {
    try {

      const userCredential = await firebase.auth().fetchSignInMethodsForEmail(email);


      if (userCredential && userCredential.length > 0) {
        navigate('/resetpassword');
      } else {
        alert('Email not found. Please enter a valid email address.');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      alert('An error occurred while checking the email. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Submit</button>
    </div>
  );
};

export default ForgotPassword;
