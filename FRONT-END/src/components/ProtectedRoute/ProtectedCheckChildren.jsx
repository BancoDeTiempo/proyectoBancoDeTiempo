import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts';

export const ProtectedCheckChildren = ({ children }) => {
  const { allUser, user } = useAuth();

  // allUser para usuarios que vienen de register || user para los que vienen de login

  if (allUser?.data?.user?.check == true || user?.check == true) {
    return <Navigate to="/dashboard" />;
  }
  if (user == null && allUser.data.confirmationCode === '') {
    return <Navigate to="/login" />;
  }

  return children;
};
