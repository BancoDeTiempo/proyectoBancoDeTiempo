import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

//! 2) la funcion  que nos provee del contexto

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  const login = (data) => {
    localStorage.setItem("user", data);
    const parseUser = JSON.parse(data);
    setUser(parseUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  const value = useMemo(() => ({ user, setUser, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
