package com.example.back.config;



import com.example.back.entities.Hotel;
import com.example.back.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataIntializer implements CommandLineRunner {

    @Autowired
     private HotelRepository hotelRepository;

    @Override
    public void run(String... args) throws Exception {
        if (hotelRepository.count() > 0){
            System.out.println("La base de datos Ya tiene informacion cargada");
            return;
        }
        System.out.println("CARGANDO LOS DATOS DE PRUEBA");
        List<Hotel> hoteles = Arrays.asList(
                // Hotel 1
                Hotel.builder().name("Hotel Mara").description("a 100 metros de la carretera en el km 39 de la ruta 4").goodAverage(50.1).price(35.3).route("Ruta 2").mainImg("img0.png").othersImg(Arrays.asList("img1.jpg", "img2.jpg", "img3.png", "img4.jpg", "img5.png")).build(),
                // Hotel 2
                Hotel.builder().name("Hotel Real San José").description("Ubicado en el centro histórico con vista a las montañas").goodAverage(45.8).price(35.3).route("Ruta 4").mainImg("img1.jpg").othersImg(Arrays.asList("img2.jpg", "img3.png", "img0.png")).build(),
                // Hotel 3
                Hotel.builder().name("Posada del Camino").description("Estación de descanso ideal para viajeros y transportistas con amplio parqueadero").goodAverage(48.3).price(35.3).route("Ruta 2").mainImg("img4.jpg").othersImg(Arrays.asList("img5.png", "img2.jpg")).build(),
                // Hotel 4
                Hotel.builder().name("Hotel La Montaña").description("Entorno natural tranquilo a 5 km de la capital").goodAverage(49.2).price(35.3).route("Ruta 1").mainImg("img0.png").othersImg(Arrays.asList("img1.jpg", "img2.jpg", "img3.png")).build(),
                // Hotel 5
                Hotel.builder().name("Posada del Sol").description("Desayunos incluidos y vistas al Valle Central").goodAverage(46.5).price(35.3).route("Ruta 3").mainImg("img2.jpg").othersImg(Arrays.asList("img3.png", "img4.jpg", "img5.png", "img0.png")).build(),
                // Hotel 6
                Hotel.builder().name("Hotel Vista Mar").description("A solo 200 metros de la playa principal").goodAverage(52.1).price(35.3).route("Ruta 5").mainImg("img0.png").othersImg(Arrays.asList("img1.jpg", "img2.jpg")).build(),
                // Hotel 7
                Hotel.builder().name("Cabañas Los Pinos").description("Refugio de madera rodeado de bosque nativo").goodAverage(44.8).price(35.3).route("Ruta 2").mainImg("img3.png").othersImg(Arrays.asList("img4.jpg", "img5.png", "img0.png", "img1.jpg")).build(),
                // Hotel 8
                Hotel.builder().name("Hotel Central").description("En el corazón de la ciudad, cerca de todos los servicios").goodAverage(47.9).price(35.3).route("Ruta 1").mainImg("img0.png").othersImg(Arrays.asList("img2.jpg", "img3.png", "img4.jpg")).build(),
                // Hotel 9
                Hotel.builder().name("Hostal del Tránsito").description("Estacionamiento seguro y habitaciones de paso para camioneros").goodAverage(43.2).price(35.3).route("Ruta 4").mainImg("img1.jpg").othersImg(Arrays.asList("img2.jpg", "img0.png")).build(),
                // Hotel 10
                Hotel.builder().name("Resort El Paraíso").description("Complejo todo incluido con piscina infinita y spa").goodAverage(55.4).price(35.3).route("Ruta 5").mainImg("img0.png").othersImg(Arrays.asList("img3.png", "img4.jpg", "img5.png", "img1.jpg", "img2.jpg")).build(),
                // Hotel 11
                Hotel.builder().name("Hotel de los Andes").description("Arquitectura tradicional con calefacción y chimenea").goodAverage(51.0).price(35.3).route("Ruta 3").mainImg("img4.jpg").othersImg(Arrays.asList("img5.png", "img0.png", "img1.jpg")).build(),
                // Hotel 12
                Hotel.builder().name("Posada del Huerto").description("Desayunos orgánicos cultivados en el terreno").goodAverage(48.7).price(35.3).route("Ruta 2").mainImg("img0.png").othersImg(Arrays.asList("img2.jpg", "img3.png", "img4.jpg")).build(),
                // Hotel 13
                Hotel.builder().name("Hotel Estrella del Norte").description("Conferencias disponibles y alta velocidad de internet").goodAverage(49.5).price(35.3).route("Ruta 1").mainImg("img2.jpg").othersImg(Arrays.asList("img1.jpg", "img0.png", "img5.png")).build(),
                // Hotel 14
                Hotel.builder().name("Cabañas La Rivera").description("Acceso directo al río, ideal para pesca y rafting").goodAverage(46.1).price(35.3).route("Ruta 4").mainImg("img0.png").othersImg(Arrays.asList("img3.png", "img4.jpg", "img5.png")).build(),
                // Hotel 15
                Hotel.builder().name("Hotel Boutique El Olivo").description("Diseño moderno con toques clásicos y jardín privado").goodAverage(53.2).price(35.3).route("Ruta 3").mainImg("img3.png").othersImg(Arrays.asList("img1.jpg", "img2.jpg", "img0.png")).build(),
                // Hotel 16
                Hotel.builder().name("Posada del Campo").description("Experiencia rural con caballos y paseos a caballo").goodAverage(45.0).price(35.3).route("Ruta 2").mainImg("img0.png").othersImg(Arrays.asList("img4.jpg", "img5.png", "img1.jpg", "img2.jpg")).build(),
                // Hotel 17
                Hotel.builder().name("Hotel Gran Vía").description("Ubicación estratégica para eventos corporativos").goodAverage(50.8).price(35.3).route("Ruta 1").mainImg("img1.jpg").othersImg(Arrays.asList("img2.jpg", "img0.png", "img3.png")).build(),
                // Hotel 18
                Hotel.builder().name("Residencial Los Álamos").description("Habitaciones familiares con cocina equipada").goodAverage(44.3).price(35.3).route("Ruta 5").mainImg("img0.png").othersImg(Arrays.asList("img3.png", "img4.jpg", "img5.png")).build(),
                // Hotel 19
                Hotel.builder().name("Hotel Mirador").description("La mejor vista panorámica de la ciudad desde la terraza").goodAverage(54.6).price(35.3).route("Ruta 3").mainImg("img5.png").othersImg(Arrays.asList("img0.png", "img1.jpg", "img2.jpg", "img3.png")).build(),
                // Hotel 20
                Hotel.builder().name("Posada del Sendero").description("Entrada a las rutas de trekking más populares").goodAverage(47.2).price(35.3).route("Ruta 4").mainImg("img0.png").othersImg(Arrays.asList("img2.jpg", "img4.jpg", "img5.png")).build(),
                // Hotel 21
                Hotel.builder().name("Hotel Internacional").description("Servicios de lujo y personal multilingüe").goodAverage(56.0).price(35.3).route("Ruta 1").mainImg("img2.jpg").othersImg(Arrays.asList("img0.png", "img3.png", "img4.jpg", "img5.png")).build(),
                // Hotel 22
                Hotel.builder().name("Cabañas del Bosque").description("Privacidad total en cabañas independientes").goodAverage(48.9).price(35.3).route("Ruta 2").mainImg("img0.png").othersImg(Arrays.asList("img1.jpg", "img2.jpg", "img3.png")).build(),
                // Hotel 23
                Hotel.builder().name("Hotel Costeño").description("Cerca del puerto, ideal para cruceros y transporte marítimo").goodAverage(49.8).price(35.3).route("Ruta 5").mainImg("img4.jpg").othersImg(Arrays.asList("img5.png", "img0.png", "img1.jpg", "img2.jpg")).build()
        );

        hotelRepository.saveAll(hoteles);
        System.out.println("Carga completada con Exito");
    }
}
