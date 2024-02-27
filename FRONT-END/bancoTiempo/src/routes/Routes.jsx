import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { About, Home, Login, NotFound, User } from '../pages';
//!----> HE METIDO DE MOMENTO ESTAS 5 HASTA QUE LO DEFINAMOS MEJOR

//!----> EN UN FUTURO TRABAJAREMOS CON PROTECTED

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/user',
        element: <User />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
