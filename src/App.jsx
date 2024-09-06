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

return(
  <BrowserRouter>
    <Routes>
      <Route index element ={<Homepage/>}/>
    </Routes>
      <Route index element={<Homepage />} />
      <Route path="product" element={<Product />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout/>}>
        <Route path="cities" element={<CityList/>}/>
        <Route paht="coutries" element={<p>Coutrues</p>}/>
      </Route>

  
  </BrowserRouter>
)
}
  
export default App;
  