import "./Navbar.css";
import {NavLink} from "react-router-dom";

function Navbar(): JSX.Element {
    return (
        <div className="Navbar">
            <NavLink className={"navlink"} to={"home"} title={"Home"}>Home</NavLink>
            <NavLink className={"navlink"} to={"login"} title={"Login"}>Login</NavLink>
            <NavLink className={"navlink"} to={"aboutUs"}>About Us</NavLink>
            <NavLink className={"navlink"} to={"companies"}>Companies</NavLink>
            <NavLink className={"navlink"} to={"sales"}>Sales</NavLink>
			
        </div>
    );
}

export default Navbar;
