package com.example.back.hotel.config;



import com.example.back.hotel.entities.Category;
import com.example.back.hotel.entities.Hotel;
import com.example.back.hotel.repository.CategoryRepository;
import com.example.back.hotel.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataIntializer implements CommandLineRunner {

    @Autowired
     private HotelRepository hotelRepository;
    //Inyeccion de categorias
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (hotelRepository.count() > 0){
            System.out.println("La base de datos Ya tiene informacion cargada");
            return;
        }
        if(categoryRepository.count() > 0){
            System.out.println("La base de datos de  categorias Ya tiene informacion cargada");
            return;
        }

        System.out.println("CARGANDO LOS DATOS DE PRUEBA");
        //Creando categorias para ejemplo
        Category catHotel = Category.builder().tittle("Hotel")
                .description("Descanso en un espacio cerrado y confortable sin interrupciones externas ")
                .imgUrl("https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
                .build();
        Category catCottage = Category.builder()
                .tittle("Cabaña")
                .description("Un espacio muy cercano a lo familiar donde podras sentirte como en casa")
                .imgUrl("https://images.unsplash.com/photo-1589129140837-67287c22521b?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
                .build();
        categoryRepository.save(catHotel);
        categoryRepository.save(catCottage);
        List<Hotel> hoteles = Arrays.asList(
                Hotel.builder().name("Hotel Mara").description("a 100 metros de la carretera en el km 39 de la ruta 4").goodAverage(50.1).price(35.3).route("Ruta 2").mainImg("img1.jpg").othersImg(Arrays.asList("img1.jpg", "img2.jpg", "img4.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 2
                Hotel.builder().name("Hotel Real San José").description("Ubicado en el centro histórico con vista a las montañas").goodAverage(45.8).price(35.3).route("Ruta 4").mainImg("img1.jpg").othersImg(Arrays.asList("img1.jpg", "img2.jpg", "img4.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 3
                Hotel.builder().name("Posada del Camino").description("Estación de descanso ideal para viajeros y transportistas con amplio parqueadero").goodAverage(48.3).price(35.3).route("Ruta 2").mainImg("img4.jpg").othersImg(Arrays.asList("img4.jpg", "img2.jpg")).features(new ArrayList<>()).category(catCottage).build(),
// Hotel 4
                Hotel.builder().name("Hotel La Montaña").description("Entorno natural tranquilo a 5 km de la capital").goodAverage(49.2).price(35.3).route("Ruta 1").mainImg("img2.jpg").othersImg(Arrays.asList("img1.jpg", "img2.jpg", "img4.jpg")).features(new ArrayList<>()).category(catCottage).build(),
// Hotel 5
                Hotel.builder().name("Posada del Sol").description("Desayunos incluidos y vistas al Valle Central").goodAverage(46.5).price(35.3).route("Ruta 3").mainImg("img2.jpg").othersImg(Arrays.asList("img4.jpg", "img2.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 6
                Hotel.builder().name("Hotel Vista Mar").description("A solo 200 metros de la playa principal").goodAverage(52.1).price(35.3).route("Ruta 5").mainImg("img2.jpg").othersImg(Arrays.asList("img1.jpg", "img2.jpg")).category(catHotel).build(),
// Hotel 7
                Hotel.builder().name("Cabañas Los Pinos").description("Refugio de madera rodeado de bosque nativo").goodAverage(44.8).price(35.3).route("Ruta 2").mainImg("img2.jpg").othersImg(Arrays.asList("img4.jpg", "img1.jpg")).features(new ArrayList<>()).category(catCottage).build(),
// Hotel 8
                Hotel.builder().name("Hotel Central").description("En el corazón de la ciudad, cerca de todos los servicios").goodAverage(47.9).price(35.3).route("Ruta 1").mainImg("img2.jpg").othersImg(Arrays.asList("img2.jpg", "img4.jpg")).features(new ArrayList<>()).category(catCottage).build(),
// Hotel 9
                Hotel.builder().name("Hostal del Tránsito").description("Estacionamiento seguro y habitaciones de paso para camioneros").goodAverage(43.2).price(35.3).route("Ruta 4").mainImg("img1.jpg").othersImg(Arrays.asList("img2.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 10
                Hotel.builder().name("Resort El Paraíso").description("Complejo todo incluido con piscina infinita y spa").goodAverage(55.4).price(35.3).route("Ruta 5").mainImg("img1.jpg").othersImg(Arrays.asList("img4.jpg", "img1.jpg", "img2.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 11
                Hotel.builder().name("Hotel de los Andes").description("Arquitectura tradicional con calefacción y chimenea").goodAverage(51.0).price(35.3).route("Ruta 3").mainImg("img4.jpg").othersImg(Arrays.asList("img1.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 12
                Hotel.builder().name("Posada del Huerto").description("Desayunos orgánicos cultivados en el terreno").goodAverage(48.7).price(35.3).route("Ruta 2").mainImg("img4.jpg").othersImg(Arrays.asList("img2.jpg", "img4.jpg")).features(new ArrayList<>()).category(catCottage).build(),
// Hotel 13
                Hotel.builder().name("Hotel Estrella del Norte").description("Conferencias disponibles y alta velocidad de internet").goodAverage(49.5).price(35.3).route("Ruta 1").mainImg("img2.jpg").othersImg(Arrays.asList("img1.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 14
                Hotel.builder().name("Cabañas La Rivera").description("Acceso directo al río, ideal para pesca y rafting").goodAverage(46.1).price(35.3).route("Ruta 4").mainImg("img4.jpg").othersImg(Arrays.asList("img4.jpg")).features(new ArrayList<>()).category(catCottage).build(),
// Hotel 15
                Hotel.builder().name("Hotel Boutique El Olivo").description("Diseño moderno con toques clásicos y jardín privado").goodAverage(53.2).price(35.3).route("Ruta 3").mainImg("img4.jpg").othersImg(Arrays.asList("img1.jpg", "img2.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 16
                Hotel.builder().name("Posada del Campo").description("Experiencia rural con caballos y paseos a caballo").goodAverage(45.0).price(35.3).route("Ruta 2").mainImg("img4.jpg").othersImg(Arrays.asList("img4.jpg", "img1.jpg", "img2.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 17
                Hotel.builder().name("Hotel Gran Vía").description("Ubicación estratégica para eventos corporativos").goodAverage(50.8).price(35.3).route("Ruta 1").mainImg("img1.jpg").othersImg(Arrays.asList("img2.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 18
                Hotel.builder().name("Residencial Los Álamos").description("Habitaciones familiares con cocina equipada").goodAverage(44.3).price(35.3).route("Ruta 5").mainImg("img4.jpg").othersImg(Arrays.asList("img4.jpg")).features(new ArrayList<>()).category(catCottage).build(),
// Hotel 19
                Hotel.builder().name("Hotel Mirador").description("La mejor vista panorámica de la ciudad desde la terraza").goodAverage(54.6).price(35.3).route("Ruta 3").mainImg("img4.jpg").othersImg(Arrays.asList("img1.jpg", "img2.jpg", "img4.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 20
                Hotel.builder().name("Posada del Sendero").description("Entrada a las rutas de trekking más populares").goodAverage(47.2).price(35.3).route("Ruta 4").mainImg("img4.jpg").othersImg(Arrays.asList("img2.jpg", "img4.jpg")).features(new ArrayList<>()).category(catCottage).build(),
// Hotel 21
                Hotel.builder().name("Hotel Internacional").description("Servicios de lujo y personal multilingüe").goodAverage(56.0).price(35.3).route("Ruta 1").mainImg("img2.jpg").othersImg(Arrays.asList("img4.jpg")).features(new ArrayList<>()).category(catHotel).build(),
// Hotel 22
                Hotel.builder().name("Cabañas del Bosque").description("Privacidad total en cabañas independientes").goodAverage(48.9).price(35.3).route("Ruta 2").mainImg("img2.jpg").othersImg(Arrays.asList("img1.jpg", "img2.jpg")).features(new ArrayList<>()).category(catCottage).build(),
// Hotel 23
                Hotel.builder().name("Hotel Costeño").description("Cerca del puerto, ideal para cruceros y transporte marítimo").goodAverage(49.8).price(35.3).route("Ruta 5").mainImg("img4.jpg").othersImg(Arrays.asList("img1.jpg", "img2.jpg")).features(new ArrayList<>()).category(catHotel).build());

        hotelRepository.saveAll(hoteles);
        System.out.println("Carga completada con Exito");
    }
}
