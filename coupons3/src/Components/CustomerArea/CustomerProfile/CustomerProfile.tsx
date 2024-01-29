import "./CustomerProfile.css";
import {useEffect, useState} from "react";
import Customer from "../../../Models/Customer";
import customerService from "../../../services/CustomerService";
import {authStore} from "../../../Redux/OurStore";
import errorHandler from "../../../services/ErrorHandler";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";

function CustomerProfile(): JSX.Element {

    const [customer, setCustomer] = useState<Customer | undefined>();
    const customerId = authStore.getState().user.id
    // useEffect(() => {
         customerService.getOneCustomer(customerId)
            .then(c => setCustomer(c))
            .catch(err => errorHandler.showError(err))
    // }, []);

    return (
        <div className="CustomerProfile">
            <h1>{customer?.firstName}, {customer?.lastName}</h1>
            <h2>{customer?.email}</h2>
            <h3>{customer?.email}</h3>
            <h5>coupons:{customer?.coupons?.map(coup => <CouponCard key={coup.id}
                                                                           title={coup.title}
                                                                            price={coup.price}
                                                                            description={coup.description}
                                                                           startDate={coup.startDate}
                                                                            endDate={coup.endDate} image={coup.image}  id={coup.id}  />)}</h5>

			
        </div>
    );
}

export default CustomerProfile;
