import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import '../public/Login.css'


const Profile = () => {

    const [edit, setEdit] = useState(false);
    const [userChange, setUserChange] = useState();
    const [newPassword,setNewPassword] = useState('');


    const {user,loading} = useContext(AuthContext);
    if(loading) return <div>Cargando Datos</div>;
    if(!user) return <div>Sin usuario logueado</div>;

    const fetchUser = async () => {
        try {
            //aqui debera hacerse un llamado que traiga los datos de usuario y los setee
        } catch (error) {
            console.error('No Se pudo traer la informacion de usuario')
        }
    }
    useEffect(() => {
      fetchUser();
    }, []);

    const handleSave = async () => {
        //aqui ira una const que sette los cambios en el usuario un dataToSend
        const dataToSend = {...userChange};
        if(newPassword) dataToSend.password = newPassword;
    }
    const handleDelete = async () => {
        
    }
    

  return (
    <div className='login'>
        <div className="form">
            <h2>Nombre Del Usuario</h2>

        <label >
            Nombre:
            <input type="text" 
            value={user.name}
            disabled={!edit}
            onChange={''}/>
        </label>
        <label >
            Apellido:
            <input type="text" 
            value={user.lastName}
            disabled={!edit}
            onChange={''}/>
        </label>
        <label >
            Correo Electronico:
            <input type="email" 
            disabled={!edit}
            onChange={''} />
        </label>
        {/*Solo no podra ser vista */}
        <label >
            Nueva contraseña:
            <input type="password" 
            value={'password'}
            placeholder='Deja vacio para no cambiar'
            onChange={''} />
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