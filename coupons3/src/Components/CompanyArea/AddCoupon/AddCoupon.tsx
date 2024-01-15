import "./AddCoupon.css";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import React, {useEffect} from "react";

import {authStore, store} from "../../../Redux/OurStore";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../services/CompanyService";
import Company from "../../../Models/Company";
import {toast} from "react-toastify";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs, {Dayjs} from "dayjs";


function AddCoupon( ): JSX.Element {

    const {
        register, handleSubmit,
        formState,
        getValues
    } = useForm<Coupon>()

    const navigate = useNavigate();
    const company = {
        id: authStore.getState().user.id,
        name: authStore.getState().user.name,
        email: authStore.getState().user.email
    }

    function addNewCoupon(){
        console.log("title: " + getValues("title") )
        console.log("des: " + getValues("description") )
        console.log("start: " + getValues("startDate") )
        console.log("end: " + getValues("endDate") )
        console.log("cat: " + getValues("category") )
        console.log("am: " + getValues("amount") )
        console.log("im: " + getValues("image") )
        const comp: Company = new Company(authStore.getState().user.id,"","","", null)
        const coup: Coupon = new Coupon(
            comp,
            getValues("title"),
            getValues("description"),
            getValues("startDate"),
            getValues("endDate"),
            getValues("category"),
            getValues("amount"),
            getValues("price"),
            getValues("image")

        )

        companyService.addCoupon(coup)
            .then( ()=> toast.success("coupon Added") )
            .catch(err => console.log(err))

    }

    function DatePickerValue() {
           const [value, setValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
       }


    return (
        <div className="AddCoupon">
            <h1>New Coupon Form</h1>
            <FormControl>

                <FormLabel>New Coupon</FormLabel>
                <TextField  variant="outlined" label={"Title"} id={"title"} {...register("title")}/>
                <TextField  variant="outlined" label={"Description"} id={"description"} {...register("description")}/>
                <input type={"date"} defaultValue={Date.now()} name={"startDate"} id={"startDate"}{...register("startDate")}/>
                <input type={"date"} defaultValue={Date.now()} name={"endDate"} id={"endDate"}{...register("endDate")}/>
                <RadioGroup defaultValue="0" id={"categpry"} >
                    <FormControlLabel value="0" control={<Radio {...register("category")} />} label="FOOD"  />
                    <FormControlLabel value="1" control={<Radio {...register("category")} />} label="ELECTRICITY" />
                    <FormControlLabel value="2" control={<Radio {...register("category")} />} label="RESTAURANT" />
                    <FormControlLabel value="3" control={<Radio {...register("category")} />} label="VACATION" />
                    <FormControlLabel value="4" control={<Radio {...register("category")} />} label="BEAUTY" />
                </RadioGroup>
                <TextField  variant="outlined" label={"Amount"} id={"amount"} {...register("amount")}/>
                <TextField  variant="outlined" label={"Price"} id={"price"} {...register("price")}/>
                <TextField type={"file"}  variant="outlined" label={"Image"} id={"image"} {...register("image")}/>




                <Button type="submit"  onClick={handleSubmit(addNewCoupon)} >Add</Button>
            </FormControl>

        </div>
    );
}


export default AddCoupon;
