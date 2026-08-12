import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hotels.css";


const Hotels = ({dataList}) => {
  return (
    <div className="hotel-list">
      {!dataList || dataList.length === 0 ?(
        <p>No hay hoteles disponibles</p>
      ):(dataList.map((h)=>(
        <div key={h.id} className="basic-card">
        <h2>{h.name}</h2>
        <p>ID: {h.id}</p>
        <img src={h.mainImg} alt="" />
        <Link to={`/hotel_card/${h.id}`} >Mas informacion</Link>
      </div>)
      ))}
    </div>
  );
};

export default Hotels;
