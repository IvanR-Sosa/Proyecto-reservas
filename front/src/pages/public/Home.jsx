import React, { useEffect, useMemo, useState } from "react";
import "./Home.css";
import Hotels from "../hotel/Hotels";
import { getAll, getTopHotels } from "../../service/ApiHotel";
import Pagination from "../../Components/Pagination";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Home = () => {
  const [listHotels, setListHotels] = useState([]);
  const [topHotels, setTopHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("name");
  const [filterId, setfilterId] = useState("");
  const [filterName, setfilterName] = useState("");
  const [filterRoute, setfilterRoute] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const allData = await getAll();
      const dataTop = await getTopHotels();
      setTopHotels(dataTop);
      // Verificamos que filtro se activo y en base a eso filtramos desde allData
      if (selectedFilter === "id" && filterId.trim() !== "") {
        // Forzamos que ambos lados sean strings o números para evitar fallos de tipo
        const filtered = allData.filter(
          (h) => String(h.id) === String(filterId),
        );
        setListHotels(filtered);
      }else if(selectedFilter === "name" && filterName.trim() !== ""){
        const filtered = allData.filter(
          (h) => String(h.name).toLowerCase().includes(filterName.toLowerCase()),
        );
        setListHotels(filtered);
      }else if(selectedFilter === "route" && filterRoute.trim() !== ""){
        const filtered = allData.filter(
          (h) => String(h.route).toLowerCase().includes(filterRoute.toLowerCase()),
        );
        setListHotels(filtered);
      }else {
        // Si no hay filtro, mostramos todos
        const sortList = shuffleArray(allData);
        setListHotels(sortList);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  //creacion metodos para filtrar
  const handleSearch = async (e) => {
    e.preventDefault(); // Detiene la recarga de la pantalla
    await fetchHotels(); // Ejecuta el filtrado
  };

  //Creacion de las constantes para paginacion
  const itemsPerPage = 5;//puede variar a gusto
  const finalIndex = currentPage*itemsPerPage;
  const firstIndex = finalIndex - itemsPerPage;
    //Lista rebanada 
  let paginatedHotels = useMemo(()=>
    {return listHotels.slice(firstIndex,finalIndex)}, [listHotels,firstIndex,finalIndex]);


  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="home">
      <div className="search-home">
        <form>
          <label>Buscar por:</label>
          <div className="areas-search">
            <select 
            onChange={(e) => setSelectedFilter(e.target.value)}>
              <option value="name">Nombre</option>
              <option value="id">ID</option>
              <option value="route">Ruta</option>
            </select>
            {selectedFilter === "id" && (
              <input
                type="text"
                placeholder="ID"
                value={filterId}
                onChange={(e) => setfilterId(e.target.value)}
              />
            )}

            {selectedFilter === "name" && (
              <input
                type="text"
                placeholder="NOMBRE"
                value={filterName}
                onChange={(e) => setfilterName(e.target.value)}
              />
            )}

            {selectedFilter === "route" && (
              <input
                type="text"
                placeholder="RUTA"
                value={filterRoute}
                onChange={(e) => setfilterRoute(e.target.value)}
              />
            )}

          </div>
          <button onClick={handleSearch}>Buscar</button>
        </form>
      </div>

      <div className="products-home">
        <h2>Hoteles disponibles</h2>

        {loading ? (
          <p>Cargando hoteles ....</p>
        ) : (
          <Hotels dataList={paginatedHotels} />
        )}
        <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={listHotels.length} />
      </div>
      <div className="top-products-home">
        <h2>El top de nuestros hoteles</h2>
        {loading ? (
          <p>Cargando hoteles ....</p>
        ) : (
          <Hotels dataList={topHotels} />
        )}
      </div>
    </div>
  );
};

export default Home;
