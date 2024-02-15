import "./CustomerCouponsByPrice.css";
import {useState} from "react";
import Coupon from "../../../Models/Coupon";
import errorHandler from "../../../services/ErrorHandler";
import customerService from "../../../services/CustomerService";
import {Box, Slider, Typography} from "@mui/material";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";

function CustomerCouponsByPrice(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [sliderValue, setSliderValue] = useState<number>(1);

    const handleSliderChange = (event: Event, price: number | number []) => {
        setSliderValue(price as number);
        getMaxPriceList(price as number)
    }

    function getMaxPriceList(price: number) {
        console.log(price)
        customerService.getCouponsByMaxPrice(price)
            .then(c => setCoupons(c))
            .catch(err => errorHandler.showError(err));
    }

    return (
        <div className="CustomerCouponsByPrice">
            <Box sx={{ width: 300, padding: 2 }}>
                <Typography gutterBottom>Coupons By Price</Typography>
                <Slider
                    id={"slider"}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    aria-label="Slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={1000}
                />
                <Typography gutterBottom>Selected Price: {sliderValue} ₪</Typography>
            </Box>
            {coupons.map((coupon) => <CouponCard key={coupon.id} id={coupon.id}
                                                 title={coupon.title}
                                                 price={coupon.price}
                                                 category={coupon.category}
                                                 amount={coupon.amount}
                                                 description={coupon.description} startDate={coupon.startDate}
                                                 endDate={coupon.endDate} image={coupon.image} companyId={-1}/>

            )}


        </div>
    );
}

export default CustomerCouponsByPrice;
