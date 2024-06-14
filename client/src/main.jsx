import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './responsive.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
  'client-id':
    'AUKj8pEfgdvvwJlggKrCHEAyrr1NtZg1a8U_0KbZr0syi1DML7ipYdp452Bfm3tNBEUSRfhdDDy0QxK2',
  currency: 'USD',
  intent: 'capture',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <PayPalScriptProvider options={initialOptions}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PayPalScriptProvider>
);
