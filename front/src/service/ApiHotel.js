import axios from "axios";


const baseUrlHotel = "http://localhost:8081/api/Hotel";

export const getAll = async () => {
  try {
    const response = await axios.get(`${baseUrlHotel}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos", error);
    throw error;
  }
};
export const getTopHotels = async (attribute = "goodAverage", limit = 5) => {
 try {
    const response = await axios.get(`${baseUrlHotel}/top`);
    return response.data;
 } catch (error) {
    console.error("Error al obtener los datos", error);
    throw error;
 }
};
export const findById = async (id) => {
  try {
    const response = await axios.get(`${baseUrlHotel}/${id}`);
    return response.data
  } catch (error) {
    console.error("Error al obtener los datos", error);
    throw error;
  }
};

export const addHotel = async (hotel) => {
  try {
    const allHotels =await getAll();
    const existHotelName = allHotels.some(h => h.name === hotel.name);

    if(existHotelName){
        alert('Nombre de hotel ya existe')
        return
    }
    const response = await axios.post(`${baseUrlHotel}/save`,hotel,{
        headers:{'Content-Type': 'application/json'}
    })
     console.log("Hotel agregado exitosamente", response.data);

  } catch (error) {
    console.error("Error al enviar los datos", error);
    throw error;
  }
};



export const deleteHotel = async (id) => {
try {
  const response = await axios.delete(`${baseUrlHotel}/delete/${id}`);
} catch (error) {
  console.error("No se pudo eliminar el Hotel-->".error)
  alert("Error al eliminar el hotel")
}
};



export const updateHotel = async (hotel) => {
  try {
    const response = await axios.put(`${baseUrlHotel}/update/${hotel.id}`,hotel,{
         headers:{'Content-Type': 'application/json'}
    })
  } catch (error) {
     console.error("Error al enviar los datos", error);
    throw error;
  }
};

//funcion que permitira que al cargar imagenes se suban correctamente al sistema

export const uploadImgs = async (file) => {
    let formData = new FormData();
    formData.append("file",file);// este nombre debe coincidir con el back

    const response = await axios.post(`${baseUrlHotel}/upload`,formData,{
        headers:{'Content-Type':"multipart/form-data"}
    })
    // el servidor por el momento no devolvera el nombre del archivo (ej img7.png)
    return response.data;
    
}
