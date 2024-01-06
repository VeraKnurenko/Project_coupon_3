import TokenAxios from "./TokenAxios";
import Coupon from "../Models/Coupon";
import globals from "./globals/Globals";

export const getCouponsByMaxPrice = async (price: number)=>{
    return await TokenAxios.get<Coupon[]>(globals.urls.customers + "coupons/price?price=" + price );
}