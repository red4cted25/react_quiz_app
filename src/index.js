import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/normalize.css';
import './css/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/quiz', element: <Quiz /> }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
