import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CityItems from './CityItems';
import Message from './Message';

function CountryList({isLoading,cities}) {
    if(isLoading) return (<Spinner/> )

    if (!cities.length) return <Message message='Add your first city by clicking on the map'/>

    return (
        <ul className={styles.countryList}>
            {cities.map(city => <CityItems city={city} key={city.id}/>)}
        </ul>
    )
}

export default CountryList;