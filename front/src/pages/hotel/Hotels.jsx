import React from 'react'
import parqueadero2 from '../../assets/parqueadero2.png'
import { Link } from 'react-router-dom'
import './Hotels.css'

const Hotels = () => {
  return (
    <div className='hotel-list'>
        <div className="basic-card">
            <h2>Hotel</h2>
            <p>id</p>
            <img src={parqueadero2} alt="" />
            <Link to="/hotel_card">Mas informacion</Link>
        </div>
        <div className="basic-card">
            <h2>Hotel</h2>
            <p>id</p>
            <img src={parqueadero2} alt="" />
            <Link to="/hotel_card">Mas informacion</Link>
        </div>
        <div className="basic-card">
            <h2>Hotel</h2>
            <p>id</p>
            <img src={parqueadero2} alt="" />
            <Link to="/hotel_card">Mas informacion</Link>
        </div>
    </div>
  )
}

export default Hotels