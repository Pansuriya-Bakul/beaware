  import React, { useState, useEffect } from 'react';
  import { Row, Col } from 'react-bootstrap';
  import QRCode from 'qrcode.react';
  import { auth, db } from '../firebase/config';
  import logo from "../style/logo.png";

  const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const userDoc = await db.collection('streams').where('userId', '==', user.uid).get();
            if (!userDoc.empty) {
              const userData = userDoc.docs[0].data();
              setUserData(userData);
            } else {
              console.error('User data not found');
            }
          } else {
            console.error('No user is currently signed in.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }, []);

      const handleprofile =() =>{

      }
    return (
      <Row className='landing'>
      <Col className='logo-container'>
    <div className="logo-wrapper">
      <img src={logo} alt="logo" />
    </div>
    <div className="profile-stream-wrapper">
      <div className={"profile-container"}>
        <label onClick={handleprofile}>Update Profile</label>
      </div>
      <div className={"stream-container"}>
        <label>Stream Settings</label>
      </div>
    </div>
    <div className="logout">
      <button>LOG OUT</button>
    </div>
  </Col>
        <Col className="form-container">
    <div className="form-wrapper">
      <div className="input-component my-3 row">
        <label className="form-label color-sec">Stream Name:</label>
        <input
          className="form-input form-text"
          type={"text"}
          id={"stream-name"}
          placeholder={"Stream Name"}
          // value={userData.name}
          disabled={true}
          readOnly={true}
          required={true}
        />
      </div>
      <div className="input-component my-3 row">
        <label className="form-label color-sec" >Stream Color:</label>
        <input
          className="form-input form-text"
          type={"text"}
          id={"stream-color"}
          placeholder={"Stream Color"}
          // value={userData.streamColor}
          disabled={true}
          readOnly={true}
          required={true}
        />
      </div>
    </div>

              <h2 style={{textAlign: "left"}}>QR Code</h2>
              <div className='qrcode-container'>
                {userData && (
                    <QRCode value={`streamName: ${userData.name}, streamColor: ${userData.streamColor}`}/>
                )}
              </div>
        </Col>
      </Row>
    );
  };

  export default Dashboard;
