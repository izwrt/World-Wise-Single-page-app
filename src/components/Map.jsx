import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import useUrlPosition from "../hooks/useUrlPosition";
import styles from "./Map.module.css";

function Map() {

  const [mapPosition, setMapPosition] = useState([40,0])
  const { cities } = useCities();
  const [lat,lng] = useUrlPosition();

  
  useEffect(function() {
    if(lng && lat) setMapPosition([lat,lng])
  },[lat,lng]);

  return(
    <div className={styles.mapContainer} >
        <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
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

      <ChangeCenter position={mapPosition }/>
      <DetectClick/>
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }){
  const map = useMap();
  map.setView(position);
  return null
}

function DetectClick(){
  const navigate = useNavigate();
  
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  });
}

export default Map;
