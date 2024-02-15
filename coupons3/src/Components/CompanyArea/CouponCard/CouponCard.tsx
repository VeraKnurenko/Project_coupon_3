

import "./CouponCard.css";
import {Button, Card, CardContent} from "@mui/material";
import {NavLink} from "react-router-dom";
import {authStore, purchaseStore} from "../../../Redux/OurStore";
import {Category} from "../../../Models/Category";
import {useEffect, useState} from "react";



interface CouponProps{
    id: number;
    companyId: number;
    title: string,
    category: Category,
    price: number,
    amount: number,
    description: string,
    startDate: Date,
    endDate: Date,
    image: string,

}

function CouponCard(props : CouponProps): JSX.Element {
   const [couponIds, setCouponIds] = useState<number[]>(purchaseStore.getState().value)
    const decodedImage = atob(props.image);

    useEffect(() => {
        purchaseStore.subscribe(()=>{
            setCouponIds(purchaseStore.getState().value)
        })

    }, []);

   function isAlreadyPurchased() : boolean {
      return couponIds.includes(props.id)
   }




    return (
        <div className="CouponCard">

            <Card  sx={{display:"flex",flexDirection:"column",maxWidth:350}}>
               {authStore.getState().user && <>
               {(authStore.getState().user.role === "CUSTOMER" && !isAlreadyPurchased() && props.amount > 0)&&
                   <><Button className={"PurchaseButton"} variant={"contained"} component={NavLink} to={"/purchaseCoupon/"+ props.id} > Buy </Button > </> }
               {(authStore.getState().user.role === "COMPANY" && authStore.getState().user.id == props.companyId) &&  <>
               <Button className={"DetailsButton"} variant={"contained"} component={NavLink} to={"/couponDetails/" + props.id}  > Details  </Button>
               <Button className={"UpdateButton"} variant={"contained"} component={NavLink} to={"/updateCoupon/" + props.id}  > Update Coupon  </Button><br/>
               <Button className={"DeleteButton"} variant={"contained"} component={NavLink} to={"/deleteCoupon/" + props.id}  > Delete Coupon  </Button></>}
                                    </>}

               <CardContent sx={{minHeight:350, minWidth:250,}}>
                    <h2>{props?.title}</h2>
                    <img src={`data:image/jpeg;base64,${decodedImage}`} alt={props?.title}/>
                   <h3> ₪ price {props?.price} </h3>
                   <h3>  {(props?.amount > 0) ? "Only " + props.amount +  " left!! " : "No Coupons left to purchase" } </h3>
                   <h5>{props?.category.toString()}</h5>
                    <div className={"couponStartDate"}>From: {props?.startDate.toString()}</div>
                    <div className={"couponEndDate"}>Promotion ending at: {props?.endDate.toString()}</div>
                    {/*<h5>{props.company}</h5>*/}

                    {/*<h4>id: {props?.id}</h4>*/}

                </CardContent>
            </Card>


        </div>
    );
}

export default CouponCard;
