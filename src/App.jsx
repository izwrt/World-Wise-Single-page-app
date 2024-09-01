import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Pricing";

const router = createBrowserRouter([
  {
    path : "/login",
    element: <Login/>
  },
  {
    path: "/home",
    element: <Homepage/>
  },
  {
    path: "/pricing",
    element: <Pricing/>
  },
  {
    path: "/product",
    element: <Product/>
  }
]);


const App = () => {
  return <RouterProvider router={router}/>
}
  
export default App;
  