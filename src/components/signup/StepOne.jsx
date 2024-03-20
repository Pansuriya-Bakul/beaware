import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Row, Col } from 'react-bootstrap';

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

  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
    if (password !== value) {
      setError('Passwords do not match');
      document.getElementById('confirm-password').classList.add('error-border');
    } else {
      setError('');
      document.getElementById('confirm-password').classList.remove('error-border');
    }
  }

  const handleEmail = (target) => {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(target.value)) {
      setError('Invalid email format.');
      document.getElementById('email').classList.add('error-border');
      return;
    }
    document.getElementById('email').classList.remove('error-border');
    setError('');
    setEmail(target.value);
  }

  return (
    <div>
      <Row>
        <InputComponent
          type={"email"}
          input_id={"email"}
          placeholder={"Enter Your Email"}
          label={"Email"}
          centered={true}
          onChange={(e) => handleEmail(e.target)}
          disabled={loading}
          required={true} />
      </Row>

      <Row>
        <InputComponent
          type={"password"}
          input_id={"password"}
          placeholder={"Enter Password"}
          label={"Password"}
          centered={true}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required={true} />
      </Row>

      <Row>
        <InputComponent
          type={"password"}
          input_id={"confirm-password"}
          placeholder={"Confirm Password"}
          label={"Confirm Password"}
          centered={true}
          onChange={(e) => handleConfirmPassword(e.target.value)}
          disabled={loading}
          required={true} />
      </Row>

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
            onClick={handleSignUp1}
            disabled={error ? true : false || loading}
          >
            <span className='fs-7 text-uppercase fw-bold color-pri'>
              Next
            </span>
          </button>
        </Col>
        <Col className='col-2'></Col>
      </Row>
    </div>);
}

export default StepOne;