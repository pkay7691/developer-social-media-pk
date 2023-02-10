import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store.js';
import App from './app/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = createRoot(document.getElementById('app'));
// added react strictmode to highlight error on front end in console.
root.render(
  // <React.StrictMode>
    <Router>
      <GoogleOAuthProvider clientId= {process.env.REACT_APP_DEVUPSOCIAL_GOOGLE_API_TOKEN} >
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </Router>
  // </React.StrictMode>
);
