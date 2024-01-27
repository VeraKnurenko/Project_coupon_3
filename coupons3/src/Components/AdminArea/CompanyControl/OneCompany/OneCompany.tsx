import "./OneCompany.css";
import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Company from "../../../../Models/Company";
import adminService from "../../../../services/AdminService";
import errorHandler from "../../../../services/ErrorHandler";

function OneCompany(): JSX.Element {

    const companyId = +(useParams().compId!);
    const  [company, setCompany] = useState<Company | null>()

    useEffect(() => {
        adminService.getOneCompany(companyId)
            .then(company => setCompany(company) )
            .catch(err => errorHandler.showError(err))
    }, []);



    return (
        <div className="OneCompany">
            { company    &&
                <Card >
                    <CardContent>
                        <h1>{company.name}</h1>
                        <h3>{company.email}</h3>
                        <h4>{company.password}</h4>
                        <h4>{company.id}</h4>
                        <h4>Number of coupons: {company.companyCoupons.length}</h4>
                    </CardContent>
                    <CardActions>
                        <Button variant={"contained"} component={NavLink} to={"/home"}>Back to home</Button>
                    </CardActions>
                </Card>

            }
			
        </div>
    );
}

export default OneCompany;
