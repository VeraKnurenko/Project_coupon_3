import "./CompanyDetails.css";
import {useEffect, useState} from "react";
import companyService from "../../../services/CompanyService";
import ErrorHandler from "../../../services/ErrorHandler";
import Company from "../../../Models/Company";
import {authStore} from "../../../Redux/OurStore";
import {Button, Card, CardActions, CardContent} from "@mui/material";

function CompanyDetails(): JSX.Element {

    const [company, setCompany] = useState<Company>();

    useEffect(() => {
        // if (authStore.getState().user)
            companyService.getCompanyDetails(authStore.getState().user?.id).then(comp =>
                setCompany(comp) ).catch(err => ErrorHandler.showError(err))
    }, []);

    return (
        <div className="CompanyDetails">
            { company &&
                <Card >
                    <CardContent>
                        <h1>{company.name}</h1>
                        <h3>{company.email}</h3>
                    </CardContent>
                    <CardActions>
                        <Button>Back to home</Button>
                    </CardActions>
                </Card>

            }
			
        </div>
    );
}

export default CompanyDetails;
