import "./CustomerCoupons.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import customerService from "../../../services/CustomerService";
import {authStore} from "../../../Redux/OurStore";
import errorHandler from "../../../services/ErrorHandler";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

function CustomerCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>()
    const navigate = useNavigate();
    console.log("customerId: " + authStore.getState().user.id)
    useEffect(() => {
        customerService.getAllCustomerCoupons(authStore.getState().user.id)
            .then(c => setCoupons(c))
            .catch(err => errorHandler.showError(err))
    }, []);
    return (
        <div className="CustomerCoupons">
            <Button variant={"contained"} onClick={()=> navigate("/customerCouponsByPrice")}>See Coupons by price</Button>
            <Button variant={"contained"} onClick={()=> navigate("/customerCouponsByCategory")}>See Coupons by category</Button>
            {coupons?.map( c => <CouponCard id={c.id}
                                            title={c.title}
                                            price={c.price}
                                            category={c.category}
                                            description={c.description} startDate={c.startDate} endDate={c.endDate}
                                            image={c.image}/>)}

			
        </div>
    );
}

export default CustomerCoupons;
