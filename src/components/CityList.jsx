import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItems from './CityItems';

function CityList({isLoading,cities}) {
    if(isLoading) return (<Spinner/> )

    return (
        <ul style={styles.CityList}>
            {cities.map(city => <CityItems city={city}/>)}
        </ul>
    )
}

export default CityList;