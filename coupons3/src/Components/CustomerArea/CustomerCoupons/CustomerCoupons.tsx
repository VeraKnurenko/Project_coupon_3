import "./CustomerCoupons.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import customerService from "../../../services/CustomerService";
import {authStore, purchaseStore} from "../../../Redux/OurStore";
import errorHandler from "../../../services/ErrorHandler";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {purchaseSlice} from "../../../Redux/PurchaseSlice";

function CustomerCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const navigate = useNavigate();
    console.log("customerId: " + authStore.getState().user.id)

     useEffect(() => {
        customerService.getAllCustomerCoupons(authStore.getState().user.id)
            .then(c =>{ setCoupons(c) })
            .catch(err => errorHandler.showError(err))
     }, []);

    return (
        <div className="AllCustomerCoupons">
            <div className={"CustomerButtons"}>
                <Button variant={"contained"} onClick={() => navigate(-1)}  > Back  </Button>
                <Button variant={"contained"} onClick={()=> navigate("/customerCouponsByPrice")}>See Coupons by price</Button>
                <Button variant={"contained"} onClick={()=> navigate("/customerCouponsByCategory")}>See Coupons by category</Button>
            </div>

            <div className="CustomerCoupons">
            {coupons?.length > 0 ?  coupons?.map( c => <CouponCard id={c.id}
                                            title={c.title}
                                            price={c.price}
                                            category={c.category}
                                            amount={c.amount}
                                            description={c.description} startDate={c.startDate} endDate={c.endDate}
                                            image={c.image} companyId={-1}/>)
                : <h2> no Coupons to show yet </h2>
            }
            </div>


			
        </div>
    );
}

export default CustomerCoupons;
