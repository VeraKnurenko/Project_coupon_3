import "./AllCoupons.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import {getAllCoupons} from "../../../services/AdminService";
import errorHandler from "../../../services/ErrorHandler";
import {Card, CardContent} from "@mui/material";

function AllCoupons(): JSX.Element {

const [coupons, setCoupons] = useState<Coupon[]>();

    useEffect(() => {
        getAllCoupons().then(c => setCoupons(c.data)).catch(err => errorHandler.showError(err))
    }, []);

    return (
        <div className="AllCoupons">
            {coupons?.map( c=> <Card key={c.id}>
                <CardContent>
                    <h1>{c.title}</h1>
                    <div>{c.description}</div>
                </CardContent>
            </Card> ) }

			
        </div>
    );
}

export default AllCoupons;
