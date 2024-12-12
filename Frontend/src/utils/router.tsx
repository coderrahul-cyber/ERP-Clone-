import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Complain from "../pages/Complain";
// import PLacement from "../pages/PLacement";
import Fees from "../pages/Fees";
import Acadims from "../pages/Acadims";
import NotAvailable from "../pages/NotAvailable";
import CampusEvent from "../pages/CampusEvent";
import Register from "../pages/Register";

export const router = createBrowserRouter([
    {path :'/' ,  element :<App/> , children : [
        {path : '/', element : <Home />},
        {path : '/acadims', element : <Acadims />},
        {path : '/fees', element : <Fees />},
        // {path : '/placement', element : <PLacement />},
        {path : '/complain', element : <Complain />},
        {path : '/events/:campus', element : <CampusEvent />},
        {path : '/*', element : <NotAvailable />},
    ]},
    {path :'/sign-in' ,  element :<SignIn />},
    {path :'/register' ,  element :<Register />},
    {path : "*" , element:<NotFound />}
])