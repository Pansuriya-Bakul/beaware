import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const componentDidMount = () => {
    setIsMobile(window.innerWidth < 1200 ? true : false);
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 1200 ? true : false);
    }, false);
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  const handleForgotPassword = async () => {
    setLoading(true);

    await sendPasswordResetEmail(auth, email)
      .then((res) => {
        setSuccess(true);
        setInterval(() => {
          navigate('/login');
        }, 3000);
      }).catch((error) => {
        console.error('Error checking email:', error);
        setError('An error occurred while checking the email. Please try again later.');
        setLoading(false);
      });
  };

  return (
    <Row className='landing'>
      <Col className={'logo-container p-5 ' + (isMobile ? 'col-sm-1' : 'col-lg-5')} >
        <Row className={'justify-content-center text-center ' + (isMobile ? ' py-3' : '')}>
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
        <Row className={'justify-content-center text-center ' + (isMobile ? ' py-2' : '')}>
          <label>New to beaware? <a href="/signup">Sign Up</a></label>
        </Row>
      </Col>
      <Col className={'form-container ' + (isMobile ? 'col-sm-11' : 'col-lg-7')}>
        <Row className={'d-flex align-items-center' + (!isMobile && ' vh-100')}>
          <div>
            <h2 className='text-center form-heading text-uppercase'>Forgot Password?</h2>
            <h2 className='text-center form-heading text-uppercase'>No need to worry.</h2>
            {(success)
              ? (<p style={{color:'white', justifyContent:'center' ,width:'100%', display:'flex', fontSize:'20px', paddingTop:'20px' }}>A link has been sent to you on your Email. Redirecting you to Login page.</p>)
              : (
                <div >
                  <Row className='justify-content-center'>
                    <InputComponent
                      type={"email"}
                      input_id={"email"}
                      placeholder={"Enter Your Email"}
                      centered={true}
                      label={"Email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      <div>
                        <button
                          className={'btn px-5 py-2 my-3 bg-color-sec'}
                          type="submit"
                          disabled={error ? true : false || loading}
                          onClick={handleForgotPassword}>
                          <span
                            className='fs-7 text-uppercase fw-bold color-pri'>
                            Submit
                          </span>
                        </button>
                      </div>
                    </Col>
                    <Col className='col-2'></Col>
                  </Row>
                </div>
              )
            }
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default PasswordReset;
