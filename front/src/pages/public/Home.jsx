import React from 'react'
import Hotels from '../hotel/Hotels'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
        <div className="search-home">
            <form >
                <label >Buscar por:
                </label>
                <div className='areas-search'>
                     <select >
                        <option value="name">Nombre</option>
                        <option value="id">ID</option>
                        <option value="route">Ruta</option>
                    </select>
                    <input type="text" />
                </div>
                <button>Buscar</button>
            </form>
        </div>
        <div className="products-home">
            <h2>Hoteles disponibles</h2>
            <Hotels />
        </div>
        <div className="top-products-home">
            <h2>El top de nuestros hoteles</h2>
            <Hotels/>
        </div>
    </div>
  )
}

export default Home