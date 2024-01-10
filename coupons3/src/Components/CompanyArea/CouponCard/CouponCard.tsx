

import "./CouponCard.css";
import {Card, CardContent} from "@mui/material";



interface CouponProps{
    title: string,
    price: number,
    description: string,
    endDate: Date,
    image: string,

}

function CouponCard(props : CouponProps): JSX.Element {

    return (
        <div className="CouponCard">
           <Card>
                <CardContent>
                    <h3>{props.title}</h3>
                    <img src={props.image} alt={props.title}/><br/>
                    $ price {props.price} <br/>
                    <div className={"couponEndDate"}>Promotion ending at: {props.endDate.toString()}</div>

                </CardContent>
            </Card>


        </div>
    );
}

export default CouponCard;
