import "./CompanyCoupons.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../services/CompanyService";
import errorHandler from "../../../services/ErrorHandler";
import {Card, CardContent} from "@mui/material";

function CompanyCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>()

    useEffect(() => {
        companyService.getCompanyCoupons().then(c => setCoupons(c)).catch(err => errorHandler.showError(err))
    }, []);


 return (
     //TODO COUPON CARD LIKE NIR
        <div className="CompanyCoupons">
            {coupons?.map( c=> <Card>
                <CardContent>
                    <h3>{c.title}</h3>
                    <img src={c.image} alt={""}/><br/>
                    $ price {c.price}
                </CardContent>
            </Card>)}
			
        </div>
    );
}

export default CompanyCoupons;
