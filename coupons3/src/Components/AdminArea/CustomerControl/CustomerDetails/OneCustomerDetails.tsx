import "./OneCustomerDetails.css";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import adminService from "../../../../services/AdminService";
import Customer from "../../../../Models/Customer";
import errorHandler from "../../../../services/ErrorHandler";
import {Button, Card, CardContent} from "@mui/material";

function OneCustomerDetails(): JSX.Element {

    const custId = +(useParams().custId!);
    const navigate = useNavigate();
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
                <Button variant={"outlined"} onClick={()=> {navigate( "/deleteCustomer/" + custId)}}>DELETE</Button><br/>
                <Button variant={"contained"} onClick={()=> {navigate( "/updateCustomer/" + custId)}}>UPDATE</Button>


                <CardContent key={customer?.id}>
                    <h2> {customer?.firstName}, {customer?.lastName} </h2>
                    <h3>{customer?.email}</h3>
                    <h4>ID: {customer?.id}</h4>
                    <h4>Password: {customer?.password}</h4>
                    <h5>coupons number: {customer?.coupons?.length}</h5>

                </CardContent>


            </Card>



			
        </div>
    );
}

export default OneCustomerDetails;
