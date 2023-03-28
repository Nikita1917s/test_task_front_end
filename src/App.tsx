import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { useRoutes } from './router/router';

const App = () => {
  //Auth can be added later
  const isAuth = false;

  const router = useRoutes(isAuth);
  return <RouterProvider router={router} />;
}

export default App;
