import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import '../public/Login.css'
import { deleteUserApi, updateUserApi } from '../../service/ApiUser';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './ChangePassword';


const Profile = () => {

    const [edit, setEdit] = useState(false);
    const [userChange, setUserChange] = useState({});
    const [changePassword, setChangePassword] =useState(false);
    const navigate =useNavigate();
    const {user,loading,logout,setUser} = useContext(AuthContext);
    

    useEffect(() => {
      if(user){
        setUserChange({
            name:user.name,
            lastName:user.lastName,
        })
      }
    }, [user]);

    if(loading) return <div>Cargando Datos</div>;
    if(!user) return <div>Sin usuario logueado</div>;

    //Manejador para los inputs
    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setUserChange(prev => ({
            ...prev,
            [name]:value
        }))
    }

    const handleSave = async (e) => {
        if(e) e.preventDefault();
        try {
             const dataToSend = { 
                id : user.id,
                name: userChange.name,
                lastName: userChange.lastName,
                rol: user.rol // Mantenemos el rol original
            };
            const updateFromBack =await updateUserApi(user.id,dataToSend);

            const updateUserSession ={
                ...user,
                ...updateFromBack,
                rol : user.rol
            }
            setUser(updateUserSession);
            sessionStorage.setItem("session_user",JSON.stringify(updateUserSession));

            alert('Perfil Actualizado Correctamente');
            setEdit(false);

        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            alert('No se pudo actualizar el perfil');
        }
    }
    const handleDelete = async () => {
        if(window.confirm('¿Seguro de eliminar su perfil de usuario?')){
           try {
                await deleteUserApi(user.id);
                logout();
                navigate('/login'); // Redirigir al login tras eliminar
            } catch (error) {
                console.error('Error al eliminar cuenta:', error);
                alert('No se pudo eliminar la cuenta');
            }
        }
    }
    

  return (
    
    <div className='login'>
        <div className="form">
            <h2>Nombre Del Usuario</h2>

      <label>
    Nombre:
    <input 
        type="text" 
        name="name"
        value={userChange.name || ''}
        disabled={!edit} 
        onChange={handleInputChange}
    />
</label>

<label>
    Apellido:
    <input 
        type="text" 
        name="lastName"
        value={userChange.lastName || ''}
        disabled={!edit} 
        onChange={handleInputChange}
    />
</label>

        <label >Rol : {user.rol}</label>
        <div className='btn-edit'>
            {!edit ? (
                <button onClick={()=>setEdit(true)}>Editar perfil</button>
            ):(
                <button onClick={handleSave}>Guardar Cambios</button>
            )}
        <button onClick={() => setChangePassword(!changePassword)}>Cambiar contraseña</button>
        </div>
        <div className="btn-delete">
            <button onClick={handleDelete}>Eliminar cuenta</button>
        </div> 
        </div>
        {changePassword && <ChangePassword/>}
    </div>
    
    
  )
}

export default Profile