import React from 'react'
import './Login.css'
const Register = () => {
  return (
     <div className='login'>
        <form >
            <h2>Crear Cuenta</h2>
            <label >Nombre:
                <input type="text"
                placeholder='tu nombre'
                required />
            </label>
            <label >Apellido:
                <input type="text"
                placeholder='tu Apellido'
                required />
            </label>
            <label >Correo:
                <input type="email"
                placeholder='tu@email.com'
                required />
            </label>
            <label >Contraseña: 
                <input type="password"  autoComplete='off'
                required/>
            </label>
            <button>Registrarse</button>
        </form>
       
    </div>
  )
}

export default Register