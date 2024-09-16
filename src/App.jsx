import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Pricing";
import "./index.css"
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";

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


const App = () => {
  return <RouterProvider router={router}/>
}
  
export default App;
  