import "./DeleteCoupon.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import companyService from "../../../services/CompanyService";
import {toast} from "react-toastify";
import errorHandler from "../../../services/ErrorHandler";

function DeleteCoupon(): JSX.Element {
    const couponId = +(useParams().coupId!);
    const navigate = useNavigate();
    const confirmation =  window.confirm("Are you sure you want to delete this Coupon?");

    useEffect(() => {
        if (confirmation){
            companyService.deleteCoupon(couponId)
                .then(() => {
                    toast.success("Coupon Deleted");
                    navigate("/company_coupons")
                })
                .catch(err => errorHandler.showError(err));
        }
        else {
            navigate("/company_coupons")
        }
    }, []);

    return (
        <div className="DeleteCoupon">
			
        </div>
    );
}

export default DeleteCoupon;
