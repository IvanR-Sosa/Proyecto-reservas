import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import '../public/Login.css'
import { deleteUser, updateUser } from '../../service/ApiUser';
import { useNavigate } from 'react-router-dom';


const Profile = () => {

    const [edit, setEdit] = useState(false);
    const [userChange, setUserChange] = useState({});
    const [newPassword,setNewPassword] = useState('');

    const navigate =useNavigate();
    const {user,loading,logout,setUser} = useContext(AuthContext);
    

    useEffect(() => {
      if(user){
        setUserChange({
            name:user.name,
            lastName:user.lastName,
            email:user.email
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
            const dataToSend = {...userChange,rol:user.rol};
            if(newPassword.trim() !== ''){
                dataToSend.password = newPassword;
            }else{
                dataToSend.password = user.password;
            }
            await updateUser(user.id,dataToSend);
            setUser(dataToSend)
            alert('Perfil Actualizado Correctamente');
            setEdit(false);
            setNewPassword('');
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            alert('No se pudo actualizar el perfil');
        }
    }
    const handleDelete = async () => {
        if(window.confirm('¿Seguro de eliminar su perfil de usuario?')){
           try {
                await deleteUser(user.id);
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
        value={userChange.name} 
        disabled={!edit} 
        onChange={handleInputChange}
    />
</label>

<label>
    Apellido:
    <input 
         type="text" 
        name="lastName"
        value={userChange.lastName } 
        disabled={!edit} 
        onChange={handleInputChange}
    />
</label>

<label>
    Correo Electrónico:
    <input 
        type="email" 
        name="email"
        value={userChange.email} 
        disabled={!edit} 
        onChange={handleInputChange}
    />
</label>

<label>
    Nueva contraseña:
    <input 
        type="password" 
        value={newPassword}
        placeholder="Deja vacio para no cambiar"
        onChange={(e) => setNewPassword(e.target.value)}
        disabled={!edit}
    />
</label>
        <label >Rol : {user.rol}</label>

        <div className='btn-edit'>
            {!edit ? (
                <button onClick={()=>setEdit(true)}>Editar perfil</button>
            ):(
                <button onClick={handleSave}>Guardar Cambios</button>
            )}

        </div>
        <div className="btn-delete">
            <button onClick={handleDelete}>Eliminar cuenta</button>
        </div>    
        </div>
        
    </div>
  )
}

export default Profile