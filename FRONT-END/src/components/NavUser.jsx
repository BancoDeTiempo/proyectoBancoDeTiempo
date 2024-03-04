import { Link } from 'react-router-dom';
import { useAuth } from '../contexts';
import './NavUser.css';
import { useDeleteUser } from '../hooks';

export const NavUser = () => {
  const { setUser, setDeleteUser } = useAuth();
  return (
    <div className="containerNavUser">
      <Link to="/user/changePassword">
        <img
          src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125399/pngwing.com_npd5sa.png"
          alt="go to Change Password"
          className="iconNav"
        />
      </Link>

      <Link to="/user/">
        <img
          src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125391/Change_User_icon-icons.com_55946_lypx2c.png"
          alt="go to change user data"
          className="iconNav iconChangeUser"
        />
      </Link>

      <img
        src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686140226/eliminar_user_rmwoeg.png"
        alt="delete user button"
        className="iconNav iconDeleteUser"
        onClick={() => useDeleteUser(setUser, setDeleteUser)}
      />
    </div>
  );
};
