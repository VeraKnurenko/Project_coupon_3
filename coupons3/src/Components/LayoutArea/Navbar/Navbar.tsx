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
            setName("Hello Guest")

        const unsubscribe = authStore.subscribe( ()=>{
            if(authStore.getState().user != null)
                setName(authStore.getState().user.name)
            else
                setName("Hello Guest")
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
            <NavLink className={"navlink"} to={"login"} title={"Login"}>Login</NavLink>
            <NavLink className={"navlink"} to={"aboutUs"}>About Us</NavLink>
            <NavLink className={"navlink"} to={"companies"}>Companies</NavLink>
            <NavLink className={"navlink"} to={"company"}>Company Details</NavLink>
            <NavLink className={"navlink"} to={"company_coupons"}>Company Coupons</NavLink>
            <NavLink className={"navlink"} to={"sales"}>Sales</NavLink>

            {name}
            <a onClick={logout}> Logout</a>
        </div>
    );
}

export default Navbar;
