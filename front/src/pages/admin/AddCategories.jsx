import React, { useState } from 'react'
import "./AddProduct.css";

const AddCategories = ({onAdd}) => {

    const [category, setCategory] = useState(
        {
            tittle:"",
            description:"",
            imgUrl:""
        }
    )

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setCategory((prevData)=>({
            ...prevData,
            [name]:value,
        }))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
             const { tittle, description, imgUrl } = category; // Es buena práctica destructurar

        if (!tittle || !description || !imgUrl) {
            alert("Por favor completa todos los campos");
            return;
        }
            await onAdd(category);
            alert('Categoria cargada exitosamente');
            setCategory({
                tittle:"",
                description:"",
                imgUrl:""
            })
        } catch (error) {
            console.error('Error en la carga de la categoria');
            alert('No se pudo crear la categoria');
        }
    }
  return (
    <div className='add-admin'>
        <h2>Agregar Categoria</h2>
        <form onSubmit={handleSubmit}>
            <label >
                Titulo{" "}
                <input type="text"
                name='tittle'
                value={category.tittle}
                onChange={handleChange}
                placeholder='Ingrese el titulo de la nueva categoria' />
            </label>

             <label >
                Descripcion:{" "}
                <textarea 
                name='description'
                value={category.description}
                onChange={handleChange}
                placeholder='Ingrese una breve descripcion de la nueva categoria'
                rows="3"
                />
            </label>
           
             <label >
                Imagen de Referencia:{" "}
                <input type="text"
                name='imgUrl'
                value={category.imgUrl}
                onChange={handleChange}
                placeholder='Ingrese la URL de la imagenescogida' />
            </label>
            
            <button type='submit' className="btn-add" >Crear</button>

        </form>
    </div>
  )
}

export default AddCategories