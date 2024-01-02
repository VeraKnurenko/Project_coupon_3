import "./Routing.css";
import {Route, Routes} from "react-router-dom";
import Home from "../../MainArea/Home/Home";
import AboutUs from "../../MainArea/AboutUs/AboutUs";
import Companies from "../../CompanyArea/Companies/Companies";
import Sale from "../../MainArea/Sale/Sale";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path={"home"} element={<Home/>} />
                <Route path={"aboutUs"} element={<AboutUs/>} />
                <Route path={"companies"} element={<Companies/>} />
                <Route path={"sales"} element={<Sale/>} />
            </Routes>
			
        </div>
    );
}

export default Routing;
