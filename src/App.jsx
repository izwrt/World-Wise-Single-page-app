import { BrowserRouter, createBrowserRouter, RouterProvider,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import {useState, useEffect} from "react";
import Product from "./pages/Pricing";
import "./index.css"
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";

const BASE_URL = "http://localhost:8000/";

const App = () => {

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
  },[])

return(
  <BrowserRouter>
    <Routes>
      <Route index element ={<Homepage/>}/>
      <Route index element={<Homepage />} />
      <Route path="product" element={<Product />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout/>}>
      <Route index element={<CityList cities={cities} isLoading={isLoading} />}/>
        <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />}/>
        <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>}/>
        <Route path="form" element={<p>form</p>}/>
      </Route>
    </Routes>

  
  </BrowserRouter>
)
}
  
export default App;
  