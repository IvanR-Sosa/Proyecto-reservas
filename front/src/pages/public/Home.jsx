import React, { useEffect, useState } from "react";
import "./Home.css";
import Hotels from "../hotel/Hotels";
import { getAll, getTopHotels } from "../../service/ApiHotel";

const Home = () => {
  const [listHotels, setListHotels] = useState([]);
  const [topHotels, setTopHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("name");
  const [filterId, setfilterId] = useState("");
  const [filterName, setfilterName] = useState("");
  const [filterRoute, setfilterRoute] = useState("");

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
          (h) => String(h.route).toLowerCase() === String(filterRoute.toLowerCase()),
        );
        setListHotels(filtered);
      }else {
        // Si no hay filtro, mostramos todos
        setListHotels(allData);
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
                value={filterId}
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
          <Hotels dataList={listHotels} />
        )}
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
