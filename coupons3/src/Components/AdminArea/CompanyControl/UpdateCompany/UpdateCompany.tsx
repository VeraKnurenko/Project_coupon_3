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
        formState: {errors}, setValue, getValues} = useForm<Company>({mode:"onBlur"})
    const navigate = useNavigate();
    const companyId = +(useParams().compId);
    const  tempCompany : Company= null;

    // const [company, setCompany] = useState<Company>();
    useEffect(() => {
        adminService.getOneCompany(companyId)
            .then( c=>{
                setValue("id", c.id)
                setValue("name", c.name)
                setValue("email", c.email)
                setValue("password", c.password)
                }

            )//comp => setCompany(comp)
            .catch(err => errorHandler.showError(err))
    }, []);

    function updateNewCompany(comp: Company){
         adminService.updateCompany(comp)
            .then(()=> {toast.success("Company Updated!"); navigate("/AllCompanies") })//("ADD NAVIGATE TO COMPANY DETAILS HERE")
            .catch(err => errorHandler.showError(err))
    }

    return (
        <div >
            <div className={"BackButton"} >
                <Button variant={"contained"} onClick={() => navigate(-1)}  > Back  </Button>
            </div>

            <div className="UpdateCompany">
                    <h1>Update Company Form</h1>
                    <FormControl>
                        <FormLabel></FormLabel>

                        <TextField variant={"outlined"}
                                   type={"email"}
                                   error={!!errors.email}
                                   id={"email"}
                                   helperText={errors.email ? "Email is required and should be at least 5 letters" : null}
                                   {...register("email",{
                            required: "Email is required",
                            minLength: {value: 3, message: 'Email must be at least 5 letters long'}
                        })} />

                        <TextField variant={"outlined"}
                                   type={"password"}
                                   error={!!errors.password}

                                   id={"password"}
                                   helperText={errors.password ? "Password is required and should be at least 4 letters/ numbers long" : null}
                                   {...register("password",{
                            required: "Password is required",
                            minLength: {value: 4, message: "Password must be at least 4 letters/ numbers long"}
                        })}/>

                        <Button id={"UpdateButton"} variant={"outlined"} type={"submit"} onClick={handleSubmit(updateNewCompany)}>Update 🏨</Button>
                    </FormControl>
            </div>

        </div>
    );
}



export default UpdateCompany;
