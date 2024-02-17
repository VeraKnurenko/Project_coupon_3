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
        formState: {errors}, getValues} = useForm<Company>({mode:"onBlur"})
    const navigate = useNavigate();

     function addNewCompany(comp: Company){
        console.log(comp)
         adminService.addCompany(comp)
             .then(()=> {toast.success("Company Added!"); navigate("/AllCompanies")})
             .catch(err => errorHandler.showError(err))
     }


    return (
        <div >
            <div className={"BackButton"}>
                <Button  variant={"contained"} onClick={() => navigate(-1)}  > Back  </Button><br/>
            </div>

            <div className="AddCompany">

            <h1>New Company Form</h1>

                <FormControl className={"AddCompanyForm"}>
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
                               id={"email"}
                               helperText={errors.email ? "Email is required and should be at least 5 letters" : null}
                               InputProps={{...register('email', {
                                       required: 'Email is required',
                                       minLength: {value: 5, message: 'Email should be at least 5 letters'},
                                   }),

                    }} />
                    <TextField variant={"outlined"}
                               type={"password"}
                               error={!!errors.password}
                               label={"Password"}
                               id={"password"}
                               helperText={errors.password ? "Password is required and should be at least 3 letters/ numbers long" : null}
                               {...register("password",{
                        required: "Password is required",
                        minLength: {value: 4, message: "Password must be at least 3 letters/ numbers long"}
                    })}/>

                    <Button id={"AddButton"} variant={"outlined"} type={"submit"} onClick={handleSubmit(addNewCompany)}>Add 🏨</Button>
                </FormControl>
            </div>
			
        </div>
    );
}

export default AddCompany;
