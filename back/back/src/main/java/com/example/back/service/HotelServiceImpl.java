package com.example.back.service;

import com.example.back.controller.HotelDTO;
import com.example.back.entities.Features;
import com.example.back.entities.Hotel;
import com.example.back.persistence.IFeaturesDAO;
import com.example.back.persistence.IHotelDAO;
import jakarta.transaction.Transactional;
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
    @Autowired
    private IFeaturesDAO featuresDAO;

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
    @Transactional
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
            //llamamos al metodo que me permite settear las features
            hotel.setFeatures(processFeatures(hotelDTO.getFeatures()));
            hotelDAO.save(hotel);
        }else{
        Hotel hotel = mapToHotel(hotelDTO);
        //llamamos al metodo que me permite settear las features
        hotel.setFeatures(processFeatures(hotelDTO.getFeatures()));
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
        //Lista para que pueda mostrar las Features
        List<String> featuresNames = new ArrayList<>();
        if (hotel.getFeatures() != null) {
            featuresNames = hotel.getFeatures().stream()
                    .map(Features::getIconKey)
                    .collect(Collectors.toList());
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
                .features(featuresNames)
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

    //Metodo para manejar las Features
    private List<Features>  processFeatures (List<String> featuresList ){
        List<Features> featuresReturn = new ArrayList<>();
        if (featuresList != null){
            for (String name : featuresList){
                String cleanName = name.trim();
                Features featureDB = featuresDAO.findByName(cleanName);

                if (featureDB != null){//caso que si exista
                    featuresReturn.add(featureDB);
                }else{
                    //Si no existe creo el registro en la bd de Features y ese es el que voy a usar
                    Features newfeature = new Features();
                    newfeature.setIconKey(cleanName);
                    //Ahora creamos la feature guardada
                    Features saveFeature = featuresDAO.save(newfeature);
                    featuresReturn.add(saveFeature);
                }
            }
        }
        //con esto ya me asegure que el Hotel tenga una lista de Features como en la entidad
        return featuresReturn;
    }
}
