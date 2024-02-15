import "./CouponsByPrice.css";
import {Box, Button, Slider, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../services/CompanyService";
import errorHandler from "../../../services/ErrorHandler";
import CouponCard from "../CouponCard/CouponCard";
import {useForm} from "react-hook-form";
import {authStore, couponStore} from "../../../Redux/OurStore";
import {useNavigate} from "react-router-dom";



function CouponsByPrice(): JSX.Element {


    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const allCoupons= couponStore.getState().value;
    const [sliderValue, setSliderValue] = useState<number>(1);
    const [maxPrice, setMaxPrice ] = useState<number>(0)
    const navigate = useNavigate();

    const handleSliderChange = (event: Event, price: number | number []) => {
        setSliderValue(price as number);
        getMaxPriceList(price as number)
    }

    useEffect(() => {
        console.log("coupons length" + allCoupons.length)
        setCoupons(allCoupons.filter((c)=> c.price < sliderValue))
        setMaxPrice((Math.max(...allCoupons.map(c => c.price)))+100) ;


        console.log("max price" + maxPrice)
    }, [allCoupons, maxPrice]);

    function getMaxPriceList(price: number) {

            //setCoupons(allCoupons.filter((c)=> c.price < sliderValue))
            companyService.getCouponsByMAxPrice(price)
                .then(c => setCoupons(c))
                .catch(err => errorHandler.showError(err));
    }


    return (
        <div className="CouponsByPrice">
            <Button variant={"contained"} onClick={() => navigate(-1)}  > Back  </Button>

            <Box className={"slider"} sx={{ width: 300, padding: 2 }}>
                <Typography gutterBottom>Coupons By Price</Typography>
                <Slider
                    value={sliderValue}
                    onChange={handleSliderChange}
                    aria-label="Slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={maxPrice}
                />
                <Typography gutterBottom>Selected Price: {sliderValue} ₪</Typography>
            </Box>
                    {coupons.map((coupon) => <CouponCard key={coupon.id}
                                                         id={coupon.id}
                                                         title={coupon.title}
                                                         category={coupon.category}
                                                         amount={coupon.amount}
                                                         price={coupon.price} description={coupon.description} startDate={coupon.startDate}
                                                         endDate={coupon.endDate} image={coupon.image} companyId={authStore.getState().user.id}/>

                    )}


        </div>
    );
}

export default CouponsByPrice;
