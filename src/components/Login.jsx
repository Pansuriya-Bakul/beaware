import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import InputComponent from './Input';
import logo from '../style/logo.png'
import login_vec from '../style/login-vec.png';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
          <label>New to beaware? <a href="/signup">Sign Up</a></label>
        </Row>
      </Col>
      <Col className="form-container col-lg-7">
        <Row className='vh-100 d-flex align-items-center'>
          <div>
            <h2 className='text-center form-heading text-uppercase'>SIGN IN</h2>
            <div >
              <Row className='justify-content-center'>
                <InputComponent
                  type={"email"}
                  input_id={"email"}
                  placeholder={"Enter Your Email"}
                  centered={true}
                  label={"Email"}
                  onChange={(e) => handleEmail(e.target.value)}
                  required={false} />
              </Row>

              <Row>
                <InputComponent
                  type={"password"}
                  input_id={"password"}
                  placeholder={"Enter Your Password"}
                  label={"Password"}
                  centered={true}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true} />
              </Row>

              <Row>
                <Col className='col-2'></Col>
                <Col className='col-8 d-flex flex-row-reverse'>
                  <a
                    href="/forgotpassword">
                    Forgot Password ?
                  </a>
                </Col>
                <Col className='col-2'></Col>
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
                      onClick={handleSubmit} >
                      <span
                        className='fs-7 text-uppercase fw-bold color-pri'>
                        Login
                      </span>
                    </button>
                  </div>
                </Col>
                <Col className='col-2'></Col>
              </Row>
            </div>
          </div>
        </Row>
      </Col>
    </Row >
  );

};

export default Login;
