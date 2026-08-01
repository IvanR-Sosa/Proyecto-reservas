import React from 'react'
import ListProducts from './ListProducts'
import AddProduct from './AddProduct'
import './AdminHome.css'

const AdminHome = () => {
  return (
    <div className='main-admin'>
        <h1>Panel administrativo</h1>
        <div className="menu-admin">
            <button>Listar Productos</button>
            <button>Agregar Productos</button>
        </div>
        <div className='container-admin'>
            <ListProducts />
            <br />
            <AddProduct />
        </div>
    </div>
  )
}

export default AdminHome