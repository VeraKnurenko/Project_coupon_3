import "./CompanyDetails.css";
import {useEffect, useState} from "react";
import Company from "../../../Models/Company";
import {authStore} from "../../../Redux/OurStore";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import AddCoupon from "../AddCoupon/AddCoupon";
import companyService from "../../../services/CompanyService";
import errorHandler from "../../../services/ErrorHandler";
import {NavLink, useNavigate} from "react-router-dom";

function CompanyDetails(): JSX.Element {

    const [company, setCompany] = useState<Company>();
    const navigate = useNavigate();

    function addC(){
        navigate("/AddCoupon")
    }

    useEffect(() => {
        // if (authStore.getState().user)
            companyService.getCompanyDetails(authStore.getState().user?.id).then(comp =>
                setCompany(comp) ).catch(err => errorHandler.showError(err))
    }, []);


    return (
        <div className="CompanyDetails">
            companyid: { authStore.getState().user.id}<br/>
            companyName: { authStore.getState().user.name}<br/>
            companyEmail: { authStore.getState().user.email}<br/>
            companyRole: { authStore.getState().user.role}<br/>
            companyFN: { authStore.getState().user.firstName}<br/>
            companyLN: { authStore.getState().user.lastName}<br/>


            { company &&
                <Card >
                    <CardContent>
                        <h1>{company.name}</h1>
                        <h3>{company.email}</h3>
                    </CardContent>
                    <CardActions>
                        <Button>Back to home</Button>//todo - make navigate back to home
                        <Button component={NavLink} to="/AddCoupon" >Add Coupon</Button>//todo - figure out how to navigate to add coupon
                    </CardActions>
                </Card>

            }
			
        </div>
    );
}

export default CompanyDetails;
