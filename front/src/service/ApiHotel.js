import api from "./api"; // Cambiamos 'axios' por tu instancia centralizada con interceptor JWT

// Rutas relativas basadas en tu backend (Axios les antepone 'http://localhost:8081/api')
const PATH_HOTEL = "/hotels"; 
const PATH_CATEGORY = "/categories";

// =========================================================================
// ENDPOINTS PARA HOTELES (MÉTODOS GET LIBERADOS / POST, PUT, DELETE CON JWT)
// =========================================================================

export const getAll = async () => {
  try {
    
    const response = await api.get(PATH_HOTEL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los hoteles:", error);
    throw error;
  }
};

export const getTopHotels = async (attribute = "goodAverage", limit = 5) => {
 try {
    const response = await api.get(`${PATH_HOTEL}/top`);
    return response.data;
 } catch (error) {
    console.error("Error al obtener los hoteles top:", error);
    throw error;
 }
};

export const findById = async (id) => {
  try {
    const response = await api.get(`${PATH_HOTEL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el hotel con id ${id}:`, error);
    throw error;
  }
};

export const addHotel = async (hotel) => {
  try {
    const allHotels = await getAll();
    const existHotelName = allHotels.some(h => h.name === hotel.name);

    if (existHotelName) {
        alert('El nombre del hotel ya existe');
        return;
    }
    // Al usar 'api', este POST envía automáticamente el token JWT en el Header
    const response = await api.post(`${PATH_HOTEL}/save`, hotel);
    console.log("Hotel agregado exitosamente", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al guardar el hotel:", error);
    throw error;
  }
};

export const deleteHotel = async (id) => {
  try {
    // Al usar 'api', este DELETE envía automáticamente el token JWT en el Header
    await api.delete(`${PATH_HOTEL}/delete/${id}`);
    console.log("Hotel eliminado con éxito");
  } catch (error) {
    console.error("No se pudo eliminar el Hotel -->", error);
    alert("Error al eliminar el hotel");
    throw error;
  }
};

export const updateHotel = async (hotel) => {
  try {
    // Al usar 'api', este PUT envía automáticamente el token JWT en el Header
    await api.put(`${PATH_HOTEL}/update/${hotel.id}`, hotel);
    console.log("Hotel actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el hotel:", error);
    throw error;
  }
};

// Función para subir imágenes usando FormData y manteniendo el interceptor JWT
export const uploadImgs = async (file) => {
    try {
      let formData = new FormData();
      formData.append("file", file); // Debe coincidir con el @RequestParam("file") de Java

      const response = await api.post(`${PATH_HOTEL}/upload`, formData, {
          headers: { 'Content-Type': "multipart/form-data" } // Axios calculará los boundaries automáticamente
      });
      return response.data;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error;
    }
};

// =========================================================================
// ENDPOINTS PARA CATEGORÍAS DE HOTEL
// =========================================================================

export const getAllCategories = async () => {
  try {
    const response = await api.get(`${PATH_CATEGORY}/all`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    await api.post(`${PATH_CATEGORY}/save`, category);
    console.log("Categoría guardada con éxito");
  } catch (error) {
    console.error('Error al cargar categoria:', error);
    alert('No se pudo cargar la categoria');
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await api.delete(`${PATH_CATEGORY}/delete/${id}`);
    console.log("Categoría eliminada con éxito");
  } catch (error) {
    alert('No se pudo eliminar la categoría');
    console.error('Error para eliminar Categoria ::> ', error);
    throw error;
  }
};

export const updateCategory = async (cat) => {
   try {
      await api.put(`${PATH_CATEGORY}/update/${cat.id}`, cat);
      alert('¡¡¡Actualización de categoría exitosa!!!');
   } catch (error) {
      alert('No se pudo editar la categoría');
      console.error('Error al conectar con el back ::> ', error);
      throw error;
   }
};
