import "./AllCompanies.css";
import {useEffect, useState} from "react";
import Company from "../../../../Models/Company";
import adminService from "../../../../services/AdminService";
import errorHandler from "../../../../services/ErrorHandler";
import {Button, Card, CardContent} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";

function AllCompanies(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>([])
    const navigate = useNavigate();
    useEffect(() => {
        adminService.getAllCompanies()
            .then(c => setCompanies(c))
            .catch(err => errorHandler.showError(err))
    }, []);

    function updateComp(compId:  number){
        navigate("updateCompany/" + compId)
    }


    return (
        <div className="AllCompanies">
            <div>
                <NavLink to={"/AddCompany"}>Add</NavLink>//todo - change to Button
            {companies?.map(company =><Card key={company.id} >
                <CardContent>
                    <h1>{company.name}</h1>
                    <h3>{company.email}</h3>
                    <h3>{company.password}</h3>
                    <h4>id: {company.id}</h4>
                </CardContent>
                <Button onClick={() => updateComp(company.id)}>Update</Button> //todo - write method
                <Button>Delete</Button> //todo - write method

            </Card> )}
            </div>

			
        </div>
    );
}

export default AllCompanies;
