import Company from "../Models/Company";
import tokenAxios from "./TokenAxios";
import Globals from "./globals/Globals";
import globals from "./globals/Globals";

export const addCompany = async (company: Company) =>{
    return await tokenAxios.post<Company>(globals.urls.admin + "company", company);
}

export const getOneCompany = async (companyId: number)=>{
    return await tokenAxios.get<Company>(globals.urls.admin + "company/" + companyId);
}