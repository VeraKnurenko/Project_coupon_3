import "./CustomerDetails.css";
import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import adminService from "../../../../services/AdminService";
import Customer from "../../../../Models/Customer";
import errorHandler from "../../../../services/ErrorHandler";
import {Card, CardContent} from "@mui/material";
import CouponCard from "../../../CompanyArea/CouponCard/CouponCard";

function CustomerDetails(): JSX.Element {

    const custId = +(useParams().custId!);
    console.log(custId)
    const [customer, setCustomer] = useState<Customer>();
    useEffect(() => {
        adminService.getOneCustomer(custId)
            .then(c => setCustomer(c))
            .catch(err => errorHandler.showError(err));

    }, []);


    return (
        <div className="CustomerDetails">
            <Card key={customer?.id}>
                <NavLink to={"/deleteCustomer/" + custId}>DELETE</NavLink>


                <CardContent key={customer?.id}>
               <h2> {customer?.firstName}, {customer?.lastName} </h2>
                <h3>{customer?.email}</h3>
                <h4>ID: {customer?.id}</h4>
                <h4>Password: {customer?.password}</h4>
                <h5>coupons number: {customer?.coupons?.length}</h5>
                {/*<h5>coupons:{customer?.coupons?.map(coup => <CouponCard key={coup.id}*/}
                {/*                                                               title={coup.title}*/}
                {/*                                                                price={coup.price}*/}
                {/*                                                                description={coup.description}*/}
                {/*                                                               startDate={coup.startDate}*/}
                {/*                                                                endDate={coup.endDate} image={"coup.image"}  id={coup.id}  />)}</h5>*/}
                </CardContent>


            </Card>



			
        </div>
    );
}

export default CustomerDetails;
