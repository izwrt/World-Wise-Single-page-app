import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:8000/";

const CitiesContext = createContext()

function CitiesProvider({children}){
  
    const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({})

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

  async function getCity(id){
        try{
          setIsLoading(true);
          const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
          await delay(900);
          const res = await fetch(`${BASE_URL}cities/${id}`);
          const data = await res.json();
          setCurrentCity(data);
        }
        catch{
          alert("Fetch error");
        }
        finally{
          setIsLoading(false);
        }
  }
  
  async function createCity(newCity){
    try{
      setIsLoading(true);
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
      
      setCities(cities => [...cities, data]);

    }
    catch{
      alert("creating error");
    }
    finally{
      setIsLoading(false);
    }
}

async function deleteCity(id){
  try{
    setIsLoading(true);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(900);
    await fetch(`${BASE_URL}cities/${id}`, {
      method: 'DELETE',
    });
    setCities(cities => cities.filter((city) => city.id !== id));

  }
  catch{
    alert("delete error");
  }
  finally{
    setIsLoading(false);
  }
}

  return (  
    <CitiesContext.Provider value={{
        cities,
        getCity,
        isLoading,
        setIsLoading,
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