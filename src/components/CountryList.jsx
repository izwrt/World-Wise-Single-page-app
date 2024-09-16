import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';

function CountryList({isLoading,cities}) {
    if(isLoading) return (<Spinner/> )

    if (!cities.length) return <Message message='Add your first city by clicking on the map'/>


    const countries = cities.reduce((arr,city) => {
        if(!arr.map((el) => el.city).includes(city.country)) return [...arr, {country: city.country, emoji: city.emoji, id: city.id}]
        else return arr;
    },[]);

    
    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem country={country} key={country.id}/>)}
        </ul>
    )
}

export default CountryList;