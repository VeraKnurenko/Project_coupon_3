import "./AddCustomer.css";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import React from "react";
import {useForm} from "react-hook-form";
import Customer from "../../../../Models/Customer";
import adminService from "../../../../services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../../services/ErrorHandler";
import {useNavigate} from "react-router-dom";

function AddCustomer(): JSX.Element {

    const {register, handleSubmit,
        formState :{errors}, getValues}= useForm<Customer>({mode: "onBlur"});
    const navigate = useNavigate();
    function addNewCustomer(custom : Customer){
            console.log(custom)
            adminService.addCustomer(custom)
                .then(()=>{toast.success("customer added"); navigate("/AllCustomers") })
                .catch(err => errorHandler.showError(err))
    }

    return (
        <div className="AddCustomer">
            <h1>New Customer Form</h1>
            <FormControl>
                <FormLabel>New Customer</FormLabel>
                <TextField variant="outlined"
                           label={"FirstName"} id={"firstName"}
                           error={!!errors.firstName}
                           helperText={errors.firstName ? "First Name is required and should be at least 2 letters" : null}
                           InputProps={{...register('firstName', {
                                   required: 'First Name is required',
                                   minLength: {value: 2, message: 'First Name should be at least 2 letters'},
                               }),
                           }}
                />
                <TextField variant="outlined"
                           label={"LastName"} id={"lastName"}
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
                           label={"Email"}
                           error={!!errors.email}
                           helperText={errors.email ? "Email is required and should be at least 5 letters" : null}
                           id={"email"} {...register("email",{
                               required: "Email is required",
                               minLength: {value: 5, message: 'Email must be at least 5 letters long'}
                })} />
                <TextField variant={"outlined"}
                           type={"password"}
                           label={"Password"}
                           error={!!errors.password}
                           helperText={errors.password ? "Password is required and should be at least 4 letters" : null}
                           id={"password"}
                           {...register("password",{
                    required: "Password is required",
                    minLength: {value: 4, message: "Password must be at least 4 letters/ numbers long"}
                })}/>

                <Button type={"submit"} onClick={handleSubmit(addNewCustomer)}>Add 👩‍🚀</Button>
            </FormControl>
			
        </div>
    );
}

export default AddCustomer;
