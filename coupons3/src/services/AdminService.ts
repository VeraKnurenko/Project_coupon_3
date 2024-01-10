import Company from "../Models/Company";
import globals from "./globals/Globals";
import Customer from "../Models/Customer";
import axios from "axios";
import Coupon from "../Models/Coupon";

class AdminService {


    public async addCompany(company: Company) {
        return await axios.post<Company>(globals.urls.admin + "company", company);
    }

    public async getOneCompany (companyId: number) {
        return await axios.get<Company>(globals.urls.admin + "company/" + companyId);
    }

    public async getAllCompanies () {
        return await axios.get(globals.urls.admin + "companies");
    }

    public async updateCompany(company: Company) {
        return await axios.put<Company>(globals.urls.admin + "company", company)
    }

     public async deleteCompany (companyId: number){
        return await axios.delete(globals.urls.admin + "/company/" + companyId)
    }

    public async addCustomer (customer: Customer) {
        return await axios.post<Customer>(globals.urls.admin + "customer", customer);
    }

    public async updateCustomer(customer: Customer){
        return await axios.put<Customer>(globals.urls.admin + "customer", customer)
    }

    public async getOneCustomer (customerId: number) {
        return await axios.get<Customer>(globals.urls.admin + "customer/" + customerId);
    }

    public async getAllCustomers () {
        return await axios.get(globals.urls.admin + "customers");
    }

    public async deleteCustomer (customerId: number)  {
        return await axios.delete<Customer>(globals.urls.admin + "/customer/" + customerId);
    }

   public async getAllCoupons () {
        return await axios.get<Coupon[]>(globals.urls.admin + "allcoupons")
    }
}

const adminService = new AdminService();
export default adminService
