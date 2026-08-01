import React from "react";
import entrada from "../../assets/entrada.png"; //Recuerda que esto desaparecera en el futuro
import { Link } from "react-router-dom";
import "./HotelCard.css";

const HotelCard = () => {
  return (
    <div className="hotel-card">
      <div className="tittle">
        <h2>Nombre hotel</h2>
        <Link to="/">Volver</Link>
      </div>

      <div className="description">
        <p>id</p>
        <p>Descripcion</p>
        <p>costo</p>
      </div>
        <div className="btn"><button>ir a galeria</button></div>
      {/* esto va a salir solo si pulsa  el boton de arriba */}
      <div className="galery-card">
        <div className="main">
          <img src={entrada} alt="" />
      </div>

        <div className="others">
          <img src={entrada} alt="" />
          <img src={entrada} alt="" />
          <img src={entrada} alt="" />
          <img src={entrada} alt="" />
        </div>
      </div>
      <div className="btn"><button>Ver todas las fotos</button></div>
      {/*hacer que solo aprexca cuando se habra la galeria del boton de arriba*/}
      {/* esto va a salir solo si pulsa  el boton de arriba */}
      <div className="galery-complete">
        <img src={entrada} alt="" />
        <img src={entrada} alt="" />
        <img src={entrada} alt="" />
        <img src={entrada} alt="" />
        <img src={entrada} alt="" />
        <img src={entrada} alt="" />
        <img src={entrada} alt="" />
        <img src={entrada} alt="" />
        <img src={entrada} alt="" />
      </div>
    </div>
  );
};

export default HotelCard;
