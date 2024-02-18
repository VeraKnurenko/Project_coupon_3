import "./UpdateCoupon.css";
import {Controller, useForm} from "react-hook-form";
import Coupon from "../../../Models/Coupon";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import companyService from "../../../services/CompanyService";
import {Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {toast} from "react-toastify";
import errorHandler from "../../../services/ErrorHandler";
import {authStore, couponStore} from "../../../Redux/OurStore";
import {Category} from "../../../Models/Category";

function UpdateCoupon(): JSX.Element {

    const coupId = +(useParams().coupId!);
    const currentDate = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState<Coupon>(couponStore.getState().value.find((c)=> {
        return c.id === coupId } ));

    if (coupon ==  undefined) {
        navigate("/company_Coupons")
    }

    const decodedImage = coupon == undefined ? false : atob(coupon.image);
    const cat  = coupon == undefined ? "FOOD" : coupon.category;
    let  isUserProvidedImage : boolean = false;
    const { register, handleSubmit,
        formState: {errors } , setValue,
        getValues, control, watch
    } = useForm<Coupon>({mode: "onBlur", defaultValues:{...coupon}});



    function updateCoupon (coupon: Coupon) {
        if (isUserProvidedImage){
            const fileImage = (getValues('image') as FileList)[0];

            const reader = new FileReader();
            reader.onloadend = async () => {

                const companyId = authStore.getState().user.id;
                const companyDetails =  await companyService.getCompanyDetails(companyId)!;
                const base64Image = reader.result?.toString().split(',')[1];

                const updatedCoupon: Coupon = {
                    id: coupId,
                    company: companyDetails,
                    title: getValues('title'),
                    description: getValues('description'),
                    startDate: getValues('startDate'),
                    endDate: getValues('endDate'),
                    category: getValues('category') as Category,
                    amount: +getValues('amount'),
                    price: +getValues('price'),
                    image: base64Image,
                };

                await companyService.updateCoupon(updatedCoupon)
                    .then(() => {
                        toast.success('Coupon Updated');
                        navigate('/company_coupons')
                    })
                    .catch(err => errorHandler.showError(err));

            };
            reader.readAsDataURL(fileImage);
        }else{

                        coupon.image=null;
                        companyService.updateCoupon(coupon)
                            .then(() => {
                                toast.success('Coupon Updated');
                                navigate('/company_coupons')
                            })
                            .catch(err => errorHandler.showError(err));
        }
    }

    return (
        <div className="UpdateCoupon">
            <Button variant={"contained"} onClick={() => navigate(-1)}  > Back  </Button><br/>
            <div className={"UpdateForm"}>
                <FormControl  >
                    <h1>Update Coupon</h1>

                    <FormLabel></FormLabel>
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
                               required: 'Start Date is required'
                           })}/>
                    {errors.startDate && <span>{errors.startDate.message}</span>}

                    <input type={"date"} defaultValue={currentDate} name={"endDate"} id={"endDate"}
                           {...register("endDate", {
                               required: 'End Date is required, ust be in the future',
                               min: {value: currentDate, message: "End date must be in the future"}
                           })}/>
                    {errors.endDate && <span>{errors.endDate.message}</span>}


                    <InputLabel id="category-label"></InputLabel>

                    <Controller control={control}
                                name={"category"}
                                render={({field: {onChange}}) => (
                    <Select
                        labelId="category-label"
                        id="category"
                        defaultValue={cat}
                        // value={Category[value]}
                        className={"category-field"}
                        name={"category"}
                        {...register('category', { required: 'Please select a category' })} >
                        <MenuItem value="FOOD">Food</MenuItem>
                        <MenuItem value="ELECTRICITY">Electricity</MenuItem>
                        <MenuItem value="RESTAURANT">Restaurant</MenuItem>
                        <MenuItem value="VACATION">Vacation</MenuItem>
                        <MenuItem value="BEAUTY">Beauty</MenuItem>
                    </Select>
                       )}
                    />

                    {errors.category && <p>{errors.category?.message}</p>}


                    <TextField variant="outlined"  id={"amount"} type={"number"}
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
                    <img title={"image"} src={`data:image/jpeg;base64,${decodedImage}`} id={"imageView"}  />
                    <input type={"button"} value={"clear image"} id={"clear"} onClick={()=>{setValue("image", null)}}/>
                    {/*<TextField type={"file"}  variant="outlined" label={"Image"} id={"image"} {...register("image")}/>*/}
                    <input type={"file"} id={"image"} {...register("image")}
                           onChange={(event)=>{isUserProvidedImage=true}}
                    />
                    <Button type="submit" onClick={handleSubmit(updateCoupon)}>Update</Button>
            </FormControl>
            </div>


        </div>
    );
}


export default UpdateCoupon;
