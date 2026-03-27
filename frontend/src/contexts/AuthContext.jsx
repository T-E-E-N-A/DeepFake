import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, isAuthenticated, logout as apiLogout } from "@/services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser({ authenticated: true });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await loginUser(username, password);
    setUser({ ...response, authenticated: true });
    return response;
  };

  const register = async (username, email, password, confirmPassword) => {
    const response = await registerUser(username, email, password, confirmPassword);
    setUser({ ...response, authenticated: true });
    return response;
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
