import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  async function signup(name, email, password) {
    try {
      await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });

      toast.success("Signup successful! Please login.");
    } catch (error) {
      toast.error(error.response?.data?.error || "Signup failed");
    }
  }

  async function login(email, password) {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Logged in successfully!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      return false;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}