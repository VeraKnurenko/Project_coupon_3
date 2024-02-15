import "./CompanyDetails.css";
import React, {useEffect, useState} from "react";
import Company from "../../../Models/Company";
import {authStore} from "../../../Redux/OurStore";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import companyService from "../../../services/CompanyService";
import errorHandler from "../../../services/ErrorHandler";
import {NavLink, useNavigate, useParams} from "react-router-dom";

function CompanyDetails(): JSX.Element {

    const [company, setCompany] = useState<Company>();
    const navigate = useNavigate();


    useEffect(() => {
            companyService.getCompanyDetails(authStore.getState().user.id)
                .then(comp => setCompany(comp) )
                .catch(err => errorHandler.showError(err))
    }, []);


    return (
        <div className="CompanyDetails">
            <Button variant={"contained"} onClick={() => navigate(-1)}  > Back  </Button>



            { company  &&
                <Card >
                    <CardContent>
                        <h1>{company.name}</h1>
                        <h3>{company.email}</h3>
                        <h4>{company.password}</h4>
                    </CardContent>
                    <CardActions>
                        <Button variant={"contained"} component={NavLink} to={"/home"}>Back to home</Button><br/>
                        <Button variant={"contained"} component={NavLink} to="/AddCoupon" >Add Coupon</Button>
                    </CardActions>
                </Card>
            }


        </div>
    );
}

export default CompanyDetails;
