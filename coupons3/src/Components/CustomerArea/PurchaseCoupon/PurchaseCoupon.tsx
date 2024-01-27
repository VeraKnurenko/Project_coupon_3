import "./PurchaseCoupon.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import customerService from "../../../services/CustomerService";
import errorHandler from "../../../services/ErrorHandler";
import {toast} from "react-toastify";

function PurchaseCoupon(): JSX.Element {
    const coupId = +(useParams().coupId!);
    const navigate = useNavigate();

    useEffect(() => {
        customerService.couponPurchase(coupId)
            .then(() => {toast.success("Coupon purchased");navigate("/customerCoupons")})
            .catch(err => {errorHandler.showError(err)})
    }, [coupId, navigate]);




    return (
        <div className="PurchaseCoupon">

			
        </div>
    );
}

export default PurchaseCoupon;
