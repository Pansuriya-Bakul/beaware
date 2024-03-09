import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import InputComponent from "../Input";
import { auth } from '../../firebase/config';

const StepOne = ({ setSuccess, setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp1 = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User created successfully!', user.uid);
        setUserId(user.uid);
        setSuccess(true);
      }).catch((e) => {
        if (e.code === 'auth/email-already-in-use') {
          setError('Email already in use, Login instead.');
        } else {
          setError('Failed to create user. Please try again.');
        }
        setLoading(false);
      });
  };


  return (
    <>
      <InputComponent
        type={"email"}
        input_id={"email"}
        placeholder={"Enter Your Email"}
        label={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required={true} />

      <InputComponent
        type={"password"}
        input_id={"password"}
        placeholder={"Enter Password"}
        label={"Password"}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        required={true} />

      <InputComponent
        type={"password"}
        input_id={"confirm-password"}
        placeholder={"Confirm Password"}
        label={"Confirm Password"}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={loading}
        required={true} />

      {error && <div className="error">{error}</div>}
      <button
        className={'btn px-5 py-2 bg-color-sec'}
        type="submit"
        onClick={handleSignUp1}
        disabled={loading}
      >
        <span className='fs-7 text-uppercase fw-bold color-pri'>Next</span>
      </button>
    </>);
}

export default StepOne;