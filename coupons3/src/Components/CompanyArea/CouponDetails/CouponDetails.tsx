import "./CouponDetails.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../services/CompanyService";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import errorHandler from "../../../services/ErrorHandler";
import {Button, Card, CardContent} from "@mui/material";
import CouponCard from "../CouponCard/CouponCard";

function CouponDetails(): JSX.Element {

    const [coupon, setCoupon] = useState<Coupon>();
    const couponId = +(useParams().coupId!);
    const navigate = useNavigate();



    useEffect(() =>{
        companyService.getOneCoupon(couponId)
            .then(c => setCoupon(c))
            .catch(err => errorHandler.showError(err))
    }, [])




    return (
        <div className="CouponDetails">
            <Button variant={"contained"} onClick={() => navigate(-1)}  > Back  </Button>

            {coupon && <>
                <div className={"CouponDetailsCard"}>

                    <CouponCard title={coupon.title}
                                price={coupon.price}
                                category={coupon.category}
                                amount={coupon.amount}
                                description={coupon.description}
                                startDate={coupon.startDate}
                                endDate={coupon.endDate}
                                image={coupon.image}
                                id={coupon.id}
                                companyId={coupon.company.id}/>
                        {/*<Button value={coupon.id} onClick={update}>Update Coupon</Button>*/}
                    <Button variant={"contained"} onClick={() => navigate("/updateCoupon/" + coupon.id)}  > Update Coupon  </Button><br/>
                    <Button variant={"outlined"} onClick={() => navigate("/deleteCoupon/" + coupon.id)}  > Delete Coupon  </Button>
                </div>
                </>
            }
			
        </div>
    );
}

export default CouponDetails;
