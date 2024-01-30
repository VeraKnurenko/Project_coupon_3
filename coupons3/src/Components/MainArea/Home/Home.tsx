import "./Home.css";
import {NavLink} from "react-router-dom";
import "../../../assets/images/background1.png";
import AllCoupons from "../../AdminArea/AllCoupons/AllCoupons";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <AllCoupons />
			
        </div>
    );
}

export default Home;
