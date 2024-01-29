

import "./CouponCard.css";
import {Card, CardContent} from "@mui/material";
import {NavLink} from "react-router-dom";
import {authStore} from "../../../Redux/OurStore";



interface CouponProps{
    id: number;
    // company: any;
    title: string,
    price: number,
    description: string,
    startDate: Date,
    endDate: Date,
    image: string,

}

function CouponCard(props : CouponProps): JSX.Element {
    console.log("Image:", props.image);
    const decodedImage = atob(props.image);


    return (
        <div className="CouponCard">
           <Card  sx={{display:"flex",flexDirection:"column",maxWidth:350}}>
               {authStore.getState().user && <>
               {authStore.getState().user.role === "CUSTOMER" &&
                   <>    <NavLink className={"navlink"} to={"/purchaseCoupon/"+ props.id} > Purchase</NavLink > </> }
               {authStore.getState().user.role === "COMPANY" && <>
               <NavLink to={"/couponDetails/" + props.id}  > Coupon Details  </NavLink><br/>
               <NavLink to={"/updateCoupon/" + props.id}  > Update Coupon  </NavLink><br/>
               <NavLink to={"/deleteCoupon/" + props.id}  > Delete Coupon  </NavLink></>}
                                    </>}

               <CardContent sx={{minHeight:350, minWidth:250,}}>
                    <h3>{props?.title}</h3>
                    <img src={`data:image/jpeg;base64,${decodedImage}`} alt={props?.title}/><br/>
                    $ price {props?.price} <br/>
                    <div className={"couponStartDate"}>From: {props?.startDate.toString()}</div>
                    <div className={"couponEndDate"}>Promotion ending at: {props?.endDate.toString()}</div>
                    {/*<h5>{props.company}</h5>*/}

                    <h4>id: {props?.id}</h4>

                </CardContent>
            </Card>


        </div>
    );
}

export default CouponCard;
