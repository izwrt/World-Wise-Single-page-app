import { createContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:8000/";


const CitiesContext = createContext()

function CitiesProvider({children}){
    const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() =>{
    async function fetchCities() {
      try{
        setIsLoading(true);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(900);
        const res = await fetch(`${BASE_URL}cities`);
        const data = await res.json();
        setCities(data);
      }
      catch{
        alert("Fetch error");
      }
      finally{
        setIsLoading(false);
      }
  }
    fetchCities();
  },[]);

  return <CitiesContext.Provider value={{
    cities,
    isLoading
  }}>
    {children}
  </CitiesContext.Provider>
}

export { CitiesProvider }