import React, { useState } from 'react'

const EditCategory = ({category , onSaveCategory}) => {

    const [formData, setformData] = useState({...category})

    const handleChange = (e) => {
        const{name,value} = e.target;
        setformData((prevData) =>({
            ...prevData,
            [name]:value,
        }))
        
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSaveCategory(formData);
        
    }
  return (
     <div className='add-admin'>
        <h2>Editar Categoria</h2>
        <form onSubmit={handleSubmit}>
            <label >
                Titulo{" "}
                <input type="text"
                name='tittle'
                value={formData.tittle}
                onChange={handleChange}
                 />
            </label>

             <label >
                Descripcion:{" "}
                <textarea 
                name='description'
                value={formData.description}
                onChange={handleChange}
                rows="3"
                />
            </label>
           
             <label >
                Imagen de Referencia:{" "}
                <input type="text"
                name='imgUrl'
                value={formData.imgUrl}
                onChange={handleChange}
                placeholder='Ingrese la URL de la imagen escogida' />
            </label>
            
            <button type='submit' className="btn-add" >Editar</button>

        </form>
    </div>
  )
}

export default EditCategory