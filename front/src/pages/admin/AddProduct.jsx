import React, { useState } from "react";
import "./AddProduct.css";
import { uploadImgs } from "../../service/ApiHotel";
import { getAllIcons, getIconByKey } from "../../utils/IconList";

const AddProduct = ({ onAdd }) => {
  const [hotel, setHotel] = useState({
    name: "",
    description: "",
    goodAverage: "",
    price: "",
    route: "",
    mainImg: null,
    othersImg: [],
  });
  //useState que manejara las caracteristicas
  const [selectedIcons, setSelectedIcons] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "mainImg") {
      const file = files[0];
      if (file) {
        // almacenamos el archivo como tal para enviarlo al servidor
        setHotel((prev) => ({ ...prev, mainImg: file }));
      }
    } else if (name === "othersImg") {
      // almacenamos el archivo como tal para enviarlo al servidor
      const filesArray = Array.from(files);
      setHotel((prev) => ({ ...prev, othersImg: filesArray }));
    }
  };
  const toggleIcon = (iconKey) => {
    setSelectedIcons((prev) => {
      if (prev.includes(iconKey)) {
        return prev.filter((key) => key !== iconKey);
      }
      return [...prev, iconKey];
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // estas variables guardaran los NOMBRES(texto) de las imagens
      let mainImgName = hotel.mainImg;
      let othersImgNames = hotel.othersImg;

      if (hotel.mainImg instanceof File) {
        try {
          console.log("Subiendo la imagen principal");
          mainImgName = await uploadImgs(hotel.mainImg);
          console.log("Imagen principal subida. Nombre--->", mainImgName);
        } catch (error) {
          console.error("Error al subir la imagen principal", error);
          alert("Error al subir la imagen Principal");
        }
      }
      if (hotel.othersImg && hotel.othersImg.length > 0) {
        if (hotel.othersImg[0] instanceof File) {
          try {
            console.log("Subiendo imágenes secundarias...");
            // Subimos todas en paralelo para ser más rápidos
            const uploadedNames = await Promise.all(
              hotel.othersImg.map((file) => uploadImgs(file)),
            );
            othersImgNames = uploadedNames;
            console.log("Imágenes secundarias subidas:", othersImgNames);
          } catch (error) {
            console.error("Error al subir imágenes secundarias", error);
            alert("Error al subir imágenes secundarias.");
            return;
          }
        }
      }

      const hotelData = {
        ...hotel,

        mainImg: mainImgName,
        othersImg: othersImgNames,
        goodAverage: parseFloat(hotel.goodAverage),
        price: parseFloat(hotel.price),
        features: selectedIcons,
      };
      console.log("Datos finales para cargar --> ", hotelData);

      await onAdd(hotelData);
      alert(`Hola ¡${hotelData.name} ! datos cargados exitosamente`);
      setHotel({
        name: "",
        description: "",
        goodAverage: "",
        price: "",
        route: "",
        mainImg: null,
        othersImg: [],
      });
      setSelectedIcons([]);
    } catch (error) {
      console.error("Falla en la carga:", error);
      alert("Hubo un error al guardar el hotel. Revisa la consola.");
    }
  };

  //Lamado aa catalogo completo de iconos
  const iconList = getAllIcons();
  return (
    <div className="add-admin">
      <h2>Agregar Hotel</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre{" "}
          <input
            type="text"
            name="name"
            value={hotel.name}
            onChange={handleChange}
            placeholder="nombre hotel"
          />
        </label>
        <label>
          Precio ${" "}
          <input
            type="number"
            name="price"
            value={hotel.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Porcentaje positivo{" "}
          <input
            type="number"
            name="goodAverage"
            value={hotel.goodAverage}
            onChange={handleChange}
          />
        </label>
        {/*Este dato en un futuro podra ser calculado automaticamente */}
        <label>
          Descripcion{" "}
          <textarea
            name="description"
            value={hotel.description}
            onChange={handleChange}
            placeholder="descripcion"
          ></textarea>
        </label>
        <label>
          Ruta{" "}
          <input
            name="route"
            value={hotel.route}
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
        <h3>Seleciona los Servicios </h3>
        <div className="features">
          {iconList.map((item) => {
            const IconComponent = getIconByKey(item.iconKey);
            const isSelected = selectedIcons.includes(item.iconKey);

            return (
              <div key={item.iconKey}>
                <input
                  type="checkbox"
                  id={item.iconKey}
                  checked={isSelected}
                  onChange={() => toggleIcon(item.iconKey)}
                />
                <label htmlFor={item.iconKey}>
                  {IconComponent && <IconComponent />}
                  {item.iconKey}
                </label>
              </div>
            );
          })}
        </div>
        <button type="submit" className="btn-add">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
