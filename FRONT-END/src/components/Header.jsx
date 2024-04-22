import { NavLink } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../contexts/authContext';

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <header>
        <div className="titleFatherContainer">
          <nav>
            <NavLink to="/">
              <img src="./public/logov9.png" alt="logo" className="logo" />
            </NavLink>
          </nav>
        </div>
        <nav>
          {user == null && (
            <NavLink to="/login">
              <button className="loginBtn" type="button">
                Empieza ahora
              </button>
            </NavLink>
          )}

          {user !== null ? (
            <NavLink to="/dashboard">
              <img
                src="https://res.cloudinary.com/dtiqfidkg/image/upload/v1709640538/ejercicioSeis/dc9bybrrarvynqkg7xp3.png"
                alt=""
                className="iconNav iconDashBoard"
              />
            </NavLink>
          ) : null}

          {user !== null && (
            <img
              src="/public/darumaLogOutB&nClaro.png"
              alt=""
              className="iconNav iconLogout"
              onClick={() => logout()}
            />
          )}
          {user !== null ? (
            <>
              <NavLink to="/user">
                <img className="profileCircle" src={user.image} alt={user.user} />
              </NavLink>
            </>
          ) : null}
          {}
        </nav>
      </header>
    </>
  );
};
