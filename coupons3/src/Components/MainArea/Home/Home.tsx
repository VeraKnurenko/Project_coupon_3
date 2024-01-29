import "./Home.css";
import {NavLink} from "react-router-dom";
import AllCoupons from "../../AdminArea/AllCoupons/AllCoupons";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <h1>Home</h1>
            <AllCoupons />
			
        </div>
    );
}

export default Home;
