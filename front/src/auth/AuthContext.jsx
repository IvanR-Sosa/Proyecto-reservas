import React, { createContext, useEffect, useState } from "react";
import { getAllUsers } from "../service/ApiUser";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("session_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  //Funcion para manejar el login de usuarios
  const loginUser = async (email, password) => {
    try {
      // 1. Esperamos a que getAllUsers termine y devuelva el array
      const users = await getAllUsers();

      // 2. Ahora 'users' SÍ es el array
      const foundUser = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (foundUser) {
        setUser(foundUser);
        sessionStorage.setItem("session_user", JSON.stringify(foundUser));
        return { success: true };
      }
      return { success: false, message: "Credenciales incorrectas" };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, message: "Error de sistema" };
    }
  };
  //Funcion para el logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("session_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
