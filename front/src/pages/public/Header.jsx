import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import rutah from '../../assets/rutah.PNG'
import './Header.css'
import { AuthContext } from '../../auth/AuthContext'

const Header = () => {
    //pedimos al cerebro (AuthContext) lo que requerimos para saber si existe o no sesion activa
    const {user,logout} = useContext(AuthContext);
    const navigate = useNavigate();

    //preparamos la salida de la sesion
    const handleLogout = () =>{
        logout();//limpia el estado
        navigate('/login')
    }
    let avatar = '';
  if(user){
    avatar = user.name[0]+user.lastName[0]
    avatar=avatar.toUpperCase();
  }

  return (     
        <>
        {user ? (
            <header>
                
                <div className="left-header">
            <Link to = "/">
                <img src={rutah} alt="" />
                <span>Para, Descansa y Continua</span>
                <span>Bienvenid@ {user.name}</span>
            </Link>
        </div>
        <div className="right-header session">
            <Link className="btn-header avatar" onClick={()=>navigate('/Profile')} title='Mi perfil' >{avatar}</Link>
            <Link className="btn-header logout" onClick={handleLogout}>Cerrar sesion</Link>
        </div>
            </header>
            
        ) :(
            <header>
             <div className="left-header">
            <Link to = "/">
                <img src={rutah} alt="" />
                <span>Para, Descansa y Continua</span>
            </Link>
        </div>

            <div className="right-header">
            <Link className="btn-header" to = "/Login">Iniciar sesion</Link>
            <Link className="btn-header" to = "/Register">Crear cuenta</Link>
        </div>
            </header>
        )}
        </>
  )
}

export default Header