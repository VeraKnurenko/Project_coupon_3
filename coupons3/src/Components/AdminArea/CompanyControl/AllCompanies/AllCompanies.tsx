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

    // function updateComp(compId:  number){
    //     navigate("updateCompany/" + compId)
    // }



    return (
        <div className="AllCompanies">
            <Button variant={"contained"} onClick={() => navigate(-1)}  > Back  </Button>

            <div className={"CompanyInAdmin"}>
                <div className={"AddButton"}>
                 <Button variant={"contained"} onClick={()=>{navigate("/AddCompany")}}>Add Company</Button> <br/>
                </div>
            {companies?.map(company =><Card key={company.id} >
                <CardContent className={"company"}>
                    <h1>{company.name}</h1>
                    <h3>{company.email}</h3>
                    {/*<h3>{company.password}</h3>*/}
                    {/*<h4>id: {company.id}</h4>*/}
                </CardContent>
                <Button variant={"contained"} onClick={() => navigate("/oneCompany/" + company.id)}>Company Details</Button><br/>
                <Button variant={"contained"} onClick={() => navigate("updateCompany/" + company.id)}>Update</Button><br/><br/>

                <Button variant={"outlined"} onClick={() => navigate("deleteCompany/" + company.id)}>Delete</Button>


            </Card> )}
            </div>

			
        </div>
    );
}

export default AllCompanies;
