import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Navigate, useNavigate } from 'react-router-dom';
import InputComponent from './Input';
import logo from '../style/logo.png'
import login_vec from '../style/login-vec.png'
import { Row, Col, Nav, Button} from 'react-bootstrap';
import QRCode from 'qrcode.react';
import { SketchPicker } from 'react-color'

const Dashboard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showStream, setShowStream] = useState(false);
  const [streamName, setStreamName] = useState('');
  const [streamColor, setStreamColor] = useState('');
  useEffect(() => {
    // Fetch stream name and hex color from the database or API
    const fetchData = async () => {
      try {
        // Make API request to fetch user's stream details
        const response = await fetch('/api/stream/details', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Update state with stream name and hex color
          setStreamName(data.streamName);
          setStreamColor(data.streamColor);
        } else {
          console.error('Failed to fetch stream details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching stream details:', error);
      }
    };
    getUserDetails();
    fetchData();
  }, []);
  const getUserDetails = async () => {
    if (auth.currentUser) {
      console.log(auth.currentUser)
      setEmail(auth.currentUser.email);
      setName(auth.currentUser.displayName || 'Matt');
      setPhone(auth.currentUser.phoneNumber || "1234567890");
    
    } else {
      navigate('/login');
    }
  }

  const logout = () => {
    auth.signOut();
    navigate('/login');
  };
  return (
    <Row className='landing'>
      <Col  className='dashboard-container'>
        <div className="dashboard-navbar">
          <img src={logo} alt="logo" />
        </div>
        <Nav variant="pills" defaultActiveKey="update_profile" className="flex-column">
          <Nav.Link eventKey="update_profile" onClick={() => setShowStream(false)}>Update Profile</Nav.Link>
          <Nav.Link eventKey="stream_settings" onClick={() => setShowStream(true)}>Stream Settings</Nav.Link>
        </Nav>
        <div className='log-out-container'>
        <Button size='lg' variant='outline-primary' className='log-out' onClick={logout}>LOG OUT</Button>
        </div>
      </Col>
      {showStream ? <Col xs={9} className="dashboard-container-right">
        <div className="dashboard-form-wrapper">
        <div className='dashboard-header'>STREAM SETTINGS</div>
          <InputComponent
            type={"text"}
            className={'dashboard-stream-name'}
            input_id={"stream-name"}
            placeholder={"Stream Name"}
            label={"Stream Name"}
            // onChange={(e) => setName(e.target.value)}
            // disabled={loading}
            required={true} />
            <div className='dashboard-color-picker'>

            Stream Color: {streamColor}
            <input
              type={"color"}
              id={"stream-color"}
              placeholder={"Enter Color Hex"}
              onChange={(e) => setStreamColor(e.target.value)}
              required={true} />
            </div>
          <div className='qrcode-container'>
            <QRCode value={streamName} />
          </div>
        </div>
      </Col>
      :
      <Col xs={9} className="dashboard-container-right">
      <div className='dashboard-header'>HELLO, <p className='name'>{name.toUpperCase()}</p></div>
        <div className="dashboard-form-wrapper">
            <form >
              <InputComponent
                type={"email"}
                input_id={"email"}
                placeholder={"Enter Your Email"}
                value={email}
                label={"Email"}
                v
                onChange={(e) => setEmail(e.target.value)}
                required={false} />
                <InputComponent
                type={"name"}
                input_id={"name"}
                placeholder={"Enter Your Name"}
                label={"name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={false} />
                <InputComponent
                type={"phone"}
                input_id={"phone"}
                placeholder={"Enter Your Phone number"}
                label={"Phone Number"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={false} />

              <InputComponent
                type={"password"}
                input_id={"password"}
                label={"Password"}
                disabled={true}
                value={"*************"}
                required={true} />
              <div className='dashboard-buttons'>
              <Button variant="outline-primary" size="lg" type="reset" className={'dashboard-button'}>Cancel</Button>
              <Button variant="primary" type="submit" size="lg" className={'dashboard-submit'}>UPDATE</Button>
              </div>
            </form>
        </div>
      </Col>}
    </Row>
  );

};

export default Dashboard;
