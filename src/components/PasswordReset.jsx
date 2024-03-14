import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";

import InputComponent from './Input';
import logo from "../style/logo.png";
import { auth } from "../firebase/config";
import login_vec from "../style/login-vec.png";

const PasswordReset = () => {

  const [success, setSuccess] = React.useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {

    await sendPasswordResetEmail(auth, email)
      .then((res) => {
        setSuccess(true);
        console.log(res);
        setInterval(() => {
          navigate('/login');
        }, 3000);
      }).catch((error) => {
        console.error('Error checking email:', error);
        setError('An error occurred while checking the email. Please try again later.');
      });
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
          {(success)
            ? (<p>A link has been sent to you on your Email. Redirecting you to Login page.</p>)
            : (
              <>
                <h2>Forgot Password</h2>
                <InputComponent
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
                {error && <div className="error">{error}</div>}

                <button className={'btn px-5 py-2 bg-color-sec'} onClick={handleForgotPassword}>
                  <span className='fs-7 text-uppercase fw-bold color-pri'>Submit</span>
                </button>
              </>
            )
          }
        </div>
      </Col>
    </Row>
  );
};

export default PasswordReset;
