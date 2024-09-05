import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

  useEffect(function () {
    async function fetchCities() {
      try{
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("The was an error loading data");
      } finally{
        setIsLoading(false);
      }
    }
    fetchCities();
  },[]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>
  },
  {
    path : "/login",
    element: <Login/>
  },
  {
    path: "/pricing",
    element: <Pricing/>
  },
  {
    path: "/product",
    element: <Product/>
  },
  {
    path: "/app",
    element: <AppLayout/>,
    children: [
      {
      path: "cities",
      element: <CityList/>
    },
    {
      path: "countries",
      element: <p>countries</p>
    },
  ]
  },
]);



  return <RouterProvider router={router}/>
}
  
export default App;
  