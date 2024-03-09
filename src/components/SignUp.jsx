import React from 'react';
import { Row, Col } from 'react-bootstrap';
import logo from '../style/logo.png';
import login_vec from '../style/login-vec.png';
import StepOne from './signup/StepOne';
import StepTwo from './signup/StepTwo';


const SignUp = () => {

  const [success, setSuccess] = React.useState(false);
  const [userId, setUserId] = React.useState('');

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
          <h2>SIGN UP</h2>
          {(success === false || userId === '') ? <StepOne setSuccess={setSuccess} setUserId={setUserId} /> : <StepTwo userId={userId} />}
        </div>
      </Col>
    </Row >
  );
};

export default SignUp;
