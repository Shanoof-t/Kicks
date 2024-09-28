import React, { createContext, useContext, useState } from "react";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => {
    setIsAdmin(true);
  };
  const logout = () => {
    setIsAdmin(false);
  };
  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
