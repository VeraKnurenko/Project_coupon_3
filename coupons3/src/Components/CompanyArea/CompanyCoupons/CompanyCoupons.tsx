import "./CompanyCoupons.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../services/CompanyService";
import errorHandler from "../../../services/ErrorHandler";
import CouponCard from "../CouponCard/CouponCard";
import {Button, Card, Link} from "@mui/material";
import {NavLink, Route, useNavigate} from "react-router-dom";
import {authStore} from "../../../Redux/OurStore";


function CompanyCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>()
    const navigate = useNavigate();

    useEffect(() => {
        companyService.getCompanyCoupons()
            .then(c => setCoupons(c))
            .catch(err => errorHandler.showError(err))
    }, []);





 return (

        <>
            <div className={"CompanyButtons"}>
                   <div className={"CompanyCouponsButton"}> <Button variant={"contained"} component={NavLink} to="/AddCoupon" >Add Coupon</Button></div>
                   <div className={"CompanyCouponsButton"}> <Button variant={"contained"} component={NavLink} to="/couponsByPrice" >coupons By Price</Button></div>
                   <div className={"CompanyCouponsButton"}> <Button variant={"contained"} component={NavLink} to="/couponsByCategory" >coupons By Category</Button></div>
                   <div className={"CompanyCouponsButton"}> <Button variant={"contained"} onClick={() => navigate(-1)} >Back</Button></div>
            </div>

            <div className="CompanyCoupons">
                {coupons?.map( c=> <Card key={c.id} >


                    <CouponCard
                                               title={c.title}
                                               price={c.price}
                                               category={c.category}
                                               amount={c.amount}
                                               description={c.description}
                                               startDate={c.startDate}
                                               endDate={c.endDate}
                                               image={ c.image} id={c.id}  companyId={authStore.getState().user.id}/>

                    </Card>)}

            </div>
        </>
    );
}

export default CompanyCoupons;
