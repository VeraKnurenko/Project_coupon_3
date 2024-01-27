import "./Navbar.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {authStore} from "../../../Redux/OurStore";
import authService from "../../../services/AuthService";
import errorHandler from "../../../services/ErrorHandler";

function Navbar(): JSX.Element {
    const navigate = useNavigate();
    const [name, setName] = useState<string>();

    useEffect(() => {
        if(authStore.getState().user != null)
            setName(authStore.getState().user.name)
        else
            setName("Guest")

        const unsubscribe = authStore.subscribe( ()=>{
            if(authStore.getState().user != null)
                setName(authStore.getState().user.name)
            else
                setName("Guest")
        } )

        return ()=>{ //return will run this function when this component is destroyed
            unsubscribe();
        }
    }, []);

    function logout(){
        authService.logout()
            .then(() => navigate("/")).catch(err => errorHandler.showError(err));
    }


    return (
        <div className="Navbar">
            <NavLink className={"navlink"} to={"home"} title={"Home"}>Home</NavLink>
            <NavLink className={"navlink"} to={"aboutUs"}>About Us</NavLink>
            {authStore.getState().user?.role==="COMPANY" && <>

            <NavLink className={"navlink"} to={"companyDetails"}>Company Details</NavLink>
            <NavLink className={"navlink"} to={"company_coupons"}>Company Coupons</NavLink>
            </>
            }
            {authStore.getState().user?.role==="ADMIN" && <>
                <NavLink className={"navlink"} to={"AllCompanies"}>All Companies</NavLink>
                <NavLink className={"navlink"} to={"AllCustomers"}>All Customers</NavLink>
                {/*<NavLink className={"navlink"} to={"addCustomer"}>Add Customer</NavLink>*/}


            </>
            }
            {authStore.getState().user?.role === "CUSTOMER" && <>
                <NavLink className={"navlink"} to={"customerCoupons"}>Coupons</NavLink>

            </> }
            <div id={"welcomeUser"}>Hello <br/> {name}</div>

            {name === "Guest" ?  <NavLink className={"navlink"} to={"login"} title={"Login"}>Login</NavLink> :
                <button  onClick={logout}> Logout</button> }





        </div>
    );
}

export default Navbar;
