import "./Logout.css";
import {authStore, companyStore, couponStore, customerStore, purchaseStore} from "../../../Redux/OurStore";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import authService from "../../../services/AuthService";
import errorHandler from "../../../services/ErrorHandler";

function Logout(): JSX.Element {
    const navigate = useNavigate();



    function Logout(){
        // if (authStore.getState().user.role == "ADMIN"){
        //     companyStore.getState().value = [];
        //     customerStore.getState().value = [];
        // }
        // if (authStore.getState().user.role == "COMPANY"){
        //     couponStore.getState().value = [];
        // }
        // if (authStore.getState().user.role == "CUSTOMER"){
        //     purchaseStore.getState().value = [];
        // }
        //make roles switch case
        // couponStore.getState().value = [];
        // companyStore.getState().value = [];
        // customerStore.getState().value = [];
        // purchaseStore.getState().value = [];
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
