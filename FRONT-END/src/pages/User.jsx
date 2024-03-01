import { Outlet } from 'react-router-dom';
import { NavUser } from '../components';
import './User.css';

export const User = () => {
  return (
    <>
      <NavUser />
      <Outlet />
    </>
  );
};
