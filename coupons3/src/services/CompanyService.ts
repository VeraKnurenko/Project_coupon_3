import axios from "axios";
import Company from "../Models/Company";
import Coupon from "../Models/Coupon";
import globals from "./globals/Globals";
import {Category} from "../Models/Category";
import {couponStore} from "../Redux/OurStore";
import {companySlice} from "../Redux/CompanySlice";
import {couponSlice} from "../Redux/CouponSlice";

class CompanyService {

    public async addCoupon(coupon: Coupon){
        return (await axios.post<Coupon>(globals.urls.companies + "coupon", coupon)).data;
    }

    public async updateCoupon(coupon:Coupon){
        return (await axios.put<Coupon>(globals.urls.companies + "coupon", coupon)).data;
    }

    public async getCompanyCoupons(){
        const response = (await axios.get<Coupon[]>(globals.urls.companies + "coupons")).data
        couponStore.dispatch(couponSlice.actions.fetch(response))
        return response;

    }

    public async deleteCoupon(couponId: number){
        return (await axios.delete(globals.urls.companies + "coupons/" + couponId));//DATA?
    }

    public async getCouponsByCategory(category :string){
        return (await axios.get<Coupon[]>(globals.urls.companies + "coupons/category",
            {params: {category:category}})).data;
    }

    public async getCouponsByMAxPrice(price : number){
        return (await axios.get<Coupon[]>(globals.urls.companies + "coupons/price",
            {params :{ price}})).data
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