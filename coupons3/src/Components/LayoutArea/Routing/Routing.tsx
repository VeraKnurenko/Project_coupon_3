import "./Routing.css";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../../MainArea/Home/Home";
import AboutUs from "../../MainArea/AboutUs/AboutUs";
import Companies from "../../CompanyArea/Companies/Companies";
import Sale from "../../MainArea/Sale/Sale";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import Login from "../../AuthArea/Login/Login";
import CompanyCoupons from "../../CompanyArea/CompanyCoupons/CompanyCoupons";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path={"home"} element={<Home/>} />
                <Route path={"login"} element={<Login/>} />
                <Route path={"aboutUs"} element={<AboutUs/>} />
                <Route path={"companies"} element={<Companies/>} />
                <Route path={"company"} element={<CompanyDetails/>} />
                <Route path={"company_coupons"} element={<CompanyCoupons/>} />
                <Route path={"sales"} element={<Sale/>} />
                <Route path={"/"} element={<Navigate to={"home"}/>}/>
                <Route path={"*"} element={<div>Oops No Page Found!</div>}/>

            </Routes>
			
        </div>
    );
}

export default Routing;
