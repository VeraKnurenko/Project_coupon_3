import "./CustomerDetails.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import adminService from "../../../../services/AdminService";
import Customer from "../../../../Models/Customer";
import errorHandler from "../../../../services/ErrorHandler";
import {Card, CardContent} from "@mui/material";
import CouponCard from "../../../CompanyArea/CouponCard/CouponCard";

function CustomerDetails(): JSX.Element {

    const customerId = +(useParams().custId!);
    const [customer, setCustomer] = useState<Customer>();
    useEffect(() => {
        adminService.getOneCustomer(customerId)
            .then(c => setCustomer(c))
            .catch(err => errorHandler.showError(err));

    }, []);


    return (
        <div className="CustomerDetails">
            <Card>
                <CardContent>
               <h2> {customer?.firstName}, {customer?.lastName} </h2>
                <h3>{customer?.email}</h3>
                <h4>ID: {customer?.id}</h4>
                <h4>Password: {customer?.password}</h4>
                <h5>coupons:{customer?.coupons?.map(coup => <CouponCard key={coup.id}
                                                                               title={coup.title}
                                                                                price={coup.price}
                                                                                description={coup.description}
                                                                               startDate={coup.startDate}
                                                                                endDate={coup.endDate} image={coup.image} />)}</h5>
                </CardContent>


            </Card>



			
        </div>
    );
}

export default CustomerDetails;
