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

    // function update(){
    //     navigate("/updateCoupon/${coupon.id}")
    // }



    return (
        <div className="CouponDetails">
            {coupon && <>
                <Card>
                    <CouponCard key={coupon.id} title={coupon.title} price={coupon.price} description={coupon.description} startDate={coupon.startDate} endDate={coupon.endDate} image={coupon.image}/>
                        {/*<Button value={coupon.id} onClick={update}>Update Coupon</Button>*/}
                    <NavLink to={"/updateCoupon/" + coupon.id}  > Update Coupon  </NavLink>
                    <NavLink to={"" + coupon.id}  > Delete Coupon  </NavLink>//to write


                    {/*    <h3>{coupon?.title}</h3>*/}
                    {/*    <h4>{coupon?.category}</h4>*/}
                    {/*    <h4>{coupon?.description}</h4>*/}
                    {/*    <img src={coupon?.image} alt={coupon?.title}/><br/>*/}
                    {/*    $ price {coupon?.price} <br/>*/}
                    {/*    <div>Started: {coupon.startDate.toString()}</div>*/}
                    {/*    <div className={"couponEndDate"}>Promotion ending at: {coupon?.endDate.toString()}</div>*/}

                </Card>
            </>
            }
			
        </div>
    );
}

export default CouponDetails;
