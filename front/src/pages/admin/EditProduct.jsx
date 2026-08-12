import React, { useState } from "react";
import "./addProduct.css";

const EditProduct = ({ hotel, onSave }) => {
  const [formData, setFormData] = useState({ ...hotel });
  const [newMainImg, setNewMainImg] = useState(null);
  const [newOthersImg, setNewOthersImg] = useState(null);

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
      const file = files[0]
      if(file){
        const imgUrl = URL.createObjectURL(file);
        setNewMainImg(imgUrl);
      }
    }
    if (name === "othersImg"){ 
      const filesArray = Array.from(files);
      const imgUrls = filesArray.map((f)=> URL.createObjectURL(f));
      setNewOthersImg(imgUrls);
      }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      mainImg: newMainImg || null,
      othersImg: newOthersImg || null,
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
        <button type="submit" className="btn-add">
          Editar
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
