import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const result = await loginUser(email, password); //

    if (result.success) {
      //Accion de Exito
      navigate('/')
    } else {
      // Acción de error
      alert(result.message);
    }
  };
  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Inicio de Sesion</h2>
        <label>
          Correo:
          <input
            type="email"
            placeholder="tu@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Entrar</button>
        <Link to="/Register">Crear cuenta</Link>
      </form>
      
    </div>
  );
};

export default Login;
