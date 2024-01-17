import "./CouponDetails.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../services/CompanyService";
import {useParams} from "react-router-dom";
import errorHandler from "../../../services/ErrorHandler";
import {Card, CardContent} from "@mui/material";

function CouponDetails(): JSX.Element {

    const [coupon, setCoupon] = useState<Coupon>();
    const couponId = +(useParams().coupId!);


    useEffect(() =>{
        companyService.getOneCoupon(couponId)
            .then(c => setCoupon(c))
            .catch(err => errorHandler.showError(err))
    }, [])


    return (
        <div className="CouponDetails">
            {coupon && <>
                <Card>
                    <CardContent>
                        <h3>{coupon?.title}</h3>
                        <h4>{coupon?.category}</h4>
                        <h4>{coupon?.description}</h4>
                        <img src={coupon?.image} alt={coupon?.title}/><br/>
                        $ price {coupon?.price} <br/>

                        <div className={"couponEndDate"}>Promotion ending at: {coupon?.endDate.toString()}</div>

                    </CardContent>
                </Card>
            </>
            }
			
        </div>
    );
}

export default CouponDetails;
