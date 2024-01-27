import "./Home.css";
import {NavLink} from "react-router-dom";
import AllCoupons from "../../AdminArea/AllCoupons/AllCoupons";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <h1>Home</h1>
            <AllCoupons/>



            below menu of tabs with different coupon Categories<br/>
            show all coupons in tabs inside dataGrid, to be able to sort by title
            and price<br/>
            <p>import * Data Grid * from '@mui/x-data-grid';</p>

			
        </div>
    );
}

export default Home;
