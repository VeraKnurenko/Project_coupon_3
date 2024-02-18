import "./Logout.css";
import {authStore, companyStore, couponStore, customerStore, purchaseStore} from "../../../Redux/OurStore";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import authService from "../../../services/AuthService";
import errorHandler from "../../../services/ErrorHandler";
import companyService from "../../../services/CompanyService";
import customerService from "../../../services/CustomerService";
import adminService from "../../../services/AdminService";

function Logout(): JSX.Element {
    const navigate = useNavigate();



    function Logout(){
        if (authStore.getState().user.role == "ADMIN"){
            adminService.logout();

        }
        if (authStore.getState().user.role == "COMPANY"){
            companyService.logout();
        }
        if (authStore.getState().user.role == "CUSTOMER"){
            customerService.logout();
        }

        authService.logout()
            .then(()=>navigate("/home"))
            .catch(err => errorHandler.showError(err));
    }

    useEffect(() => {
        Logout()
    }, []);


    return (
        <div className="Logout">
			
        </div>
    );
}

export default Logout;
