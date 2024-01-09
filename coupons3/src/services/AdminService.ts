import Company from "../Models/Company";
import globals from "./globals/Globals";
import Customer from "../Models/Customer";
import axios from "axios";
import Coupon from "../Models/Coupon";

export const addCompany = async (company: Company) =>{
    return await axios.post<Company>(globals.urls.admin + "company", company);
}

export const getOneCompany = async (companyId: number)=>{
    return await axios.get<Company>(globals.urls.admin + "company/" + companyId);
}

export const getAllCompanies = async ()=>{
    return await axios.get(globals.urls.admin  + "companies");
}

export const updateCompany = async (company: Company)=>{
    return await axios.put<Company>(globals.urls.admin + "company", company)
}

export const deleteCompany = async (companyId : number) =>{
    return await axios.delete(globals.urls.admin  + "/company/" + companyId )
}

export const addCustomer = async (customer: Customer)=>{
    return await  axios.post<Customer>(globals.urls.admin + "customer", customer);
}

export const updateCustomer = async (customer: Customer)=>{
    return await axios.put<Customer>(globals.urls.admin + "customer", customer)
}

export const getOneCustomer = async (customerId : number)=>{
    return await axios.get<Customer>(globals.urls.admin + "customer/" + customerId);
}

export const getAllCustomers = async () =>{
    return await axios.get(globals.urls.admin + "customers");
}

export const deleteCustomer = async (customerId: number)=>{
    return await axios.delete<Customer>(globals.urls.admin + "/customer/" + customerId);
}

export const getAllCoupons = async () =>{
    return await axios.get<Coupon[]>(globals.urls.admin + "allcoupons")
}

