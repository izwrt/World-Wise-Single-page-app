import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";


function Map() {

  const [searchParams,setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([40,0])
  const { cities } = useCities();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  console.log(searchParams);
  
  return(
    <div className={styles.mapContainer} >
        <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
      { cities.map((city) =>(
        <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
        <Popup>
          <span>{city.emoji}</span>
          <span>{city.cityName}</span>
        </Popup>
      </Marker>
      ) )}
      </MapContainer>
    </div>
  )
}

export default Map;
