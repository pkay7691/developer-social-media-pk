import React from 'react';

import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div>
      <h1 className='text-xl'>hello!</h1>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
