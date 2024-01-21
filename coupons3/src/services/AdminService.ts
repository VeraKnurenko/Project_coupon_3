import Company from "../Models/Company";
import globals from "./globals/Globals";
import Customer from "../Models/Customer";
import axios from "axios";
import Coupon from "../Models/Coupon";
import {companyStore, couponStore, customerStore} from "../Redux/OurStore";
import {couponSlice} from "../Redux/CouponSlice";
import {companySlice} from "../Redux/CompanySlice";
import {customerSlice} from "../Redux/CustomerSlice";

class AdminService {


    public async addCompany(company: Company) {
        return (await axios.post<Company>(globals.urls.admin + "company", company)).data;
    }

    public async getOneCompany (companyId: number) {
        return (await axios.get<Company>(globals.urls.admin + "company/" + companyId)).data;
    }

    public async getAllCompanies (): Promise<Company[]> {
        if (companyStore.getState().value.length == 0){
            const response = (await axios.get(globals.urls.admin + "companies")).data;
            companyStore.dispatch(companySlice.actions.fetch(response))
            return response;
        }else {
            return companyStore.getState().value;
        }

    }

    public async updateCompany(company: Company) {
        return (await axios.put<Company>(globals.urls.admin + "company", company)).data;
    }

     public async deleteCompany (companyId: number){
        return (await axios.delete(globals.urls.admin + "/company/" + companyId)).data;
    }

    public async addCustomer (customer: Customer) {
        return (await axios.post<Customer>(globals.urls.admin + "customer", customer)).data;
    }

    public async updateCustomer(customer: Customer){
        return (await axios.put<Customer>(globals.urls.admin + "customer", customer)).data;
    }

    public async getOneCustomer (customerId: number) {
        return (await axios.get<Customer>(globals.urls.admin + "customer/" + customerId)).data;
    }

    public async getAllCustomers () {
        if (customerStore.getState().value.length == 0){
            const response =  (await axios.get(globals.urls.admin + "customers")).data;
            customerStore.dispatch(customerSlice.actions.fetch(response))
            return response;
        }else {
            return customerStore.getState().value;
        }

    }

    public async deleteCustomer (customerId: number)  {
        return (await axios.delete<Customer>(globals.urls.admin + "/customer/" + customerId)).data;
    }

   public async getAllCoupons ():Promise<Coupon[]> {
        if (couponStore.getState().value.length == 0 ){//|| (couponStore.getState().lastUpdated > new Date(Date.now() + 60 * 60 * 1000))*\) {
            const response = await axios.get<Coupon[]>(globals.urls.admin + "allcoupons");
            couponStore.dispatch(couponSlice.actions.fetch(response.data));//todo - check how to make it time dependant
            return response.data;
        }else {
            return couponStore.getState().value;
        }

    }
}

const adminService = new AdminService();
export default adminService
