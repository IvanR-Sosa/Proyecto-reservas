package com.example.back.service;

import com.example.back.controller.HotelDTO;
import com.example.back.entities.Hotel;
import com.example.back.persistence.IHotelDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HotelServiceImpl implements IHotelService {
    @Autowired
    private IHotelDAO hotelDAO;
    @Override
    public List<Hotel> findAll() {
        return hotelDAO.findAll();
    }

    @Override
    public List<HotelDTO> findAllDTO() {
        return hotelDAO.findAll().stream()
                .map(h ->{
                   return mapToDto(h);
                })
                .toList();
    }

    @Override
    public Optional<Hotel> findbyId(Long id) {
        return hotelDAO.findById(id);
    }

    @Override
    public HotelDTO finByIdDTO(Long id) {
        Hotel hotel = hotelDAO.findById(id)
                .orElseThrow(()->new RuntimeException("Hotel No encontrado"));
        return mapToDto(hotel);
    }

    @Override
    public void save(HotelDTO hotelDTO) {
        /*
        Esta parte sera la base para editar el objeto ya que tuve algunos inconvenientes de duplicdo
        de la ruta de las imagenes al hacer el update
         */
        if (hotelDTO.getId() != null){
            //Buscamos el registro en la bd
            Hotel hotelExist = hotelDAO.findById(hotelDTO.getId())
                    .orElseThrow(()->new RuntimeException("Hotel No encontrado"));

            //Hacemos el mapeo del HotelDTO a entidad
            Hotel hotel = mapToHotel(hotelDTO);
            hotel.setId(hotelDTO.getId());
            //Esta URL servira para los condicionales y evitar los duplicados
            String baseURL = "http://localhost:8081/uploads/";
            //Acontinuacion haremos que no se duplique la ruta en caso de no editar mainIMG
            if(hotelDTO.getMainImg()==null){
                //Caso que react envie null
                hotel.setMainImg(hotelExist.getMainImg());
            } else if (hotelDTO.getMainImg().startsWith(baseURL)) {
                String cleanImg = hotelDTO.getMainImg().replace(baseURL, "");
                hotel.setMainImg(cleanImg);
            }

            //logica para othersImg
            if (hotelDTO.getOthersImg()==null){
                hotel.setOthersImg(hotelExist.getOthersImg());
            }else{
                //Si vienen Urls viejas o mezcladas las limpiamos
                List<String> cleanListImg =new ArrayList<>();
                for (String img : hotelDTO.getOthersImg()){
                    if(img.startsWith(baseURL)){
                        cleanListImg.add(img.replace(baseURL,""));
                    }else{
                        cleanListImg.add(img);
                    }
                }
                hotel.setOthersImg(cleanListImg);
            }
            hotelDAO.save(hotel);
        }else{
        Hotel hotel = mapToHotel(hotelDTO);
        hotelDAO.save(hotel);
        }
    }

    @Override
    public void deleteById(Long id) {
        hotelDAO.deleteById(id);
    }

    @Override
    public List<HotelDTO> topHotels() {
        List<HotelDTO> topList = new ArrayList<>(findAllDTO());
        topList.sort(Comparator.comparing(HotelDTO::getGoodAverage,
                Comparator.nullsLast(Double::compare))
                .reversed());
        return topList.stream()
                .limit(5)
                .collect(Collectors.toList());
    }


    private HotelDTO mapToDto(Hotel hotel){

        String baseUrl ="http://localhost:8081/uploads/";
        String mainImgUrl =(hotel.getMainImg() != null) ? baseUrl + hotel.getMainImg() : null;

        List<String> othersImgUrl = new ArrayList<>();
        if (hotel.getOthersImg() != null) {
            for (String img : hotel.getOthersImg()) {
                othersImgUrl.add(baseUrl + img);
            }
        }
        return HotelDTO.builder()
                .id(hotel.getId())
                .name(hotel.getName())
                .description(hotel.getDescription())
                .goodAverage(hotel.getGoodAverage())
                .price(hotel.getPrice())
                .route(hotel.getRoute())
                .mainImg(mainImgUrl)
                .othersImg(othersImgUrl)
                .build();
    }
    private Hotel mapToHotel (HotelDTO hotelDTO){
        return Hotel.builder()
                .name(hotelDTO.getName())
                .description(hotelDTO.getDescription())
                .goodAverage(hotelDTO.getGoodAverage())
                .price(hotelDTO.getPrice())
                .route(hotelDTO.getRoute())
                .mainImg(hotelDTO.getMainImg())
                .othersImg(hotelDTO.getOthersImg())
                .build();
    }
}
