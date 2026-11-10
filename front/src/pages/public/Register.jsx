import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
const Register = () => {
  const { registerUser } = useContext(AuthContext);

  const [newUser, setnewUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");

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
      const result = await registerUser(newUser);
      if (result.success) {
        setsuccessMsg("Registro exitoso! Redirecionando");
        setnewUser({ name: "", lastName: "", email: "", password: "" });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        seterrorMsg(result.message || "No se pudo completar el Registro");
      }
    } catch (error) {
      console.error("Error capturado en el componente Register:", error);
      seterrorMsg("Ocurrió un error inesperado al registrar el usuario.");
    }
  };
  return (
    <div className="login">
      <form className="form" onSubmit={saveUser}>
        <h2>Crear Cuenta</h2>
        {errorMsg && (
          <p className="error-message" style={{ color: "red" }}>
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="success-message" style={{ color: "green" }}>
            {successMsg}
          </p>
        )}

        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={newUser.name}
            placeholder="tu nombre"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="lastName"
            value={newUser.lastName}
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
            value={newUser.email}
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
            value={newUser.password}
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
