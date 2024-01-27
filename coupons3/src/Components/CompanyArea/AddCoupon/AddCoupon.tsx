import "./AddCoupon.css";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel, MenuItem,
    Radio,
    RadioGroup, Select,
    TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {authStore, store} from "../../../Redux/OurStore";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../services/CompanyService";
import Company from "../../../Models/Company";
import {toast} from "react-toastify";
import errorHandler from "../../../services/ErrorHandler";
import adminService from "../../../services/AdminService";




function AddCoupon( ): JSX.Element {

    const {
        register, handleSubmit,
        formState: { errors } ,
        getValues
    } = useForm<Coupon>({mode: "onBlur"})

    const navigate = useNavigate();
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in the format YYYY-MM-DD

    function addNewCoupon(coup: Coupon){

         console.log("image getValues: " + getValues("image") )
         console.log(authStore.getState().user.id)
         // companyService.getCompanyDetails(authStore.getState().user.id)
         //      .then(c => coup.company = c)
         //      .catch(err => errorHandler.showError(err))
        coup.company = new Company(authStore.getState().user.id,authStore.getState().user.name,"","", null)
        if (coup.image != null) {
            const file = (coup.image as FileList)[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result);

                coup.image = reader.result;//?.toString().split(",")[1];
                console.log("After setting: " + coup.image)
                // companyService.getCompanyDetails(authStore.getState().user.id)
                //     .then(c => coup.company = c)
                //     .catch(err => errorHandler.showError(err))
                console.log(coup)
                companyService.addCoupon(coup)
                    .then( ()=> {toast.success("coupon Added"); navigate("/company_coupons") })
                    .catch(err => errorHandler.showError(err));

            };
            reader.readAsDataURL(file);
        }
    }


    return (
        <div className="AddCoupon">
            <h1>New Coupon Form</h1>
           <FormControl>

                <FormLabel>New Coupon</FormLabel>
                <TextField variant="outlined"
                           label={"Title"} id={"title"}
                           error={!!errors.title}
                           helperText={errors.title ? "Title is required and should be at least 2 letters" : null}
                           InputProps={{...register('title', {
                                   required: 'Title is required',
                                   minLength: {value: 2, message: 'Title should be at least 2 letters'},
                               }),
                           }}
                           />
                <TextField variant="outlined" label={"Description"} id={"description"}
                            error={!!errors.description}
                           helperText={errors.description ? 'Description is required and must be at least 2 letters' : null }
                           InputProps={{...register("description", {
                                    required : true,
                                   minLength: {value: 2, message: 'Description is required and must be at least 2 letters' },
                                   })}}
                           />
                <input type={"date"} defaultValue={currentDate} name={"startDate"} id={"startDate"}
                       {...register("startDate",{
                           required: 'Start Date is required, must be today or Later' ,
                           min: currentDate,
                       })}/>
                {errors.startDate && <span>{errors.startDate.message}</span>}
                <input type={"date"} defaultValue={currentDate} name={"endDate"} id={"endDate"}
                       {...register("endDate", {
                           required: 'End Date is required, ust be in the future',
                           min: currentDate
                       })}/>
                {errors.endDate && <span>{errors.endDate.message}</span>}


                <InputLabel id="category-label"></InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    defaultValue={"FOOD"}
                    {...register('category', { required: 'Please select a category' })}
                >
                    <MenuItem value="FOOD">Food</MenuItem>
                    <MenuItem value="ELECTRICITY">Electricity</MenuItem>
                    <MenuItem value="RESTAURANT">Restaurant</MenuItem>
                    <MenuItem value="VACATION">Vacation</MenuItem>
                    <MenuItem value="BEAUTY">Beauty</MenuItem>
                </Select>
                {errors.category && <p>{errors.category.message}</p>}

                <TextField variant="outlined" label={"Amount"} id={"amount"}
                           {...register("amount",{
                               required: 'Amount is required',
                               min: {value: 0, message: 'Please enter amount, must be 0 or more'},
                           })}
                error={!!errors.amount}
                helperText={errors.amount? errors.amount.message : null}/>

                <TextField variant="outlined" label={"Price"} id={"price"} type={"number"}
                           {...register("price",{
                               required: 'Price is required, must be more that 0',
                               min: {value: 0, message: 'Please enter Price, must be more than 0'},
                           })}
                error={!!errors.price}
                helperText={errors.price? errors.price.message : null}/>
                {/*<TextField type={"file"}  variant="outlined" label={"Image"} id={"image"} {...register("image")}/>*/}
                <input type={"file"} id={"image"} {...register("image")}/>//todo - ass conversion to base 64


                <Button type="submit" onClick={handleSubmit(addNewCoupon)}>Add</Button>
            </FormControl>

        </div>
    );
}


export default AddCoupon;
