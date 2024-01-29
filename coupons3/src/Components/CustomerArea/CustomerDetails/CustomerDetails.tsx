import "./CustomerDetails.css";
import {useEffect, useState} from "react";
import Customer from "../../../Models/Customer";
import customerService from "../../../services/CustomerService";
import {authStore} from "../../../Redux/OurStore";
import errorHandler from "../../../services/ErrorHandler";
import {CardContent} from "@mui/material";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";

function CustomerDetails(): JSX.Element {

    const [customer, setCustomer] = useState<Customer | undefined>();

    useEffect(()=>{
        customerService.getOneCustomer(authStore.getState().user.id)
            .then(c => {setCustomer(c);
                                    })
            .catch(err => errorHandler.showError(err) )
    }, []);

    return (
        <div className="CustomerDetails">

            Id: { authStore.getState().user.id}<br/>
           Name: { authStore.getState().user.name}<br/>
           Email: { authStore.getState().user.email}<br/>
          Role: { authStore.getState().user.role}<br/>
           FN: { authStore.getState().user.firstName}<br/>
            LN: { authStore.getState().user.lastName}<br/>

            {customer && <>
                <CardContent>

                    <h1> {customer.firstName}, {customer.lastName} </h1>
                    <h3>{customer.email}</h3>
                    <h4>ID: {customer.id}</h4>
                    <h4>Password: {customer.password}</h4>
                    <h5>coupons number: {customer.coupons?.length}</h5>
                    <h5>coupons:{customer.coupons?.map(coup => <CouponCard key={coup.id}
                                                                                   title={coup.title}
                                                                                    price={coup.price}
                                                                                    description={coup.description}
                                                                                   startDate={coup.startDate}
                                                                                    endDate={coup.endDate}
                                                                                    image={coup.image}  id={coup.id}  />)}</h5>
                </CardContent>
                </>

            }


        </div>
    );
}

export default CustomerDetails;
