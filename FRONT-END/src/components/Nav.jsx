import './Nav.css';

import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
      <NavLink to="/about">
        <button>About Us</button>
      </NavLink>
      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
    </nav>
  );
};

//! CUANDO HAGAMOS EL LOGIN HAREMOS CONDICIONALES PARA QUE EL BOTÓN DE LOGIN SEA LOGOUT CUANDO SE ESTÉ LOGADO
