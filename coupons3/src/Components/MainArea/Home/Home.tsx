import "./Home.css";
import {NavLink} from "react-router-dom";
import "../../../assets/images/background1.png";
import AllCoupons from "../../AdminArea/AllCoupons/AllCoupons";
import {authStore, companyStore, couponStore, purchaseStore} from "../../../Redux/OurStore";

function Home(): JSX.Element {

    console.log(authStore.getState().user)
    console.log("admin company " + companyStore.getState().value)
    console.log("customer " + purchaseStore.getState().value)
    console.log("company " + couponStore.getState().value)
    return (
        <div className="Home">
            <AllCoupons />
			
        </div>
    );
}

export default Home;
