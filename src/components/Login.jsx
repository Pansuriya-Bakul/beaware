import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import InputComponent from './Input';
import logo from '../style/logo.png'
import login_vec from '../style/login-vec.png'
import { Row, Col } from 'react-bootstrap';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.uid) {
        navigate('/dashboard');
      }

    } catch (error) {
      console.error('Error signing in:', error.message);
      setError('Invalid email or password.');
    }
  };

  const handleEmail = (value) => {
    // check email format
    const regex = /^\S+@\S+\.\S+/;
    if (!regex.test(value)) {
      setError('Invalid email format.');
      return;
    }
    setEmail(value);
  }
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
      <Col className="form-container">
        <div className="form-wrapper">
          <h2>SIGN IN</h2>
          <form onSubmit={handleSubmit}>
            <InputComponent
              type={"email"}
              input_id={"email"}
              placeholder={"Enter Your Email"}
              label={"Email"}
              onChange={(e) => handleEmail(e.target.value)}
              required={false} />

            <InputComponent
              type={"password"}
              input_id={"password"}
              placeholder={"Enter Your Password"}
              label={"Password"}
              onChange={(e) => setPassword(e.target.value)}
              required={true} />
            <div>
              <a href="/forgotpassword">
                <h6 style={{ textAlign: 'right' }}>Forgot Password ?</h6>
              </a>
            </div>

            {error && <div className="error">{error}</div>}
            <button className={'btn px-5 py-2 bg-color-sec'} type="submit"><span
              className='fs-7 text-uppercase fw-bold color-pri'>Login</span></button>
          </form>
        </div>
      </Col>
    </Row>
  );

};

export default Login;
