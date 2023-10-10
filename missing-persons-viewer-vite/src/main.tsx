import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'src/shared/styles/global.css';

import { App, loader as appLoader } from './App';
import { Error } from './App/pages/Error';
import {
  UnidentifiedPersons,
  loader as unidentifiedPersonsLoader,
} from './App/pages/UnidentifiedPersons';

const router = createBrowserRouter([
  {
    path: '/missing-persons',
    element: <App />,
    loader: appLoader,
    errorElement: <Error />,
  },
  {
    path: '/missing-persons/:caseNumber',
    element: <UnidentifiedPersons />,
    loader: unidentifiedPersonsLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
