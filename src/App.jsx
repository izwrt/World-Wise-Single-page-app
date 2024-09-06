import { BrowserRouter, createBrowserRouter, RouterProvider,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import {useState, useEffect} from "react";
import Product from "./pages/Pricing";
import "./index.css"
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";

const BASE_URL = "http://localhost:8000/";

const App = () => {

  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() =>{
    async function fetchCities() {
      try{
        setIsLoading(true);
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
        <Route path="cities" element={<CityList/>}/>
        <Route path="countries" element={<p>Coutrues</p>}/>
        <Route path="form" element={<p>form</p>}/>
      </Route>
    </Routes>

  
  </BrowserRouter>
)
}
  
export default App;
  