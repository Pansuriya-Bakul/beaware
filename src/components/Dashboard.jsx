import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import InputComponent from './Input';
import logo from '../style/logo.png';
import { Row, Col, Nav, Button } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import ColorPickerComponent from './ColorPicker';

const Dashboard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showStream, setShowStream] = useState(false);
  const [streamName, setStreamName] = useState('');
  const [streamColor, setStreamColor] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const componentDidMount = () => {
    setIsMobile(window.innerWidth < 1200 ? true : false);
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 1200 ? true : false);
    }, false);
  };

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const streamsCollectionRef = collection(db, 'streams');
        const streamsQuery = query(streamsCollectionRef, where('userId', '==', auth.currentUser.uid));

        const userStreams = [];
        const querySnapshot = await getDocs(streamsQuery);

        querySnapshot.forEach((doc) => {
          userStreams.push({ id: doc.id, ...doc.data() });
        });

        const data = userStreams[0];
        if (data) {
          setStreamName(data.name);
          setStreamColor(data.streamColor);
        }
      } catch (error) {
        console.error('Error fetching stream details:', error);
      }
    };

    getUserDetails();
    fetchStream();
    componentDidMount();
  });

  const getUserDetails = () => {
    if (auth.currentUser) {
      setEmail(auth.currentUser.email);
      setName(auth.currentUser.displayName || auth.currentUser.email.split('@')[0]);
      setPhone(auth.currentUser.phoneNumber || '1234567890');
    } else {
      navigate('/login');
    }
  }

  const logout = () => {
    auth.signOut();
    navigate('/login');
  };

  return !isMobile ? (
    // Desktop View
    <Row className='landing'>
      <Col className='dashboard-container'>
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
            value={streamName}
            label={"Stream Name"}
            disabled={true}
            required={true} />
          <div className='dashboard-color-picker'>
            <ColorPickerComponent
              type={"color"}
              input_id={"stream-color"}
              placeholder={"Stream Color"}
              value={streamColor}
              label={"Stream Color"}
              disabled={true}
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
                disabled={true}
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
  ) : (
    // Mobile View
    <Row className='landing'>
      <Col className='dashboard-container'>
        <div className="dashboard-navbar">
          <img src={logo} alt="logo" />
        </div>
        <Nav variant="tabs" defaultActiveKey="update_profile" className="flex-row">
          <Nav.Link eventKey="update_profile" onClick={() => setShowStream(false)}>Update Profile</Nav.Link>
          <Nav.Link eventKey="stream_settings" onClick={() => setShowStream(true)}>Stream Settings</Nav.Link>
          <div className='log-out-container'>
            <Button size='sm' variant='outline-secondary' onClick={logout}>LOG OUT</Button>
          </div>
        </Nav>
      </Col>
      {showStream ? <Col className="dashboard-container-right">
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
        <Col className="dashboard-container-right">
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
                <Button variant="outline-primary" size="sm" type="reset" className={'dashboard-button'}>Cancel</Button>
                <Button variant="primary" type="submit" size="sm" className={'dashboard-submit'}>UPDATE</Button>
              </div>
            </form>
          </div>
        </Col>}
    </Row>
  );

};

export default Dashboard;
