package com.jb.Project_coupon_3.services;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class LoginManager {
    ApplicationContext context;

    public LoginManager(ApplicationContext context) {

        this.context = context;
    }

    public ClientService login(String email, String password, ClientType type) throws CouponSystemException {
        switch (type){
            case ADMIN -> {
                AdminService adminService = context.getBean(AdminService.class);
                if(adminService.login(email, password)){
                    return adminService;
                }
            }
            case COMPANY -> {
                CompanyService companyService = context.getBean(CompanyService.class);
                if(companyService.login(email,password)){
                    return companyService;
                }
            }
            case CUSTOMER -> {
                CustomerService customerService = context.getBean(CustomerService.class);
                if(customerService.login(email,password)){
                    return customerService;
                }
            }
        }
        throw new CouponSystemException("Email or password is incorrect");
    }
}
