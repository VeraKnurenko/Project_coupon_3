import "./Routing.css";
import {Route, Routes} from "react-router-dom";
import Home from "../Pages/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Companies from "../Pages/Companies/Companies";
import Sales from "../Pages/Sales/Sales";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path={"home"} element={<Home/>} />
                <Route path={"aboutUs"} element={<AboutUs/>} />
                <Route path={"companies"} element={<Companies/>} />
                <Route path={"sales"} element={<Sales/>} />
            </Routes>
			
        </div>
    );
}

export default Routing;
