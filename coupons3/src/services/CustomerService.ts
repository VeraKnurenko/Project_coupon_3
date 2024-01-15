import Coupon from "../Models/Coupon";

import globals from "./globals/Globals";
import axios from "axios";

class CustomerService {




    public async getCouponsByMaxPrice (price: number){
        return await axios.get<Coupon[]>(globals.urls.customers + "coupons/price?price=" + price);
    }
}

const customerService = CustomerService
export default customerService;
