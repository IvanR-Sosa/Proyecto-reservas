import React from 'react'
import rutah from '../../assets/rutah.PNG'
import './Footer.css'
const Footer = () => {
  return (
    <footer>
        <div className="left-footer">
            <div className="logo-footer">
                <img src={rutah} alt="" />
            </div>
            <div>
                <span>©Todos los derechos Reservados</span>
                <span> 2026</span>
            </div>
        </div>
    </footer>
  )
}

export default Footer