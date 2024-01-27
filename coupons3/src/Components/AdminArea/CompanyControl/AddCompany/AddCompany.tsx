import "./AddCompany.css";
import {useForm} from "react-hook-form";
import Company from "../../../../Models/Company";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import React from "react";
import adminService from "../../../../services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../../services/ErrorHandler";
import {useNavigate} from "react-router-dom";

function AddCompany(): JSX.Element {

    const {register, handleSubmit,
        formState: {errors}, getValues} = useForm<Company>()
    const navigate = useNavigate();

     function addNewCompany(comp: Company){
        console.log(comp)
         adminService.addCompany(comp)
             .then(()=> {toast.success("Company Added!"); navigate("/AllCompanies")})
             .catch(err => errorHandler.showError(err))
     }


    return (
        <div className="AddCompany">
            <h1>New Company Form</h1>
            <FormControl>
                <FormLabel>New Company</FormLabel>
                <TextField variant="outlined"
                           label={"Name"} id={"name"}
                           error={!!errors.name}
                           helperText={errors.name ? "Name is required and should be at least 2 letters" : null}
                           InputProps={{...register('name', {
                                   required: 'Name is required',
                                   minLength: {value: 2, message: 'Name should be at least 2 letters'},
                               }),
                           }}
                />

                <TextField variant={"outlined"}
                           type={"email"}
                           label={"Email"}
                           error={!!errors.email}
                           id={"email"} {...register("email",{
                    required: "Email is required",
                    minLength: {value: 3, message: 'Email must be at least 3 letters long'}
                })} />
                <TextField variant={"outlined"} type={"password"} label={"Password"} id={"password"} {...register("password",{
                    required: "Password is required",
                    minLength: {value: 3, message: "Password must be at least 3 letters/ numbers long"}
                })}/>

                <Button type={"submit"} onClick={handleSubmit(addNewCompany)}>Add 🏨</Button>
            </FormControl>
			
        </div>
    );
}

export default AddCompany;
