import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import InputComponent from './Input';
import logo from "../style/logo.png";
import login_vec from "../style/login-vec.png";

const Passwordreset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
    // Redirect the user to the login page after password reset
    navigate('/login');
  };

  return (
    <Row className='landing'>
      <Col className='logo-container'>
        <div className="logo-wrapper">
          <img src={logo} alt="logo" />
        </div>
        <div className="vector-wrapper">
          <img src={login_vec} alt="login-vector" />
        </div>
        <div className="signup">
          <label>New to beaware? <a href="/signup">Sign Up</a></label>
        </div>
      </Col>
  <Col className='form-container'>
        <div className="form-wrapper">
          <h2>Password Recovery</h2>
          <form onSubmit={handleSubmit}>
            <InputComponent
              type="password"
              input_id="newPassword"
              placeholder="Enter New Password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required={true}
            />
            <InputComponent
              type="password"
              input_id="confirmPassword"
              placeholder="Confirm Password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={true}
            />
            <button className={'btn px-5 py-2 bg-color-sec'} type="submit">
              <span className='fs-7 text-uppercase fw-bold color-pri'>Reset Password</span>
            </button>
          </form>
        </div>
      </Col>
    </Row>
  );
};

export default Passwordreset;
