import { lazy,Suspense } from "react";
import { BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import Spinner from "./components/Spinner";
import "./index.css"
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Pricing"));
const Pricing = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

const App = () => {
return(
  <AuthProvider>
    <CitiesProvider>
    <BrowserRouter>
    <Suspense fallback={<Spinner/>}> 
      <Routes>
        <Route index element ={<Homepage/>}/>
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app"
          element={<ProtectedRoute>
          <AppLayout/>
          </ProtectedRoute>}>
        <Route index element={<Navigate to="cities"/>}/>
          <Route path="cities" element={<CityList />}/>
          <Route path="cities/:id" element={<City/>}/>
          <Route path="countries" element={<CountryList/>}/>
          <Route path="form" element={<Form/>}/>
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  
    </CitiesProvider>
  </AuthProvider>
)
}
  
export default App;
  