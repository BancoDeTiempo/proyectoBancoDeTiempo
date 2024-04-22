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
  FormUser,
  NewService,
} from '../pages';
import App from '../App';
import { Protected, ProtectedCheckChildren } from '../components';

//!----> HE METIDO DE MOMENTO ESTAS 5 HASTA QUE LO DEFINAMOS MEJOR

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
        element: (
          <Protected>
            <User />
          </Protected>
        ),
        children: [
          {
            path: '/user/changepassword',
            element: (
              <Protected>
                <ChangePassword />
              </Protected>
            ),
          },
          {
            path: '/user/',
            element: (
              <Protected>
                <FormUser />
              </Protected>
            ),
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
        element: (
          <ProtectedCheckChildren>
            <CheckCode />
          </ProtectedCheckChildren>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: '/newservice',
        element: (
          <Protected>
            <NewService />,
          </Protected>
        ),
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
