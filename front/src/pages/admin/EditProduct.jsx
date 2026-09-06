import React, { useEffect, useState } from "react";
import "./addProduct.css";
import { uploadImgs } from "../../service/ApiHotel";
import { getAllIcons, getIconByKey } from "../../utils/IconList";

const EditProduct = ({ hotel, onSave }) => {
  const [formData, setFormData] = useState({ ...hotel });
  const [newMainImg, setNewMainImg] = useState(null);
  const [newOthersImg, setNewOthersImg] = useState(null);
  const [selectedIcons, setSelectedIcons] = useState(() => {
    if (hotel && hotel.features) {
      return hotel.features.map(f => (typeof f === 'object' ? f.iconKey : f));
    }
    return [];
  });

   useEffect(() => {
    if (hotel) {
      setFormData({ ...hotel });
      if (hotel.features) {
        setSelectedIcons(hotel.features.map(f => (typeof f === 'object' ? f.iconKey : f)));
      } else {
        setSelectedIcons([]);
      }
    }
  }, [hotel]);

  console.log("Datos de features actuales: ", selectedIcons);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;

     if (name === "mainImg") {
      const file = files && files.length > 0 ? files[0] : null;
      setNewMainImg(file);
    }
     if (name === "othersImg") { 
      const filesArray = files && files.length > 0 ? Array.from(files) : null;
      setNewOthersImg(filesArray);
    }
  };

  //Funcion que ayudara a manejar la seleccion de los iconos para editar
 const toggleIcon = (iconKey) => {
    setSelectedIcons((prev) => { 
      if (prev.includes(iconKey)) {
        return prev.filter((key) => key !== iconKey);
      }
      return [...prev, iconKey];
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let mainImgName = null;
    let othersImgName = null;

    if(newMainImg instanceof File){
      try {
        console.log("Subiendo nueva imagen Principal")
        mainImgName = await uploadImgs(newMainImg);
        console.log("nueva imagen principal Subida con exito-->" , mainImgName);
      } catch (error) {
        console.error("Error al cargar la nueva imagen principal ---> ",error);
        alert("Error al cargar la nueva imagen principal");
      }
    }
    if(newOthersImg && newOthersImg.length >0){
      if(newOthersImg[0] instanceof File){
        try {
          const uploadNames = await Promise.all(
            newOthersImg.map(file => uploadImgs(file))
          );
          othersImgName = uploadNames;
        } catch (error) {
          console.error("Error al cargar las nueva imagenes secundarias ---> ",error);
          alert("Error al cargar las nueva imagenes secundarias");
        }
      }
    }
    
    const dataToSend = {
    id: formData.id,
    name: formData.name,
    price: formData.price,
    goodAverage: formData.goodAverage,
    description: formData.description,
    route: formData.route,
    // Aquí forzamos el valor: si no subió nada, es null.
    mainImg: mainImgName, 
    othersImg: othersImgName,
    features:selectedIcons,
  };
    await onSave(dataToSend);
  };

  return (
    <div className="add-admin">
      <h2>Editar Hotel</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="nombre hotel"
          />
        </label>
        <label>
          Precio ${" "}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Porcentaje positivo{" "}
          <input
            type="number"
            name="goodAverage"
            value={formData.goodAverage}
            onChange={handleChange}
          />
        </label>
        {/*Este dato en un futuro podra ser calculado automaticamente */}
        <label>
          Descripcion{" "}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="descripcion"
          ></textarea>
        </label>
        <label>
          Ruta{" "}
          <input
            name="route"
            value={formData.route}
            onChange={handleChange}
            placeholder="Ruta"
          ></input>
        </label>
        <label>
          Imagen Principal
          <input
            name="mainImg"
            onChange={handleFileChange}
            type="file"
            accept="image/*"
          />
        </label>
        <label>
          Fotos
          <input
            name="othersImg"
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            multiple
          />
        </label>
        {/*MAnejamos desde aqui el tema de las caracteristicas*/}
        <h3>Selecciona los servicios</h3>
        {/*MApeamos todos los iconos disponibles */}
        <div className="features">
          {getAllIcons().map((item)=>{
          const IconComponent = getIconByKey(item.iconKey);
          //Verificamos que este en nuestro estado
          const isSelected = selectedIcons.includes(item.iconKey);
          //Acontinuacion la parte de los select
          return(
            <div key={item.iconKey}>
              <input 
              type="checkbox"
              id={item.iconKey}
              checked={isSelected}
              onChange={()=>toggleIcon(item.iconKey)}
              />
              <label htmlFor={item.iconKey}>
                {IconComponent && <IconComponent/>}
                {item.iconKey}
                
              </label>
            </div>
          )

        })}
        </div>
        
        <button type="submit" className="btn-add">
          Editar
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
