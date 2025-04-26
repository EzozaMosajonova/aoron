import { createBrowserRouter } from "react-router-dom";
import App from "../App";  
import Login from "../pages/Login";
import Products from "../pages/Products";
import Category from "../pages/Category";
import Discount from "../pages/Discount";
import Sizes from "../pages/Sizes";
import Colors from "../pages/Colors";
import Faq from "../pages/Faq";
import Contact from "../pages/Contact";
import Team from "../pages/Team";
import News from "../pages/News";


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,  // Bosh sahifa
        errorElement: <div>Bunday sahifa mavjud emas!</div>,
        children: [
            {
                path: "/",  
                element: <Products/>,
            },
            {
                path: "/category",  
                element: <Category/>,
            },
            {
                path: "/login",
                element: <Login/>,  
            },
            {
                path: "/discount",  
                element: <Discount/>,
            },
            {
                path: "/sizes",  
                element: <Sizes/>,
            },
            {
                path: "/colors",  
                element: <Colors/>,
            },
            {
                path: "/faq",  
                element: <Faq/>,
            },
            {
                path:"/contact" ,
                element : <Contact/>
            },
            {
                path: "/team",  
                element: <Team/>,
            },
            {
                path:"/news" ,
                element : <News/>
            }
        ]
    }
]);
