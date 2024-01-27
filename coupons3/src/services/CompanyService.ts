import axios from "axios";
import Company from "../Models/Company";
import Coupon from "../Models/Coupon";
import globals from "./globals/Globals";
import {Category} from "../Models/Category";

class CompanyService {

    public async addCoupon(coupon: Coupon){
        return (await axios.post<Coupon>(globals.urls.companies + "coupon", coupon))
    }

    public async updateCoupon(coupon:Coupon){
        return (await axios.put<Coupon>(globals.urls.companies + "coupon", coupon))
    }

    public async getCompanyCoupons(){
        return (await axios.get<Coupon[]>(globals.urls.companies + "coupons")).data
    }

    public async deleteCoupon(couponId: number){
        return (await axios.delete(globals.urls.companies + "coupons/" + couponId));//DATA?
    }

    public async getCouponsByCategory(category :Category){
        return (await axios.get<Coupon[]>(globals.urls.companies + "coupons/category",
            {params: {category:category}})).data;
    }

    public async getCouponsByMAxPrice(price : number){
        return (await axios.get<Coupon[]>(globals.urls.companies + "coupons/price",
            {params : price})).data
    }


    public async getCompanyDetails(companyId: number){
        return (await axios.get<Company>( globals.urls.companies + "getCompanyDetails",
            {params: {id: companyId}})).data;
    }

    public async getOneCoupon(couponId: number){
        return (await axios.get<Coupon>(globals.urls.companies + "coupon/"+ couponId)).data
    }

}

const companyService = new CompanyService();
export default companyService;