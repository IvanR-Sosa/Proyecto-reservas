import React from "react";
import "./ListProduct.css";

const ListProducts = ({listData,onDelete,onEdit}) => {
  const copyList = [...listData]
  copyList.sort((a,b)=>a.id - b.id);
  

  const changeDelete = async(id)=>{
    await onDelete(id);
  }

  return (
    <div className="list-admin">
      {!copyList || copyList.length === 0 ? (
        <p>No hay productos disponibles</p> 
      ):(<table>
        <thead>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio habitacion</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          {copyList.map((h)=>(
             <tr key={h.id}>
            <td>{h.id}</td>
            <td>{h.name}</td>
            <td>${h.price}</td>
            <td>
               <button className="btn-edit" onClick={()=>onEdit(h.id)} >editar</button> 
               <button onClick={()=>changeDelete(h.id)} className="btn-delete">Eliminar</button>
            </td>
          </tr>
          ))
           
          }
           
        </tbody>
      </table>)}
    </div>
  );
};

export default ListProducts;
