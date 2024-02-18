import "./AllCoupons.css";
import noCoupons from "../../../assets/images/noCoupons.png"
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import adminService from "../../../services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../services/ErrorHandler";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {authStore, couponStore, purchaseStore} from "../../../Redux/OurStore";
import {purchaseSlice} from "../../../Redux/PurchaseSlice";
import {couponSlice} from "../../../Redux/CouponSlice";
import customerService from "../../../services/CustomerService";


function AllCoupons(): JSX.Element {

const [coupons, setCoupons] = useState<Coupon[]>();


    useEffect(() => {
        adminService.getAllCoupons()
            .then(c  =>{
                if (c.length > 0){
                    setCoupons(c)
                    couponStore.dispatch(couponSlice.actions.fetch(c))

                } else {
                    toast.success("no coupons yet")
                }

            })
            .catch(err => errorHandler.showError(err))
        if(authStore.getState().user != null) {
            customerService.getAllCustomerCoupons(authStore.getState().user?.id)
                .then(coup => {
                    purchaseStore.dispatch(purchaseSlice.actions.fetch(coup))
                })
                .catch(err => console.log(err))
        }
    }, []);

    return (
        <div className="AllCoupons">


            {coupons?.length > 0 ? coupons?.map(c=><CouponCard key={c.id}
                                         id={c.id}

                                         title={c.title}
                                         price={c.price}
                                         category={c.category}
                                         amount={c.amount}
                                         description={c.description}
                                         startDate={c.startDate}
                                         endDate={c.endDate}
                                         image={c.image}

                                       companyId={-1}/>)
            : <>
                    <h2 className={"message"}>No coupons yet to show</h2>
                    <div className={"startImage"}>
                        <img src={noCoupons} alt={"No Coupons"}/>
                    </div>
              </>}
        </div>
    );
}

export default AllCoupons;
