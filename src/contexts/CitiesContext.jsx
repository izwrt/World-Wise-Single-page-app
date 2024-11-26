import { createContext, useReducer, useEffect, useContext, useCallback } from "react";

const BASE_URL = "http://localhost:8000/";

const CitiesContext = createContext()

const intialState = {
  cities:[],
  isLoading: false,
  currentCity: {}

}

function reducer(state,action){
  switch(action.type){
    case 'loading':
      return {
        ...state,
        isLoading: true
      };

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case 'error':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      }

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload]
      }

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      }

    default:
      throw new Error('no condition is found')
  }
}

function CitiesProvider({children}){
  
  const [{ cities, isLoading, currentCity },dispatch] = useReducer(reducer,intialState);

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({})

  useEffect(() =>{
    async function fetchCities() {
      try{
        dispatch({type:'loading'})
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(900);
        const res = await fetch(`${BASE_URL}cities`);
        const data = await res.json();
        dispatch({type: 'cities/loaded', payload: data})
      }
      catch{ 
        dispatch({type: 'error', payload: 'Error while fetching Cities'})
      }
  }
    fetchCities();
  },[]);

  const getCity = useCallback (async function getCity(id){
    if (Number(id) === currentCity.id) return

    dispatch({type:'loading'})

        try{
          const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
          await delay(900);
          const res = await fetch(`${BASE_URL}cities/${id}`);
          const data = await res.json();
          dispatch({type: 'city/loaded', payload: data})
        }
        catch{
          dispatch({type: 'error', payload: 'Error while fetching City'})
        }
  },[currentCity.id])
  
  async function createCity(newCity){
    dispatch({type:'loading'})

    try{
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await delay(900);
      const res = await fetch(`${BASE_URL}cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      
      dispatch({type: "city/created", payload: data})

    }
    catch{
      dispatch({type: 'error', payload: 'Error while creating City'})
    }
}

async function deleteCity(id){
  dispatch({type:'loading'})

  try{
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(900);
    await fetch(`${BASE_URL}cities/${id}`, {
      method: 'DELETE',
    });
    dispatch({type:'city/deleted' ,payload: id})
  }
  catch{
    dispatch({type: 'error', payload: 'Error while creating City'})
  }
}

  return (  
    <CitiesContext.Provider value={{
        cities,
        getCity,
        isLoading,
        currentCity,
        createCity,
        deleteCity,
    }}>
        {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error("CitiesContext was used outside the CitiesProvider")
    return context;
}

export { CitiesProvider, useCities }