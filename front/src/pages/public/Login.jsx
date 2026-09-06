import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='login'>
        <form >
            <h2>Inicio de Sesion</h2>
            <label >Correo:
                <input type="email"
                placeholder='tu@email.com'
                required />
            </label>
            <label >Contraseña: 
                <input type="password" autoComplete='off'
                required />
            </label>
            <button>Entrar</button>
            <Link to="/Register" >Crear cuenta</Link>
        </form>
       
    </div>
  )
}

export default Login