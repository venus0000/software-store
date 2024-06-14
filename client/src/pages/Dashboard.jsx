import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('auth')) || ''
  );
  const [data, setData] = useState({});

  const [enable, setEnable] = useState(false);
  const [machineId, setMachineId] = useState('');
  const [license, setLicense] = useState('');
  const navigate = useNavigate();

  const fetchLuckyNumber = async () => {
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/dashboard',
        axiosConfig
      );
      setData({ msg: response.data.msg, luckyNumber: response.data.secret });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const handlePaymentClick = () => {
  //   setEnable(true);
  //   window.location.href = 'https://paypal.me/SalehAlshehri/50.00';
  // };

  const handlePaymentSuccess = () => {
    setEnable(true);
  };

  const handleGeneratelicense = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/v1/generatelicense',
        {
          machineId,
        }
      );
      setLicense(res.data.licenseKey);
    } catch (error) {
      toast.warn('Please enter your correct machine number.');
      console.error('Error generating license key:', error);
    }
  };
  const handlemachineIdChange = (event) => {
    setMachineId(event.target.value);
  };

  useEffect(() => {
    fetchLuckyNumber();
    if (token === '') {
      navigate('/login');
      toast.warn('Please login first to access dashboard');
    }
  }, [token]);

  return (
    <div className="dashboard-main">
      <h1>Welcome</h1>
      <p>
        {data.msg} {data.luckyNumber}
      </p>
      {enable && (
        <>
          <a href="./app.zip" download>
            <button className="download-button">Download ZIP File</button>
          </a>
          <input
            type="text"
            value={machineId}
            onChange={handlemachineIdChange}
            placeholder="Enter your machine number"
          />
          {license !== '' && (
            <div>
              <h2>Your License Key</h2>
              <p>{license}</p>
            </div>
          )}
          <button className="download-button" onClick={handleGeneratelicense}>
            Generate License
          </button>
        </>
      )}
      <PayPalButtons
        className="paypalbtn"
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '99.99',
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(handlePaymentSuccess);
        }}
      ></PayPalButtons>
      {/* <button className="download-button" onClick={handlePaymentClick}>
        Pay $50.00
      </button> */}

      <Link to="/logout" className="logout-button">
        Logout
      </Link>
    </div>
  );
};

export default Dashboard;
