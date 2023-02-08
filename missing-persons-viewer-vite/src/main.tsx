import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'src/shared/styles/global.css';

import { App, loader as appLoader } from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
