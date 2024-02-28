import { createBrowserRouter } from 'react-router-dom';
import { About,
  ChangePassword,
  CheckCode,
  Dashboard,
  ForgotPassword,
  FormProfile,
  Register,
  Home,
  Login,
  NotFound,
  User } from '../pages';
import App from '../App';

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
      {
        path: 'ChangePassword',
        element: <ChangePassword />,
      },
      {
        path: 'CheckCode',
        element: <CheckCode />,
      },
      {
        path: 'Dashboard',
        element: <Dashboard />,
      },
      {
        path: 'ForgotPassword',
        element: <ForgotPassword />,
      },
      {
        path: 'FormProfile',
        element: <FormProfile />,
      },
      {
        path: 'Register',
        element: <Register />,
      },
    ],
  },
]);