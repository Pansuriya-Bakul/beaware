import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import InputComponent from './Input';
import logo from '../style/logo.png';
import login_vec from '../style/login-vec.png';


const SignUp = () => {
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
    <Row className='landing'>
      <Col className='logo-container'>
        <div className="logo-wrapper">
          <img src={logo} alt="logo" />
        </div>
        <div className="vector-wrapper">
          <img src={login_vec} alt="login-vector" />
        </div>
      </Col>
      <Col className="form-container">
        <div className="form-wrapper">
          <h2>SIGN IN</h2>
          <form onSubmit={handleNextPage}>
            <InputComponent
              type={"email"}
              input_id={"email"}
              placeholder={"Enter Your Email"}
              label={"Email"}
              onChange={(e) => setEmail(e.target.value)}
              required={false} />

            <InputComponent
              type={"password"}
              input_id={"password"}
              placeholder={"Enter Password"}
              label={"Password"}
              onChange={(e) => setPassword(e.target.value)}
              required={true} />

            <InputComponent
              type={"password"}
              input_id={"confirm-password"}
              placeholder={"Confirm Password"}
              label={"Confirm Password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={true} />

            {error && <div className="error">{error}</div>}
            <button className={'btn px-5 py-2 bg-color-sec'} type="submit"><span className='fs-7 text-uppercase fw-bold color-pri'>Next</span></button>
          </form>
        </div>

      </Col>
    </Row>
  );
};

export default SignUp;
