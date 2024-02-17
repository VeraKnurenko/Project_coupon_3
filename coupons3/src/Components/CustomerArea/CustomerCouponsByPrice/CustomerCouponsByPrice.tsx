import "./CustomerCouponsByPrice.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import errorHandler from "../../../services/ErrorHandler";
import customerService from "../../../services/CustomerService";
import {Box, Slider, Typography} from "@mui/material";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";
import {couponStore, purchaseStore} from "../../../Redux/OurStore";

function CustomerCouponsByPrice(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const allCustomerCouponsIds = purchaseStore.getState().value;
    const allCustomerCoupons = couponStore.getState().value.filter((c) => allCustomerCouponsIds.includes(c.id));
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [sliderValue, setSliderValue] = useState<number>(1);

    const handleSliderChange = (event: Event, price: number | number []) => {
        setSliderValue(price as number);
        getMaxPriceList(price as number)
    }

    useEffect(() => {
        setMaxPrice((Math.max(...allCustomerCoupons.map(c => c.price)))+10) ;
    }, [maxPrice ]);

    function getMaxPriceList(price: number) {
        setCoupons( allCustomerCoupons.filter((c) => c.price <= price))
        // customerService.getCouponsByMaxPrice(price)
        //     .then(c => setCoupons(c))
        //     .catch(err => errorHandler.showError(err));
    }

    return (
        <div >
            <div className={"slider"}>
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
                        max={maxPrice}
                    />
                    <Typography gutterBottom>Selected Price: {sliderValue} ₪</Typography>
                </Box>
            </div>
            <div className="CustomerCouponsByPrice" >
                {coupons?.map((coupon) => <CouponCard key={coupon.id} id={coupon.id}
                                                     title={coupon.title}
                                                     price={coupon.price}
                                                     category={coupon.category}
                                                     amount={coupon.amount}
                                                     description={coupon.description} startDate={coupon.startDate}
                                                     endDate={coupon.endDate} image={coupon.image} companyId={-1}/>

                )}
            </div>


        </div>
    );
}

export default CustomerCouponsByPrice;
