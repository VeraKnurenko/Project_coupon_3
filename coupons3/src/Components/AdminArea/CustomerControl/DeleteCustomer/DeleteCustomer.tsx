import "./DeleteCustomer.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import adminService from "../../../../services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../../services/ErrorHandler";

function DeleteCustomer(): JSX.Element {

    const customerId = +(useParams().custId!);
    console.log('deleteCustomerId: '+ customerId)
    const navigate = useNavigate();
    const confirmation = window.confirm("Are you sure you want to delete this customer?");
    useEffect(() => {
        if (confirmation) {
            adminService.deleteCustomer(customerId)
                .then(() => {
                    toast.success("Customer Deleted");
                    navigate("/AllCustomers")
                })
                .catch(err => errorHandler.showError(err));
        }

    }, []);



    return (
        <div className="DeleteCustomer">
			
        </div>
    );
}

export default DeleteCustomer;
