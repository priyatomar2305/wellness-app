
import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ⬇️ Auto login check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/check");
        setUser(res.data.user); // set user from backend
      } catch (err) {
        setUser(null); // token invalid or not logged in
      }
    };

    checkAuth();
  }, []);
const register = async (email, password) => {
  await api.post("/auth/register", { email, password });
  setUser({ email });
};
  const login = async (email, password) => {
    await api.post("/auth/login", { email, password });
    setUser({ email });
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,register, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
