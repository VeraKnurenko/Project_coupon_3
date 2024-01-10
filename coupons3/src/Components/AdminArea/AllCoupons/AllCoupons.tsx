import "./AllCoupons.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import adminService from "../../../services/AdminService";
import errorHandler from "../../../services/ErrorHandler";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";

function AllCoupons(): JSX.Element {

const [coupons, setCoupons] = useState<Coupon[]>();

    useEffect(() => {
        adminService.getAllCoupons().then(c => setCoupons(c.data)).catch(err => errorHandler.showError(err))
    }, []);

    return (
        <div className="AllCoupons">
            {coupons?.map(c=><CouponCard title={c.title} price={c.price} description={c.description} endDate={c.endDate} image={c.image}/>)}
        </div>
    );
}

export default AllCoupons;
