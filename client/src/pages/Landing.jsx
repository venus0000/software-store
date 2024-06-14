import React from 'react';
import '../styles/Landing.css';
import { Link } from 'react-router-dom';
import TypewriterComponent from 'typewriter-effect';

const Landing = () => {
  return (
    <div className="landing-main">
      <h1 className="animate-character">Landing Page</h1>
      <div className="greeting">
        <TypewriterComponent
          options={{
            strings: [
              'Hello and Welcome to my Website!',
              'My name is Saleh Alshehri',
              'My Whatsapp number is +966 56 544 4291',
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>

      <Link to="/login" className="landing-login-button">
        Login
      </Link>
      <Link to="/register" className="landing-register-button">
        Register
      </Link>
    </div>
  );
};

export default Landing;
