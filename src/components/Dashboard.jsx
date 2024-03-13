import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import InputComponent from "./Input";

const Dashboard = () => {
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
    fetchData();
  }, []); // Fetch data only once when the component mounts

  return (
    <Row className='landing'>
      <Col className='logo-container'>
        <div>
          <label>Update Profile</label>
        </div>
        <div >
          <label>Stream Settings</label>
        </div>
        <div className="logout">
          <button>LOG OUT</button>
        </div>
      </Col>
      <Col className="form-container">
        <div className="form-wrapper">
          <InputComponent
            type={"text"}
            input_id={"stream-name"}
            placeholder={"Stream Name"}
            label={"Stream Name"}
            // onChange={(e) => setName(e.target.value)}
            // disabled={loading}
            required={true} />

          <InputComponent
            type={"text"}
            input_id={"stream-color"}
            placeholder={"Enter Color Hex"}
            label={"Stream Color"}
            // onChange={(e) => setStreamColor(e.target.value)}
            // disabled={loading}
            required={true} />

          <h2 style={{ textAlign: "left" }}>QR Code</h2>
          <div className='qrcode-container'>
            <QRCode value={`streamName: ${streamName}, streamColor: ${streamColor}`} />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Dashboard;
