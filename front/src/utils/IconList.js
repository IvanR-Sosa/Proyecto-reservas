import { FaParking, FaWifi } from "react-icons/fa";
import { GiCartwheel } from "react-icons/gi";
import { IoRestaurant } from "react-icons/io5";
import { MdOutlineBedroomParent, MdOutlinePool } from "react-icons/md";
import { PiSecurityCameraBold } from "react-icons/pi";
import { RiCarWashingLine } from "react-icons/ri";
import { TbParking } from "react-icons/tb";

const ListIcons =[
    {iconKey:"Wifi",iconCom:FaWifi},
    {iconKey:"Restaurante",iconCom:IoRestaurant },
    {iconKey:"Parqueadero Pago",iconCom:FaParking},
    {iconKey:"Parqueadero gratis",iconCom:TbParking},
    {iconKey:"Piscina gratis",iconCom:MdOutlinePool },
    {iconKey:"Habitacion sencilla",iconCom:MdOutlineBedroomParent},
    {iconKey:"Seguridad 24/7",iconCom:PiSecurityCameraBold  },
    {iconKey:"Lavado de Vehiculo",iconCom:RiCarWashingLine },
    {iconKey:"Montallantas 24/7",iconCom:GiCartwheel },
];

export const getAllIcons= () =>{
    return ListIcons;
}
export const getIconByKey = (iconKey) =>{
    const icon = ListIcons.find(item=>item.iconKey=== iconKey);
    return icon ? icon.iconCom : null;
}
 
export default ListIcons;