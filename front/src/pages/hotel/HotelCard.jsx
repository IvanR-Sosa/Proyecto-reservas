import React, { useEffect, useState } from "react";
import img0 from "../../assets/img0.png"; //Recuerda que esto desaparecera en el futuro
import { Link, useParams } from "react-router-dom";
import "./HotelCard.css";
import { findById } from "../../service/ApiHotel";

const HotelCard = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState();
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [showGallery, setshowGallery] = useState(false);
  const [showAllGallery, setshowAllGallery] = useState(false);

  const fetchHotel = async (params) => {
    setLoading(true);
    try {
      const dataHotel = await findById(id);
      setHotel(dataHotel);
      if (dataHotel && dataHotel.othersImg) {
        const copyGalery = dataHotel.othersImg.sort(() => Math.random() - 0.5);

        setGallery(copyGalery.slice(0, 4));
      }
    } catch (error) {
      console.error("Error al cargar los hoteles ::>  ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [id]);

  const handleGallery = async () => {
    setshowGallery(!showGallery);
  };
  const changeAllGallery = async () => {
    setshowAllGallery(!showAllGallery);
  };

  if (loading) {
    return <p>Caargando detalles del hotel.....</p>;
  }
  if (!hotel) {
    return <p>Hotel no disponible....</p>;
  }

  return (
    <div className="hotel-card">
      <div className="tittle">
        <h2>{hotel.name}</h2>
        <Link to="/">Volver</Link>
      </div>
      <div className="description">
        <p>ID: {hotel.id}</p>
        <p>Descripcion: {hotel.description}</p>
        <p>Precio por habitacion: $ {hotel.price}</p>
        <p>Porcentaje de aprobacion : 👍 {hotel.goodAverage}</p>
        <p>Ruta de ubicacion: {hotel.route}</p>
      </div>
      <div className="btn" onClick={handleGallery}>
        <button>ir a galeria</button>
      </div>
      {/* esto va a salir solo si pulsa  el boton de arriba */}
      {showGallery && (
        <div className="galery-card">
          <div className="main">
            <img src={hotel.mainImg} alt="" />
          </div>

          <div className="others">
            {gallery.map((h, index) => (
              <img key={index} src={h} alt="" />
            ))}
          </div>
        </div>
      )}
      {showGallery && 
        <div className="btn" onClick={changeAllGallery}>
          <button>Ver todas las fotos</button>
        </div>
        
      }
      {/*hacer que solo aprexca cuando se habra la galeria del boton de arriba*/}
      {/* esto va a salir solo si pulsa  el boton de arriba */}
      {showAllGallery && 
        <div className="galery-complete">
          {hotel.othersImg.map((h, index) => (
            <img key={index} src={h} alt="" />
          ))}
        </div>
      }
    </div>
  );
};

export default HotelCard;
