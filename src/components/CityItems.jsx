import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

const formatDate = (date) => {
   return new Intl.DateTimeFormat("en",{
        day : "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date))
}

const CityItems = ({city}) => {
    const {cityName, emoji, date,id} = city;   

    return(
        <li>
            <Link className={styles.cityItem} to={`${id}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h1 className={styles.name}>{cityName}</h1>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link> 
        </li>
    )
}

export default CityItems;