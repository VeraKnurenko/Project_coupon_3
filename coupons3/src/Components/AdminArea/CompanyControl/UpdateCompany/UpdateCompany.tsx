import "./UpdateCompany.css";
import {useForm} from "react-hook-form";
import Company from "../../../../Models/Company";
import {useNavigate, useParams} from "react-router-dom";
import adminService from "../../../../services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../../services/ErrorHandler";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";

function UpdateCompany(): JSX.Element {

    const {register, handleSubmit,
        formState: {errors}, setValue, getValues} = useForm<Company>()
    const navigate = useNavigate();
    const companyId = +(useParams().compId);

    // const [company, setCompany] = useState<Company>();
    useEffect(() => {
        adminService.getOneCompany(companyId)
            .then( c=>{
                setValue("email", c.email)
                setValue("password", c.password)
                }

            )//comp => setCompany(comp)
            .catch(err => errorHandler.showError(err))
    }, []);

    function updateNewCompany(comp: Company){
        console.log(comp)
        adminService.updateCompany(comp)
            .then(()=> {toast.success("Company Updated!"); })//("ADD NAVIGATE TO COMPANY DETAILS HERE")
            .catch(err => errorHandler.showError(err))
    }

    return (
        <div className="UpdateCompany">
            <h1>Update Company Form</h1>
            <FormControl>
                <FormLabel>Update Company</FormLabel>
                {/*<TextField variant="outlined"*/}
                {/*           label={"Name"} id={"name"}*/}
                {/*           error={!!errors.name}*/}
                {/*           helperText={errors.name ? "Name is required and should be at least 2 letters" : null}*/}
                {/*           InputProps={{...register('name', {*/}
                {/*                   required: 'Name is required',*/}
                {/*                   minLength: {value: 2, message: 'Name should be at least 2 letters'},*/}
                {/*               }),*/}
                {/*           }}*/}
                {/*/>*/}

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

                <Button type={"submit"} onClick={handleSubmit(updateNewCompany)}>Update 🏨</Button>
            </FormControl>

        </div>
    );
}



export default UpdateCompany;
