import React from "react";
import "./ListProduct.css";

const ListProducts = () => {
  return (
    <div className="list-admin">
      <table>
        <thead>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio habitacion</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Hotel1</td>
            <td>$25.3</td>
            <td>
               <button className="btn-edit">editar</button> <button className="btn-delete">Eliminar</button>
            </td>
          </tr>
           <tr>
            <td>1</td>
            <td>Hotel1</td>
            <td>$25.3</td>
            <td>
               <button className="btn-edit">editar</button> <button className="btn-delete">Eliminar</button>
            </td>
          </tr>
           <tr>
            <td>1</td>
            <td>Hotel1</td>
            <td>$25.3</td>
            <td>
               <button className="btn-edit">editar</button> <button className="btn-delete">Eliminar</button>
            </td>
          </tr>
           <tr>
            <td>1</td>
            <td>Hotel1</td>
            <td>$25.3</td>
            <td>
               <button className="btn-edit">editar</button> <button className="btn-delete">Eliminar</button>
            </td>
          </tr>
           <tr>
            <td>1</td>
            <td>Hotel1</td>
            <td>$25.3</td>
            <td>
              <button className="btn-edit">editar</button> <button className="btn-delete">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListProducts;
