
import React from 'react'

const ListCategories = ({categories = [] , onDeleteCategory, onEdit}) => {
    const copyList = Array.isArray(categories) ? [...categories] : [];
    copyList.sort = ((a,b) =>a.id - b.id);

    const  changeDelete = async (id) => {
      await onDeleteCategory(id)
      
    }
  return (
    <div className="list-admin">
      {!copyList || copyList.length === 0 ? (
        <p>No hay Categorias disponibles</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {copyList.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.tittle}</td>
                <td>{c.description}</td>
                <td><img src={c.imgUrl} alt={'imagen de '+c.tittle} /></td>
                <td>
                  <button className="btn-edit" onClick={() => onEdit(c.id)}>
                    editar
                  </button>
                  <button
                    onClick={() => changeDelete(c.id)}
                    className="btn-delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ListCategories