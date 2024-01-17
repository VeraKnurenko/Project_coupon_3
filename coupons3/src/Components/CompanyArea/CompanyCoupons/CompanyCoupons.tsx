import "./CompanyCoupons.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../services/CompanyService";
import errorHandler from "../../../services/ErrorHandler";
import CouponCard from "../CouponCard/CouponCard";
import {Button, Card, Link} from "@mui/material";
import {NavLink, Route, useNavigate} from "react-router-dom";
import {decode as base64_decode} from "base-64";


function CompanyCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>()
    const navigate = useNavigate();

    useEffect(() => {
        companyService.getCompanyCoupons().then(c => setCoupons(c))
            .catch(err => errorHandler.showError(err))
    }, []);


 return (

        <div className="CompanyCoupons">
           <div> <Button component={NavLink} to="/AddCoupon" >Add Coupon</Button></div><br/>


            {coupons?.map( c=> <Card >
                <NavLink to={"/couponDetails/" + c.id}  >

                {/*navigate( "CouponDetails")*/}

                <CouponCard key={c.id}

                                           title={c.title}
                                           price={c.price}
                                           description={c.description}
                                           endDate={c.endDate}
                                           image={ c.image}/>
                </NavLink>



                </Card>)}

        </div>
    );
}

export default CompanyCoupons;
