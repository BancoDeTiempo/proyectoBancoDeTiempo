import { createBrowserRouter } from 'react-router-dom';
import {
  About,
  ChangePassword,
  CheckCode,
  Dashboard,
  ForgotPassword,
  Register,
  Home,
  Login,
  NotFound,
  User,
} from '../pages';
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
        children: [
          {
            path: '/user/changepassword',
            element: <ChangePassword />,
          },
        ],
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
        path: '/verifyCode',
        element: <CheckCode />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/forgotpassword',
        element: <ForgotPassword />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);
