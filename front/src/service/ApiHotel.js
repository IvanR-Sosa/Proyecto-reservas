import { dataHotels } from '../fakeFile/dataHotels'

// los setTimeOut Los puedo quitar despues por el momentos son solo pruebas
export const getAll =async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dataHotels.sort(()=>Math.random()-0.5))
        },500)
    })
}
export const getTopHotels =(async (attribute ='goodAverage',limit =5) => {
    return new Promise((resolve) =>{
       setTimeout(() => {
            const copyList = [...dataHotels];
            copyList.sort((a,b) => {
                return b[attribute] - a[attribute];
            });
            resolve(copyList.slice(0,limit));
        },500)
    })
    
})
export const findById = async (id) => {
    const hotel = dataHotels.find(h=>h.id===Number(id));
    return hotel || undefined;
}

export const addHotel = async (hotel) => {
   const newHotel = {
    ...hotel,
    id:dataHotels.length+1
   }
   dataHotels.push(newHotel);
}
export const deleteHotel = async (id) => {
    const hotels = dataHotels.filter(h=>h.id !== id);
    dataHotels.length=0
    dataHotels.push(...hotels)
    console.log(dataHotels.length)
    
}

export const updateHotel = async (hotel) => {
    const index = dataHotels.findIndex(h => h.id === hotel.id);
    if (index !== -1){
        dataHotels[index] = hotel;
    }else{
        console.error('Hotel no encontrado')
        return
    }
}