import { createContext, useContext, useState, useEffect } from "react";
import { loginAPI, logoutAPI } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await loginAPI(email, password);
      setUser({
        role: userData.role,
        firstName: userData.firstName
      });
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);
      return { success: true, userData };
    } catch (error) {
      console.error("Login failed:", error.message);
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
