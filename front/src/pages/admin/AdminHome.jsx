import React, { useEffect, useState } from "react";
import ListProducts from "./ListProducts";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import "./AdminHome.css";
import {
  addHotel,
  deleteHotel,
  getAll,
  updateHotel,
} from "../../service/ApiHotel";
import { changeRolUser, deleteUser, getAllUsers } from "../../service/ApiUser";
import ListUsers from "./ListUsers";

const AdminHome = () => {
  const [addBtn, setAddBtn] = useState(false);
  const [listBtn, setListBtn] = useState(false);
  const [listHotels, setListHotels] = useState([]);
  const [editState, setEditState] = useState(null);
  const [loading, setLoading] = useState(false);
  //listar usuarios
  const [listUsers, setListUsers] = useState([]);
  const [listUsersBtn, setListUsersBtn] = useState(false);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const [hotelsResult, userResult] = await Promise.allSettled([
        getAll(),
        getAllUsers()
      ])
      if(hotelsResult.status === "fulfilled"){
        setListHotels(hotelsResult.value);
      }else{
        console.error('Error en la carga de Hoteles ::> ',hotelsResult.reason);
        setListHotels([]);
      }
      if(userResult.status === 'fulfilled'){
        setListUsers(userResult.value);
      }else{
        console.error('Error al cargar los usuarios ::> ',userResult.reason)
        setListUsers([]);
      }
      
    } catch (error) {
      console.error("Error al cargar los hoteles ::>  ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  //funcion para manejar el elimnado de productos
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro de eliminar este Producto?")) {
      try {
        await deleteHotel(id);
        await fetchHotels(); // esto para que la lista sepa que se recargo
      } catch (error) {
        console.error("Error al eliminar el producto--->", error);
        alert("Error al eliminar prodicto");
      }
    }
  };
  //funcion para manejar el agregado de producto
  const handleAdd = async (newHotel) => {
    try {
      await addHotel(newHotel);
      await fetchHotels(); // Recargar la lista de hoteles
      setAddBtn(false);
      setListBtn(true); // para que en cuanto se añada nos muestre la lista
    } catch (error) {
      console.error("Error al agregar hotel--->", error);
    }
  };
  //funciones que permitiran editar producto
  const handleClickEdit = async (id) => {
    try {
      const hotelEdit = listHotels.find((h) => h.id === id);
      if (hotelEdit) {
        setEditState(hotelEdit);
        setAddBtn(false);
        setListBtn(false);
      } else if (editState === null) {
        console.error("hotel no encontrado");
      }
    } catch (error) {
      console.error("Falla en la busqueda-->", error);
    }
  };
  const handleSaveEdit = async (hotelToEdit) => {
    try {
      const originalHotel = listHotels.find((h) => h.id === hotelToEdit.id);
      if (!originalHotel) {
        alert("Error en  la edicion: hotel no encontrado");
        return;
      }
      const finalHotel = {
        ...hotelToEdit,
        mainImg: hotelToEdit.mainImg || originalHotel.mainImg,
        othersImg: hotelToEdit.othersImg || originalHotel.othersImg,
      };

      await updateHotel(finalHotel);
      await fetchHotels();
      setAddBtn(false);
      setListBtn(true); // para que en cuanto se edite nos muestre la lista
      setEditState(null);
    } catch (error) {}
  };

  //Funciones para manejar cambios en los usuarios
  const handleDeleteUser = async (id) => {
    if(window.confirm('¿Esta seguro de eliminar este usario?')){
      try {
        await deleteUser(id);
        await fetchHotels()
      } catch (error) {
        console.error('Error al eliminar este usuario -->' , error);
        alert('Error al elimina usuario')
      }
    }
  }
  const handleChangeRolUser = async (id) => {
    if(window.confirm('¿Esta Seguro de cambiar de Rol a este Usuario?')){
      try {
        await changeRolUser(id);
        await fetchHotels();
      } catch (error) {
        console.error('Error al cambiar de ROl ::> ',error);
        alert('No se pudo cambiar de rol correctamente')
      }
    }
    
  }

  const changePanel = async (stateBtn) => {
    if (stateBtn === "agregar") {
      setAddBtn(!addBtn);
      setListBtn(false);
      setListUsersBtn(false);
      setEditState(null);
    }
    if (stateBtn === "listar") {
      setListBtn(!listBtn);
      setAddBtn(false);
      setListUsersBtn(false);
      setEditState(null);
    }
    if (stateBtn === "listarUsers") {
      setListUsersBtn(!listUsersBtn);
      setListBtn(false);
      setAddBtn(false);
      setEditState(null);
    }
  };
  return (
    <div className="main-admin">
      <h1>Panel administrativo</h1>
      <div className="menu-admin">
        <button onClick={() => changePanel("listar")}>Listar Productos</button>
        <button onClick={() => changePanel("agregar")}>
          Agregar Productos
        </button>
        <button onClick={() => changePanel("listarUsers")}>
          Listar usuarios
        </button>
      </div>
      <div className="container-admin">
        {loading && <p>Cargando panel....</p>}
        {listBtn && (
          <ListProducts
            listData={listHotels}
            onDelete={handleDelete}
            onEdit={handleClickEdit}
          />
        )}
        {/*hacemos esto para que el boton de eliminar pueda acceder a esta funcion en el AdminHome */}
        {addBtn && <AddProduct onAdd={handleAdd} />}
        {editState && <EditProduct hotel={editState} onSave={handleSaveEdit} />}

        {/*listar usuarios */}
        {listUsersBtn &&(
           <ListUsers 
            users={listUsers} 
            onDelete={ handleDeleteUser}
            onChangeRol={handleChangeRolUser}
            />
        )}
      </div>
    </div>
  );
}

export default AdminHome;
