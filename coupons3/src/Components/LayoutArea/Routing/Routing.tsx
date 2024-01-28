import "./Routing.css";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../../MainArea/Home/Home";
import AboutUs from "../../MainArea/AboutUs/AboutUs";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import Login from "../../AuthArea/Login/Login";
import CompanyCoupons from "../../CompanyArea/CompanyCoupons/CompanyCoupons";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import CouponDetails from "../../CompanyArea/CouponDetails/CouponDetails";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import AllCompanies from "../../AdminArea/CompanyControl/AllCompanies/AllCompanies";
import AllCustomers from "../../AdminArea/CustomerControl/AllCustomers/AllCustomers";
import CustomerDetails from "../../AdminArea/CustomerControl/CustomerDetails/CustomerDetails";
import AddCustomer from "../../AdminArea/CustomerControl/AddCustomer/AddCustomer";
import AddCompany from "../../AdminArea/CompanyControl/AddCompany/AddCompany";
import UpdateCompany from "../../AdminArea/CompanyControl/UpdateCompany/UpdateCompany";
import PurchaseCoupon from "../../CustomerArea/PurchaseCoupon/PurchaseCoupon";
import CustomerCoupons from "../../CustomerArea/CustomerCoupons/CustomerCoupons";
import DeleteCustomer from "../../AdminArea/CustomerControl/DeleteCustomer/DeleteCustomer";
import DeleteCompany from "../../AdminArea/CompanyControl/DeleteCompany/DeleteCompany";
import CouponsByPrice from "../../CompanyArea/CouponsByPrice/CouponsByPrice";
import OneCompany from "../../AdminArea/CompanyControl/OneCompany/OneCompany";
import CouponsByCategory from "../../CompanyArea/CouponsByCategory/CouponsByCategory";
import UpdateCustomer from "../../AdminArea/CustomerControl/UpdateCustomer/UpdateCustomer";
import Main from "../../MainArea/Main/Main";
import DashBoard from "../../AdminArea/DashBoard/DashBoard";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path={"home"} element={<Home/>} />
                <Route path={"login"} element={<Login/>} />
                <Route path={"dash"} element={<DashBoard/>} />

                <Route path={"aboutUs"} element={<AboutUs/>} />
                <Route path={"companyDetails"} element={<CompanyDetails/>} />
                <Route path={"company_coupons"} element={<CompanyCoupons/>} />
                <Route path={"couponDetails/:coupId"} element={<CouponDetails/>} />
                <Route path={"updateCoupon/:coupId"} element={<UpdateCoupon/>} />
                <Route path={"AddCoupon"} element={<AddCoupon/>}/>
                <Route path={"couponsByPrice"} element={<CouponsByPrice/>}/>
                <Route path={"couponsByCategory"} element={<CouponsByCategory/>}/>
                <Route path={"AddCompany"} element={<AddCompany/>}/>
                <Route path={"AllCompanies/updateCompany/:compId"} element={<UpdateCompany/>}/>
                <Route path={"AllCompanies/deleteCompany/:compId"} element={<DeleteCompany/>}/>
                <Route path={"AllCompanies"} element={<AllCompanies/>}/>
                <Route path={"oneCompany/:compId"} element={<OneCompany/>}/>
                <Route path={"AllCustomers"} element={<AllCustomers/>}/>
                <Route path={"AllCustomers/:custId"} element={<CustomerDetails/>}/>
                <Route path={"deleteCustomer/:custId"} element={<DeleteCustomer/>}/>
                <Route path={"updateCustomer/:custId"} element={<UpdateCustomer/>}/>
                <Route path={"customerCoupons"} element={<CustomerCoupons/>}/>

                <Route path={"addCustomer"} element={<AddCustomer/>}/>
                <Route path={"purchaseCoupon/:coupId"} element={<PurchaseCoupon/>}/>

                <Route path={"/"} element={<Navigate to={"home"}/>}/>
                <Route path={"*"} element={<div>Oops No Page Found!</div>}/>

            </Routes>
			
        </div>
    );
}

export default Routing;
