import "./UpdateCustomer.css";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import adminService from "../../../../services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../../services/ErrorHandler";
import {useForm} from "react-hook-form";
import Customer from "../../../../Models/Customer";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";

function UpdateCustomer(): JSX.Element {

    const customerId = +(useParams().custId!);
    console.log('updateCustomerId: '+ customerId)
    const {register, handleSubmit, formState: {errors},
    getValues, setValue} = useForm<Customer>({mode: "onBlur"})
    const navigate = useNavigate();
    const [flag, setFlag] = useState<boolean>(false)

    useEffect(() => {
            adminService.getOneCustomer(customerId)
                .then( c => {
                    setValue("id", c.id)
                    setValue("firstName", c.firstName)
                    setValue("lastName", c.lastName)
                    setValue("email", c.email)
                    setValue("password", c.password)
                })
                .catch(err => errorHandler.showError(err));
            }, [flag]);

    function updateOneCustomer( cust: Customer) {
        adminService.updateCustomer(cust)
            .then(()=>{toast.success("customer Updated");
                setFlag(!flag);
                navigate("/AllCustomers");
               })
            .catch(err => errorHandler.showError(err))
    }


    return (
        <div className="UpdateCustomer">
            <h1>Update Customer</h1>
            <FormControl>
                <FormLabel>Customer Update</FormLabel>
                <TextField variant="outlined"
                           id={"firstName"}
                           error={!!errors.firstName}
                           helperText={errors.firstName ? "First Name is required and should be at least 2 letters" : null}
                           InputProps={{...register('firstName', {
                                   required: 'First Name is required',
                                   minLength: {value: 2, message: 'First Name should be at least 2 letters'},
                               }),
                           }}
                />
                <TextField variant="outlined"
                           id={"lastName"}
                           error={!!errors.lastName}
                           helperText={errors.lastName ? "Last Name is required and should be at least 2 letters" : null}
                           InputProps={{...register('lastName', {
                                   required: 'Last Name is required',
                                   minLength: {value: 2, message: 'Last Name should be at least 2 letters'},
                               }),
                           }}
                />
                <TextField variant={"outlined"}
                           type={"email"}

                           error={!!errors.email}
                           id={"email"} {...register("email",{
                    required: "Email is required",
                    minLength: {value: 3, message: 'Email must be at least 3 letters long'}
                })} />
                <TextField variant={"outlined"} type={"password"}  id={"password"} {...register("password",{
                    required: "Password is required",
                    minLength: {value: 3, message: "Password must be at least 3 letters/ numbers long"}
                })}/>

                <Button variant={"contained"} type={"submit"} onClick={handleSubmit(updateOneCustomer)}>Update 👩‍🚀</Button>
            </FormControl>
			
        </div>
    );
}

export default UpdateCustomer;
