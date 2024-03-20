import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import InputComponent from './Input';
import logo from '../style/logo.png';
import { Row, Col, Nav, Button } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';
import ColorPickerComponent from './ColorPicker';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showStream, setShowStream] = useState(false);
  const [streamName, setStreamName] = useState('');
  const [streamURL, setStreamURL] = useState('');
  const [streamColor, setStreamColor] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const flyerLink = `https://conferencecaptioning.com/flyer.pdf`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, phoneNumber } = user;
        setEmail(email);
        setName(displayName || email.split('@')[0]);
        setPhone(phoneNumber);
      } else {
        navigate('/login');
      }
    });

    setIsMobile(window.innerWidth < 1200);
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 1200);
    });

    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const streamsCollectionRef = collection(db, 'streams');
        const streamsQuery = query(streamsCollectionRef, where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(streamsQuery);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Stream data:', data);
          setStreamName(data.name);
          setStreamColor('#' + data.streamColor);
          setStreamURL("https://conferencecaptioning.com/" + data.name);
        });
      } catch (error) {
        console.error('Error fetching stream details:', error);
      }
    };

    return fetchStream;
  }, [showStream]);

  const updateDetails = () => {
    const userDetails = {
      displayName: name,
      email: email,
      phoneNumber: phone,
    };
    updateProfile(auth.currentUser, userDetails)
      .then(() => setSuccess('Profile updated successfully'))
      .catch(() => setError('Failed to update profile'));
  };

  const resetDetails = () => {
    // Refresh user details
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, phoneNumber } = user;
        setEmail(email);
        setName(displayName || email.split('@')[0]);
        setPhone(phoneNumber || undefined);
      } else {
        navigate('/login');
      }
    });
  };

  const logout = () => {
    auth.signOut();
    navigate('/login');
  };

  return !isMobile ? (
    // Desktop View
    <Row className='landing'>
      {/* Left side navigation */}
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
      {/* Right side content */}
      {showStream ? (
        <Col xs={9} className="dashboard-container-right">
          <Row className="dashboard-form-wrapper">
            <div className='dashboard-header'>STREAM SETTINGS</div>
            <InputComponent
              type={"text"}
              className={'dashboard-stream-name'}
              input_id={"stream-name"}
              placeholder={"Stream Name"}
              value={streamName}
              label={"Stream Name"}
              onChange={() => { }}
              disabled={true}
              required={true} />
            <ColorPickerComponent
              className={'dashboard-color-picker'}
              type={"color"}
              input_id={"stream-color"}
              placeholder={"Stream Color"}
              value={streamColor}
              onChange={() => { }}
              label={"Stream Color"}
              disabled={true}
              required={true} />


            <Row className='mt-5'>
              <Col className='col-5'>
                <QRCode className="qr-code" value={streamURL} size={160} />
              </Col>
              <Col className="col-7 d-flex flex-column align-items-center">
                <a href={streamURL} className='link m-auto py-2'> Open Stream </a>
                <a href={flyerLink} className='link m-auto py-2'> Download Flyer </a>
                <a href={flyerLink} className='link m-auto py-2'> Download QR Image </a>
              </Col>
            </Row>
          </Row>
        </Col>
      ) : (
        <Col xs={9} className="dashboard-container-right">
          <div className='dashboard-header'>HELLO, <p className='name'>{name ? name.toUpperCase() : email.toUpperCase()}</p></div>
          <div className="dashboard-form-wrapper">
            <div>
              <InputComponent
                type={"email"}
                input_id={"email"}
                placeholder={"Enter Your Email"}
                value={email}
                label={"Email"}
                disabled={true}
                onChange={() => { }}
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
                onChange={() => { }}
                disabled={true}
                value={"*************"}
                required={true} />

              <Row>
                {error || success ? <div className={(error && 'error') || (success && 'success')}>{error || success}</div> : null}
              </Row>

              <div className='dashboard-buttons mt-5'>
                <button onClick={resetDetails} className={'dashboard-button btn btn-outline-primary'}>Cancel</button>
                <button onClick={updateDetails} className={'dashboard-submit btn btn-primary'}>Update</button>
              </div>
            </div>
          </div>
        </Col>
      )}
    </Row>
  ) : (
    // Mobile View
    <Row className='landing'>
      <Col className='dashboard-container'>
        <div className="dashboard-navbar">
          <img src={logo} alt="logo" />
        </div>
        <Nav variant="tabs" defaultActiveKey="update_profile" className="d-flex align-items-center nav-bar-bg">
          <Nav.Link eventKey="update_profile" onClick={() => setShowStream(false)}>Update Profile</Nav.Link>
          <Nav.Link eventKey="stream_settings" onClick={() => setShowStream(true)}>Stream Settings</Nav.Link>
          <Button size='sm' variant='outline-secondary' className='ml-auto' onClick={logout}>LOG OUT</Button>
        </Nav>
      </Col>
      {showStream ? <Col className="dashboard-container-right px-5 mb-auto">
        <Row className="dashboard-form-wrapper">
          <div className='dashboard-header'>STREAM SETTINGS</div>
          <InputComponent
            type={"text"}
            className={'dashboard-stream-name'}
            input_id={"stream-name"}
            placeholder={"Stream Name"}
            label={"Stream Name"}
            value={streamName}
            required={true} />
          <ColorPickerComponent
            className={'dashboard-color-picker'}
            type={"color"}
            input_id={"stream-color"}
            placeholder={"Stream Color"}
            value={streamColor}
            label={"Stream Color"}
            disabled={true}
            required={true} />


          <Row className='d-flex flex-row align-items-center'>
            <Row className='d-flex flex-column align-items-center mt-3'>
              <QRCode className="qr-code" value={streamURL} size={160} />
            </Row>
            <Row className='d-flex flex-column align-items-center mt-3'>
              <a href={streamURL} className='link m-auto mb-2 py-2'> Open Stream </a>
              <a href={flyerLink} className='link m-auto mb-2 py-2'> Download Flyer </a>
              <a href={flyerLink} className='link m-auto mb-2 py-2'> Download QR Image </a>
            </Row>
          </Row>
        </Row>
      </Col>
        :
        <Col className="dashboard-container-right px-5 mb-auto">
          <div className='dashboard-header'>HELLO, <p className='name'>{name?.toUpperCase() || email?.split('@')[0]}</p></div>
          <div className="dashboard-form-wrapper">
            <div>
              <InputComponent
                type={"email"}
                input_id={"email"}
                placeholder={"Enter Your Email"}
                value={email}
                label={"Email"}
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

              <Row>
                {error || success ? <div className={(error && 'error') || (success && 'success') + ' mb-3'}>{error || success}</div> : null}
              </Row>

              <div className='dashboard-buttons'>
                <button onClick={resetDetails} className={'dashboard-button btn btn-outline-primary'}>Cancel</button>
                <button onClick={updateDetails} className={'dashboard-submit btn btn-primary'}>Update</button>
              </div>
            </div>
          </div>
        </Col>}
    </Row >
  );

};

export default Dashboard;
