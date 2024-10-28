import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) => {
   return new Intl.DateTimeFormat("en",{
        day : "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date))
}

const CityItems = ({city}) => {
    const {cityName, emoji, date,id,position} = city;   
    const { currentCity } = useCities();

    return(
        <li>
            <Link className={`${styles.cityItem} ${id===currentCity.id ? styles["cityItem--active"] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h1 className={styles.name}>{cityName}</h1>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link> 
        </li>
    )
}

export default CityItems;