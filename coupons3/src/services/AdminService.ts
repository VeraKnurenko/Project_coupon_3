import Company from "../Models/Company";
import tokenAxios from "./TokenAxios";
import globals from "./globals/Globals";
import Customer from "../Models/Customer";

export const addCompany = async (company: Company) =>{
    return await tokenAxios.post<Company>(globals.urls.admin + "company", company);
}

export const getOneCompany = async (companyId: number)=>{
    return await tokenAxios.get<Company>(globals.urls.admin + "company/" + companyId);
}

export const getAllCompanies = async ()=>{
    return await tokenAxios.get(globals.urls.admin  + "companies");
}

export const updateCompany = async (company: Company)=>{
    return await tokenAxios.put<Company>(globals.urls.admin + "company", company)
}

export const deleteCompany = async (companyId : number) =>{
    return await tokenAxios.delete(globals.urls.admin  + "/company/" + companyId )
}

export const addCustomer = async (customer: Customer)=>{
    return await  tokenAxios.post<Customer>(globals.urls.admin + "customer", customer);
}

export const updateCustomer = async (customer: Customer)=>{
    return await tokenAxios.put<Customer>(globals.urls.admin + "customer", customer)
}

export const getOneCustomer = async (customerId : number)=>{
    return await tokenAxios.get<Customer>(globals.urls.admin + "customer/" + customerId);
}

export const getAllCustomers = async () =>{
    return await tokenAxios.get(globals.urls.admin + "customers");
}

export const deleteCustomer = async (customerId: number)=>{
    return await tokenAxios.delete<Customer>(globals.urls.admin + "/customer/" + customerId);
}