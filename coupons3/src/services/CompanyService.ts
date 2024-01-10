import axios from "axios";
import Company from "../Models/Company";
import Coupon from "../Models/Coupon";
import globals from "./globals/Globals";

class CompanyService {

    public async addCoupon(coupon:Coupon){
        return (await axios.post(globals.urls.companies + "coupon", coupon))
    }

    public async getCompanyDetails(companyId: number){
        return (await axios.get<Company>( globals.urls.companies + " getCompanyDetails",
            {params: {id: companyId}})).data;
    }

    public async getCompanyCoupons(){
        return (await axios.get<Coupon[]>(globals.urls.companies + "coupons")).data
    }




}

const companyService = new CompanyService();
export default companyService;