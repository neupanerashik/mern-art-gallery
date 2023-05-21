import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.js';
import store from './store.js';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

(async () => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/stripe-publishable-key`);
  const data = await res.json()
  const stripePromise = loadStripe(data.stripePK)

  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  root.render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Elements stripe={stripePromise}>
              <App /> 
            </Elements>
          </BrowserRouter>
        </HelmetProvider>
      </ReduxProvider>
    </React.StrictMode>
  );

})();
