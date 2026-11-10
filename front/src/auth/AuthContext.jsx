import React, { createContext, useEffect, useState } from "react";
import { loginUserApi, registeUserApi } from "../service/ApiUser";

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
  //Funcion para manejar el Login desde el back conectado a spring boot
  const loginUser = async (email,password) => {
    try {
      const data = await loginUserApi(email,password);
       
      //Aqui viene lo importante que es extraer el token
      const {token,name,lastName,id,role} = data;
      if(token){
        const loggedUser = {
          email,
          token,
          name,
          lastName,
          id,
          rol:role
        };
        setUser(loggedUser);
        sessionStorage.setItem("session_user",JSON.stringify(loggedUser));
        return {success:true};
      }
      return {success:false,message:"Credenciales incorrectas"}

    } catch (error) {
      console.error("Error en Login ::> ",error);
      const msg = error.response?.data?.message || "Error de sistema al conectar con el servidor";
      return {success:false,message:msg};
    }
  }
  //Funcion para manejar el regitro conectado con el back 
  const registerUser = async (userData) => {
    try {
      const data = await registeUserApi(userData);
      const {token} = data;
      if( token){
       const loggedUser = {email:userData.email,token,name:userData.name,lastName:userData.lastName,id:userData.id};
       sessionStorage.setItem("session_user",JSON.stringify(loggedUser));
       return {success:true}; 
      }
      return {success:false,message:"No se pudo completar el registro"}
    } catch (error) {
      console.error("Error de Regitro ::> ",error);
      const msg = error.response?.data?.message || "El correo elegido ya esta en uso";
      return {success:false, message:msg};
      
    }
    
  }
  //Funcion para el logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("session_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, registerUser, logout,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
