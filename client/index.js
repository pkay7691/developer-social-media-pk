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
  <React.StrictMode>
    <Router>
      <GoogleOAuthProvider clientId= '635857443662-m660ubej5a3g0046gi44j2j8afhkpau6.apps.googleusercontent.com'>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);
