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
        const response = (await axios.post<Company>(globals.urls.admin + "company", company)).data;
        companyStore.dispatch(companySlice.actions.add(response))
        return response;
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
        const response = (await axios.put<Company>(globals.urls.admin + "company", company)).data;
        companyStore.dispatch(companySlice.actions.update(company))
        return response;
    }

     public async deleteCompany (companyId: number){
         await axios.delete(globals.urls.admin + "company/" + companyId);
         companyStore.dispatch(companySlice.actions.remove(companyId));
    }

    public async addCustomer (customer: Customer) {
        const response = (await axios.post<Customer>(globals.urls.admin + "customer", customer)).data;
        customerStore.dispatch(customerSlice.actions.add(response));
        return response;

    }

    public async updateCustomer(customer: Customer){
        const response = (await axios.put<Customer>(globals.urls.admin + "customer", customer)).data;
        customerStore.dispatch(customerSlice.actions.update(customer));
        return response;
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
        const response =   (await axios.delete<Customer>(globals.urls.admin + "customer/" + customerId));
        customerStore.dispatch(customerSlice.actions.remove(customerId));

    }

   public async getAllCoupons () {
            return (await axios.get<Coupon[]>(globals.urls.admin + "allcoupons")).data;
   }
}

const adminService = new AdminService();
export default adminService
