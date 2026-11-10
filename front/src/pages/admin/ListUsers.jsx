import React from "react";
import "./ListProduct.css";

const ListUsers = ({ users = [] , onDelete, onChangeRol}) => {
  const copyList = users ? [...users] : [];

  return (
    <div className="list-admin">
      {!copyList || copyList.length === 0 ? (
        <p>No Hay Usuarios Listados</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {copyList.map((u) => (
                <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.lastName}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                        <button className="btn-delete"
                         onClick={() => onDelete && onDelete(u.id)}
                        >Eliminar</button>
                        <button className="btn-rol"
                          onClick={()=> onChangeRol && onChangeRol(u.id,u.role)}
                        >Cambiar Rol</button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListUsers;
