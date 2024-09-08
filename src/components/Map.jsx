import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";


function Map() {

  const [searchParams,setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  console.log(searchParams);
  
  return(
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>lat : {lat}</h1> 
      <h1>lng : {lng}</h1> 
    </div>
  )
}

export default Map;
