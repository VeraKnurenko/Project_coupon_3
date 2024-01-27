import "./DeleteCompany.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import adminService from "../../../../services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../../services/ErrorHandler";

function DeleteCompany(): JSX.Element {
    const companyId = +(useParams().compId!);
    console.log('deleteCompanyId: '+ companyId);
    const navigate = useNavigate();
    const confirmation = window.confirm("Are you sure you want to delete this Company?");
    useEffect(() => {
        if(confirmation){
            adminService.deleteCompany(companyId)
                .then(() => {
                    toast.success("Company Deleted");
                    navigate("/AllCompanies")
                })
                .catch(err => errorHandler.showError(err))
        }
    }, []);






    return (
        <div className="DeleteCompany">
			
        </div>
    );
}

export default DeleteCompany;
