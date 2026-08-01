import React from 'react'
import './AddProduct.css'
//Por el momento va a quedar asi lo que se desea es que este formulario sirva para editar y agregar ya veremos
//si veo que no es muy agradable de usar lo manejarmos el editar en otro archivo 
const AddProduct = () => {
  return (
    <div className='add-admin'>
      <h2>Agregar Hotel</h2>
        <form >
            <label >Nombre      <input type="text" placeholder='nombre hotel'/></label>
            <label >Precio $    <input type="number" /></label>
            <label >Descripcion <textarea placeholder='descripcion'></textarea></label>
            <label >Fotos 
                <input type="file"
                        accept='image'
                        multiple
                />
            </label>
            <button className='btn-add'>Agregar</button>
        </form>
    </div>
  )
}

export default AddProduct