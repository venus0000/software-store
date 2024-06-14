import React, { useEffect, useState } from 'react';
import Image from '../assets/image.png';
import Logo from '../assets/logo.png';
import GoogleSvg from '../assets/icons8-google.svg';
import { FaEye } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa6';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import TypewriterComponent from 'typewriter-effect';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('auth')) || ''
  );
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      const formData = {
        email,
        password,
      };
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/login',
          formData
        );
        localStorage.setItem('auth', JSON.stringify(response.data.token));
        toast.success('Login successfull');
        navigate('/dashboard');
      } catch (err) {
        console.log(err);
        toast.error('Please enter your correct info.');
      }
    } else {
      toast.error('Please fill all inputs.');
    }
  };

  useEffect(() => {
    if (token !== '') {
      toast.success('You already logged in');
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className="login-main">
      <div className="login-left fade-effect">
        <img id="img-home" src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo fade-effect">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2 className="animate-character">Welcome to my website!</h2>
            <div className="greeting">
              <TypewriterComponent
                options={{
                  strings: ['Please enter your details'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>

            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" name="email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
