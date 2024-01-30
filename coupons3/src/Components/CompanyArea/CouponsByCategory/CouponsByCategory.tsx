import Coupon from "../../../Models/Coupon";
import {useEffect, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import companyService from "../../../services/CompanyService";
import {Category} from "../../../Models/Category";
import CouponCard from "../CouponCard/CouponCard";

function CouponsByCategory(): JSX.Element {

    const [category, setCategory] = useState<Category>();
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value.toString();
        setCategory(selectedValue as unknown as Category);
        // setCategory(event.target.value as Category);
    };

    useEffect(() => {
        if (category) {
            // Fetch coupons based on the selected category
            companyService.getCouponsByCategory(category)
                .then((response) => setCoupons(response))
                .catch((error) => console.error('Error fetching coupons:', error));
        }
    }, [category]);


    return (
        <div className="CouponsByCategory">
            <Box sx={{ minWidth: 120 }}>
                {/*<FormControl fullWidth>*/}
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={'category'}
                        defaultValue={"FOOD"}
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
                                                     description={coupon.description}
                                                     startDate={coupon.startDate}
                                                     endDate={coupon.endDate}
                                                     image={coupon.image}/>)}
            </div>
        </div>
    );
}


export default CouponsByCategory;
