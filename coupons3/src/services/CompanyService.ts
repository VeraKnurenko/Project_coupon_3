import tokenAxios from "./TokenAxios";
import axios from "axios";
import Company from "../Models/Company";
import {authStore} from "../Redux/OurStore";
import Coupon from "../Models/Coupon";

class CompanyService {
    public async getCompanyDetails(companyId: number){
        return (await axios.get<Company>("http://localhost:8080/company/getCompanyDetails",
            {params: {id: companyId}})).data;
    }

    public async getCompanyCoupons(){
        return (await axios.get<Coupon[]>("http://localhost:8080/company/coupons")).data
    }


}

const companyService = new CompanyService();
export default companyService;