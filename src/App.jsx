import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import React from 'react';

const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
