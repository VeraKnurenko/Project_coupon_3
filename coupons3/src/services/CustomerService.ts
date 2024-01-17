import Coupon from "../Models/Coupon";

import globals from "./globals/Globals";
import axios from "axios";
import Customer from "../Models/Customer";
import {Category} from "../Models/Category";

class CustomerService {

    public async couponPurchase(couponId: number){
        return (await axios.post<number>(globals.urls.customers + "purchase", {param: couponId})).status;
    }


    public async getOneCustomer (customerId: number) {
        return (await axios.get<Customer>(globals.urls.customers + customerId)).data;
    }


    public async getAllCustomerCoupons(customerId : number){
        return (await axios.get<Coupon[]>(globals.urls.customers + "coupons", {params: customerId})).data;//todo check if to change query
    }


    public async getCouponsByCategory(category : Category){
        return (await axios.get<Coupon[]>(globals.urls.customers + "coupons/category?category=" +category)).data;
    }


    public async getCouponsByMaxPrice (price: number){
        return (await axios.get<Coupon[]>(globals.urls.customers + "coupons/price?price=" + price)).data;
    }


    public async deleteCustomer(customerId : number){
        return (await axios.delete(globals.urls.customers + customerId)).status;
    }

}

const customerService = CustomerService
export default customerService;
