package com.jb.Project_coupon_3.controllers;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Company;
import com.jb.Project_coupon_3.models.Customer;
import com.jb.Project_coupon_3.services.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin")
@CrossOrigin
public class AdminController extends ClientController {

    AdminService adminService;

    public AdminController(AdminService adminService) {

        this.adminService = adminService;
    }

    @Override
    public boolean login(String email, String password) {
        return false;//TODO - write the actual method
    }



    // @RequestParam company?category=food&price=100 - for everything else
    // @PathVariable comapny/123 - for id (PK)

    // RequestBody - {}

    // delete - NO CONTENT 204 for void only

    @PostMapping("company")// - 200 OK
    @ResponseStatus(HttpStatus.CREATED)
    public Company addCompany(@RequestBody Company company) throws CouponSystemException {
        return adminService.addCompany(company);
    }

    @GetMapping("/company/{companyId}")
    @ResponseStatus(HttpStatus.OK)
    public Company getOneCompany(@PathVariable int companyId) throws CouponSystemException {
        return adminService.getOneCompany(companyId);
    }

    @GetMapping("companies")
    @ResponseStatus(HttpStatus.OK)
    public List<Company> getAllCompanies(){
        return adminService.getAllCompanies();
    }

    @PutMapping("company")
    @ResponseStatus(HttpStatus.CREATED)
    public Company updateCompany(@RequestBody Company company) throws CouponSystemException {
        return adminService.updateCompany(company);
    }

    @DeleteMapping("/company/{companyId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompany(@PathVariable int companyId) throws CouponSystemException {
        adminService.deleteCompany(companyId);
    }

    @PostMapping("customer")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer addCustomer(@RequestBody Customer customer) throws CouponSystemException {
        return adminService.addCustomer(customer);
    }

    @PutMapping("customer")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer updateCustomer(@RequestBody Customer customer) throws CouponSystemException {
        return adminService.updateCustomer(customer);
    }

    @GetMapping("/customer/{customerId}")
    @ResponseStatus(HttpStatus.OK)
    public Customer getOneCustomer(@PathVariable int customerId) throws CouponSystemException {
        return adminService.getOneCustomer(customerId);
    }

    @GetMapping("customers")
    @ResponseStatus(HttpStatus.OK)
    public List<Customer> getAllCustomers(){
        return adminService.getAllCustomers();
    }

    @DeleteMapping("/customer/{customerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable int customerId) throws CouponSystemException {
        adminService.deleteCustomer(customerId);
    }
}
