import Coupon from "../Models/Coupon";

import globals from "./globals/Globals";
import axios from "axios";
import Customer from "../Models/Customer";
import {Category} from "../Models/Category";
import {purchaseStore} from "../Redux/OurStore";
import {clear, purchaseSlice} from "../Redux/PurchaseSlice";

class CustomerService {

    public async couponPurchase(couponId: number){
        return (await axios.post<number>(globals.urls.customers + "purchase?couponId=" + couponId));//, {param: couponId}
    }


    public async getOneCustomer (customerId: number) {
        console.log("yyy")
        return (await axios.get<Customer>(globals.urls.customers + customerId)).data;
    }


    public async getAllCustomerCoupons(customerId : number){
        let response : Coupon[] = [];
            response = (await axios.get<Coupon[]>(globals.urls.customers + "coupons")).data;
            purchaseStore.dispatch(purchaseSlice.actions.fetch(response))
           return response;
    }


    public async getCouponsByCategory(category : string){
        return (await axios.get<Coupon[]>(globals.urls.customers + "coupons/category?category=" +category)).data;
    }


    public async getCouponsByMaxPrice (price: number){
        return (await axios.get<Coupon[]>(globals.urls.customers + "coupons/price?price=" + price)).data;
    }


    public async deleteCustomer(customerId : number){
        return (await axios.delete(globals.urls.customers + customerId)).status;
    }

    public async logout(){
        purchaseStore.dispatch(clear())
    }

}

const customerService = new CustomerService();
export default customerService;
