import "./CouponsByPrice.css";
import {Box, Slider, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../services/CompanyService";
import errorHandler from "../../../services/ErrorHandler";
import CouponCard from "../CouponCard/CouponCard";
import {useForm} from "react-hook-form";



function CouponsByPrice(): JSX.Element {
    // function valuetext(value: number) {
    //     return `${value}$`;
    // }

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [sliderValue, setSliderValue] = useState<number>(1);

    const handleSliderChange = (event: Event, price: number | number []) => {
        setSliderValue(price as number);
        getMaxPriceList(price as number)
    }

    function getMaxPriceList(price: number) {
            console.log(price)
            companyService.getCouponsByMAxPrice(price)
                .then(c => setCoupons(c))
                .catch(err => errorHandler.showError(err));

    }


    return (
        <div className="CouponsByPrice">
            <Box sx={{ width: 300, padding: 2 }}>
                <Typography gutterBottom>Coupons By Price</Typography>
                <Slider
                    value={sliderValue}
                    onChange={handleSliderChange}
                    aria-label="Slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={110}
                />
                <Typography gutterBottom>Selected Price: {sliderValue}</Typography>
            </Box>
                    {coupons.map((coupon) => <CouponCard key={coupon.id} id={coupon.id} title={coupon.title}
                                                         price={coupon.price} description={coupon.description} startDate={coupon.startDate}
                                                         endDate={coupon.endDate} image={coupon.image}/>

                    )}


        </div>
    );
}

export default CouponsByPrice;
