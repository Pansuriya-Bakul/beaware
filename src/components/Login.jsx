import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';
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
    const auth = getAuth();
    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully!', userCredential.user.uid);
      if (userCredential.user.uid) {
        navigate('/dashboard');
      }

      // const usersRef = collection(db, 'users');
      // const q = query(usersRef, where('email', '==', email));
      // const querySnapshot = await getDocs(q);

      // if (querySnapshot.empty) {
      //   setError('User not found. Please register.');
      // } else {
      //   // Redirect to dashboard after successful login
      //   navigate('/dashboard');
      // }
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError('Invalid email or password.');
    }
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
          <form onSubmit={handleSubmit}>
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
              placeholder={"Enter Your Password"}
              label={"Password"}
              onChange={(e) => setPassword(e.target.value)}
              required={true} />

            {error && <div className="error">{error}</div>}
            <button className={'btn px-5 py-2 bg-color-sec'} type="submit"><span className='fs-7 text-uppercase fw-bold color-pri'>Login</span></button>
          </form>
        </div>

      </Col>
    </Row>
  );

};

export default Login;
