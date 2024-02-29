import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNextPage = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    navigate('/Signup_Additional', { state: { email, password } });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password:
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="button" onClick={handleNextPage}>Next</button>
      </form>
    </div>
  );
};

export default Signup;
