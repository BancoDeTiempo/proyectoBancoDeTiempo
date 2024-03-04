import { NavLink } from "react-router-dom";
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
           <img
            src= "./public/logov9.png"
            alt="logo"
            className="logo"
          />
           </NavLink>
          </nav>
          
        </div>
        <nav>
          {user == null && (
            <NavLink to="/login">
              <button
                className="loginBtn"
                type="button"
                >
                  Empieza ahora
                </button>
            </NavLink>
          )
          }

          {user !== null ? (
            <NavLink to="/dashboard">
              <img
                src="https://res.cloudinary.com/dq186ej4c/image/upload/v1685705689/dashboard--5492_rnmxcl.png"
                alt=""
                className="iconNav iconDashBoard"
              />
            </NavLink>
          ) : null}

         
          {user !== null && (
            <img
              src = "/public/darumaLogOutB&nClaro.png"
              alt=""
              className="iconNav iconLogout"
              onClick={() => logout()}
            />
          )}
          {user !== null ? (
            <>
              <NavLink to="/profile">
                <img
                  className="profileCircle"
                  src={user.image}
                  alt={user.user}
                />
              </NavLink>
            </>
          ) : null}
          {}
        </nav>
      </header>
    </>
  );
};
