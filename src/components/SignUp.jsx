import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import logo from '../style/logo.png';
import login_vec from '../style/login-vec.png';
import StepOne from './signup/StepOne';
import StepTwo from './signup/StepTwo';



const SignUp = () => {

  const [success, setSuccess] = React.useState(false);
  const [userId, setUserId] = React.useState('');
  const [isMobile, setIsMobile] = useState(false);

  const componentDidMount = () => {
    setIsMobile(window.innerWidth < 700 ? true : false);
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 700 ? true : false);
    }, false);
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <Row className='landing'>
      <Col className='logo-container col-lg-5 p-5'>
        <Row className='justify-content-center text-center'>
          <div>
            <img src={logo} alt="logo" />
          </div>
        </Row>
        {!isMobile &&
          <Row className='justify-content-center'>
            <div className="vector-wrapper">
              <img src={login_vec} alt="login-vector" />
            </div>
          </Row>
        }
        <Row className='justify-content-center text-center'>
          <label>Already a customer? <a href="/login">Login</a></label>
        </Row>
      </Col>

      <Col className="form-container col-lg-7 align-baseline">
        <Row className='vh-100 d-flex align-items-center'>
          <div>
            <h2 className='text-center form-heading text-uppercase'>Sign Up</h2>
            <div>
              {(success === false || userId === '') ? <StepOne setSuccess={setSuccess} setUserId={setUserId} /> : <StepTwo userId={userId} />}
            </div>
          </div>
        </Row>
      </Col>
    </Row >
  );
};

export default SignUp;
