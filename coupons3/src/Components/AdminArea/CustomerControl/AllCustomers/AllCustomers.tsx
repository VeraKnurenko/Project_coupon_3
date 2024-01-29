import "./AllCustomers.css";
import {useEffect, useState} from "react";
import Customer from "../../../../Models/Customer";
import adminService from "../../../../services/AdminService";
import errorHandler from "../../../../services/ErrorHandler";
import {Button, Card} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";

function AllCustomers(): JSX.Element {

    const [customers, setCustomers] = useState<Customer[]>([]);
    const navigate = useNavigate();
    const [flag, setFlag] = useState<boolean>(false);

    useEffect(() => {
        adminService.getAllCustomers()
            .then(c => setCustomers(c))
            .catch(err => errorHandler.showError(err))
    }, [flag]);


    function addCustomer(){
        navigate("/addCustomer")
    }


    return (
        <div className="AllCustomers">
            <Button variant={"contained"} onClick={addCustomer}>Add 👩‍🚀</Button><br/>

            {customers.length == 0 ? <h1>No customers yet</h1> : <>
            {customers?.map(c => <Card key={c.id}>
              <NavLink to={"/AllCustomers/" + c.id}>
                  <h2>{c.firstName}   {c.lastName}</h2>
              </NavLink>
                 <h3>{c.email}</h3>
                <Button variant={"contained"} onClick={()=> {navigate( "/updateCustomer/" + c.id)}}>UPDATE</Button><br/>
                <Button variant={"outlined"} onClick={()=> {navigate( "/deleteCustomer/" + c.id); setFlag(!flag)}}>DELETE</Button><br/>

            </Card>)}
            </>}
			
        </div>
    );
}

export default AllCustomers;
