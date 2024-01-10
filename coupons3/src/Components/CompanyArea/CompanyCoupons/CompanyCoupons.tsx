import "./CompanyCoupons.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../services/CompanyService";
import errorHandler from "../../../services/ErrorHandler";
import CouponCard from "../CouponCard/CouponCard";

function CompanyCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>()

    useEffect(() => {
        companyService.getCompanyCoupons().then(c => setCoupons(c)).catch(err => errorHandler.showError(err))
    }, []);


 return (
        <div className="CompanyCoupons">

            {coupons?.map( c=> <CouponCard title={c.title} price={c.price}
                                           description={c.description} endDate={c.endDate} image={c.image}/>)}
			
        </div>
    );
}

export default CompanyCoupons;
