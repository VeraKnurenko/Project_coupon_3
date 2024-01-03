import "./Home.css";
import {NavLink} from "react-router-dom";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <h1>Home</h1>

            {/*<h2>*/}
            {/*    <nav>*/}
            {/*           <NavLink className={"navlink"} to={"login"} title={"Login"}>Login</NavLink>*/}
            {/*    </nav>*/}
            {/*</h2>*/}

            below menu of tabs with different coupon Categories<br/>
            show all coupons in tabs inside dataGrid, to be able to sort by title
            and price<br/>
            <p>import * Data Grid * from '@mui/x-data-grid';</p>

			
        </div>
    );
}

export default Home;
