import "./OneCompany.css";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Company from "../../../../Models/Company";
import adminService from "../../../../services/AdminService";
import errorHandler from "../../../../services/ErrorHandler";

function OneCompany(): JSX.Element {

    const companyId = +(useParams().compId!);
    const  [company, setCompany] = useState<Company | null>()
    const navigate = useNavigate();


    useEffect(() => {
        adminService.getOneCompany(companyId)
            .then(company => setCompany(company) )
            .catch(err => errorHandler.showError(err))
    }, []);



    return (
        <div >
            <Button variant={"contained"} onClick={() => navigate(-1)}  > Back  </Button>
            <div className="OneCompany">
            { company    &&
                <Card className={"CompanyCard"}>
                    <CardContent>
                        <h1>Name:     {company.name}</h1>
                        <h2>Email:    {company.email}</h2>
                        <h4>Password: {company.password}</h4>
                        <h4> ID:      {company.id}</h4>
                        <h4>Number of coupons: {company.companyCoupons.length}</h4>
                    </CardContent>
                    <CardActions>
                        <Button variant={"contained"} component={NavLink} to={"/AllCompanies"}>Back to All Companies</Button>
                    </CardActions>
                </Card>

            }
            </div>
			
        </div>
    );
}

export default OneCompany;
