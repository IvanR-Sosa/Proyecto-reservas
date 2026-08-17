import React, { useMemo } from 'react'
import './Pagination.css'

const Pagination = ({currentPage,setCurrentPage,itemsPerPage,totalItems}) => {
    // calcular cuantas paginas van a salir
    const totalPages = useMemo(() => 
        Math.ceil(totalItems/itemsPerPage),
     [totalItems,itemsPerPage]);
     //Manejar los cambios de pagina
     const changePage = (newPage) =>{
        if(newPage > 0 && newPage <= totalPages){
            setCurrentPage(newPage);
        }
     };
     //No Mostrar esto si solo sale 1 pagina
     if(totalPages <= 1) return null;
  return (
    <div className='pagination'>
        <button onClick={()=> changePage(currentPage-1)} disabled={currentPage===1} >Anterior</button>
        <p>{currentPage}</p>
        <button onClick={()=>changePage(currentPage+1)}  disabled={currentPage === totalPages}>Siguiente</button>
    </div>
  )
}

export default Pagination