import React from 'react'
import { Link } from 'react-router-dom'
import rutah from '../../assets/rutah.PNG'
import './Header.css'

const Header = () => {
  return (
    <header>
        <div className="left-header">
            <Link to = "/">
                <img src={rutah} alt="" />
                <span>Para descansa y continua</span>
            </Link>
        </div>
        <div className="right-header">
            <Link className="btn-header" to = "/">Iniciar sesion</Link>
            <Link className="btn-header" to = "/">Crear cuenta</Link>
        </div>

    </header>
  )
}

export default Header