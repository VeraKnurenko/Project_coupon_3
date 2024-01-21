import "./UpdateCoupon.css";
import {useForm} from "react-hook-form";
import Coupon from "../../../Models/Coupon";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import companyService from "../../../services/CompanyService";
import {Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {toast} from "react-toastify";
import errorHandler from "../../../services/ErrorHandler";

function UpdateCoupon(): JSX.Element {

    const couponId = +(useParams().coupId!);//todo - fix receiving the param as string???
    const currentDate = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();


    const {
        register, handleSubmit,
        formState: { errors } ,
        setValue
    } = useForm<Coupon>({mode: "onBlur"})

    useEffect(()=>{
        companyService.getOneCoupon(couponId)
            .then( c => {
                if(c){
                    setValue("title", c.title);
                    setValue("description", c.description );
                    setValue("startDate", c.startDate);
                    setValue("endDate", c.endDate);
                    setValue("category", c.category);
                    setValue("amount", c.amount);
                    setValue("price", c.price);
                    setValue("image", c.image)//todo - make image into string

                }
            })
            .catch(err => {errorHandler.showError(err); navigate("/company_coupons")})

    }, [])
    function updateCoupon(coup : Coupon){
        coup.id = couponId;
        companyService.updateCoupon(coup)
            .then(c => {toast.success("Coupon updated");
                navigate("/company_coupons")})
            .catch(err => errorHandler.showError(err));
    }





    return (
        <div className="UpdateCoupon">
            <FormControl>

                <FormLabel>Update Coupon</FormLabel>
                <TextField variant="outlined"
                            id={"title"}
                           error={!!errors.title}
                           helperText={errors.title ? "Title is required and should be at least 2 letters" : null}
                           InputProps={{...register('title', {
                                   required: 'Title is required',
                                   minLength: {value: 2, message: 'Title should be at least 2 letters'},
                               }),
                           }}
                />
                <TextField variant="outlined"  id={"description"}
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
                    name={"category"}
                    {...register('category', { required: 'Please select a category' })}
                >
                    <MenuItem value="FOOD">Food</MenuItem>
                    <MenuItem value="ELECTRICITY">Electricity</MenuItem>
                    <MenuItem value="RESTAURANT">Restaurant</MenuItem>
                    <MenuItem value="VACATION">Vacation</MenuItem>
                    <MenuItem value="BEAUTY">Beauty</MenuItem>
                </Select>
                {errors.category && <p>{errors.category.message}</p>}

                <TextField variant="outlined"  id={"amount"}
                           {...register("amount",{
                               required: 'Amount is required',
                               min: {value: 0, message: 'Please enter amount, must be 0 or more'},
                           })}
                           error={!!errors.amount}
                           helperText={errors.amount? errors.amount.message : null}/>

                <TextField variant="outlined"  id={"price"} type={"number"}
                           {...register("price",{
                               required: 'Price is required, must be more that 0',
                               min: {value: 0, message: 'Please enter Price, must be more than 0'},
                           })}
                           error={!!errors.price}
                           helperText={errors.price? errors.price.message : null}/>
                {/*<TextField type={"file"}  variant="outlined" label={"Image"} id={"image"} {...register("image")}/>*/}
                <input type={"file"} id={"image"} {...register("image")}/>//todo - ass conversion to base 64


                <Button type="submit" onClick={handleSubmit(updateCoupon)}>Add</Button>
            </FormControl>


        </div>
    );
}

export default UpdateCoupon;
