import React, { useState } from "react";
import "./Login.css";
import { createUser } from "../../service/ApiUser";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [newUser, setnewUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMsg, seterrorMsg] = useState('');
  const [successMsg, setsuccessMsg] = useState('');

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setnewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
      seterrorMsg("");
      setsuccessMsg("");
    try {
      await createUser(newUser);
      setsuccessMsg("Registro exitoso ya puedes Iniciar sesion :)")
      setnewUser({name:'',lastName:'',email:'',password:''})
      // esto es provisional ya que si cambio por medio de la url se refresca el proyecto y trae la lista original
      navigate("/admin");
    } catch (error) {
      seterrorMsg(error.message || "Ocurrio un error al registrar usuario");
    }
  };
  return (
    <div className="login">
      <form  className="form"onSubmit={saveUser}>
        <h2>Crear Cuenta</h2>
        {errorMsg && <p className="error-message" style={{ color: "red" }}>{errorMsg}</p>}
        {successMsg && <p className="success-message" style={{ color: "green" }}>{successMsg}</p>}

        <label>
          Nombre:
          <input type="text" name="name" placeholder="tu nombre" onChange={handleChange} required />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="lastName"
            placeholder="tu Apellido"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Correo:
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
