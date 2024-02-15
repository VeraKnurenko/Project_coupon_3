import "./CustomerCouponsByCategory.css";
import {useEffect, useState} from "react";
import {Category} from "../../../Models/Category";
import Coupon from "../../../Models/Coupon";
import {Box, Button, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import customerService from "../../../services/CustomerService";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";
import {useNavigate} from "react-router-dom";
import errorHandler from "../../../services/ErrorHandler";

function CustomerCouponsByCategory(): JSX.Element {
    const [category, setCategory] = useState<string>("FOOD");
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const navigate = useNavigate();


    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value.toString();
        setCategory(selectedValue );
    };

    useEffect(() => {
        if (category != null) {
            customerService.getCouponsByCategory(category)
                .then((response) => setCoupons(response))
                .catch((error) => errorHandler.showError(error));
        }
    }, [category]);

    return (
        <div className="CustomerCouponsByCategory">
            <Button variant={"contained"} onClick={() => navigate(-1)}  > Back  </Button>

            <Box sx={{ minWidth: 120 }}>
                {/*<FormControl fullWidth>*/}
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category.toString()}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value={'FOOD'}>Food</MenuItem>
                    <MenuItem value={'ELECTRICITY'}>Electricity</MenuItem>
                    <MenuItem value={'RESTAURANT'}>Restaurant</MenuItem>
                    <MenuItem value={'VACATION'}>Vacation</MenuItem>
                    <MenuItem value={'BEAUTY'}>Beauty</MenuItem>
                </Select>
                {/*</FormControl>*/}
            </Box>
            <div>
                <h2>Coupons by Category: {category}</h2>
                {coupons.map((coupon) => <CouponCard key={coupon.id} id={coupon.id}
                                                     title={coupon.title}
                                                     price={coupon.price}
                                                     category={coupon.category}
                                                     amount={coupon.amount}
                                                     description={coupon.description}
                                                     startDate={coupon.startDate}
                                                     endDate={coupon.endDate}
                                                     image={coupon.image} companyId={-1}/>)}
            </div>
			
        </div>
    );
}

export default CustomerCouponsByCategory;
