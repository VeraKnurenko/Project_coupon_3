package com.jb.Project_coupon_3.controllers;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Company;
import com.jb.Project_coupon_3.models.Coupon;
import com.jb.Project_coupon_3.models.Customer;
import com.jb.Project_coupon_3.services.AdminService;
import com.jb.Project_coupon_3.services.ClientType;
import com.jb.Project_coupon_3.services.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController extends ClientController {
    @Autowired
    HttpServletRequest request;

    AdminService adminService;
    @Autowired
    private LoginService loginService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @Override
    public boolean login(String email, String password) {
        return (email.equals("admin@admin.com") && password.equals("admin"));
    }

    //TODO SOLVE "INTERNAL SERVEWR ERROR IF i DON'T SEND TOKEN WITH REQUEST, MUST MAKE EXCEPTION - FIX tOKEN FILTER

    // @RequestParam company?category=food&price=100 - for everything else
    // @PathVariable comapny/123 - for id (PK)
    // RequestBody - {}
    // delete - NO CONTENT 204 for void only

        @GetMapping("allcoupons")//WORKS POSTMAN
    public List<Coupon> getAllCouponsFromAllCompanies(){

        return adminService.getAllCouponsFromAllCompanies();
    }

    @PostMapping("/company")  //WORKS POSTMAN
    @ResponseStatus(HttpStatus.CREATED)
    public Company addCompany(@RequestBody Company company) throws CouponSystemException {
        return (loginService.getId(request, ClientType.ADMIN.toString()) == 0) ? adminService.addCompany(company) : null;
    }

    @GetMapping("/company/{companyId}")//WORKS POSTMAN
    @ResponseStatus(HttpStatus.OK)
    public Company getOneCompany(@PathVariable int companyId) throws CouponSystemException {
        return (loginService.getId(request, ClientType.ADMIN.toString()) == 0) ? adminService.getOneCompany(companyId) : null;
    }

    @GetMapping("companies") //WORKS POSTMAN
    @ResponseStatus(HttpStatus.OK)
    public List<Company> getAllCompanies() throws CouponSystemException {
        return (loginService.getId(request, ClientType.ADMIN.toString()) == 0) ? adminService.getAllCompanies(): null;
    }

    @PutMapping("company") //WORKS POSTMAN
    @ResponseStatus(HttpStatus.CREATED)
    public Company updateCompany(@RequestBody Company company) throws CouponSystemException {
        return (loginService.getId(request, ClientType.ADMIN.toString()) == 0) ? adminService.updateCompany(company): null;
    }

    @DeleteMapping("/company/{companyId}") //WORKS POSTMAN
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompany(@PathVariable int companyId) throws CouponSystemException {
        if ((loginService.getId(request, ClientType.ADMIN.toString()) == 0))
            adminService.deleteCompany(companyId);
    }

    @PostMapping("/customer")//WORKS POSTMAN
    @ResponseStatus(HttpStatus.CREATED)
    public Customer addCustomer(@RequestBody Customer customer) throws CouponSystemException {
        return (loginService.getId(request, ClientType.ADMIN.toString()) == 0) ? adminService.addCustomer(customer) : null;
    }

    @PutMapping("/customer")//WORKS POSTMAN
    @ResponseStatus(HttpStatus.CREATED)
    public Customer updateCustomer(@RequestBody Customer customer) throws CouponSystemException {
        return (loginService.getId(request, ClientType.ADMIN.toString()) == 0) ? adminService.updateCustomer(customer) : null;
    }

    @GetMapping("/customer/{customerId}")//works postman
    @ResponseStatus(HttpStatus.OK)
    public Customer getOneCustomer(@PathVariable int customerId) throws CouponSystemException {
        return (loginService.getId(request, ClientType.ADMIN.toString()) == 0) ? adminService.getOneCustomer(customerId) : null;
    }

    @GetMapping("/customers")//works postman
    @ResponseStatus(HttpStatus.OK)
    public List<Customer> getAllCustomers() throws CouponSystemException {
        return (loginService.getId(request, ClientType.ADMIN.toString()) == 0) ? adminService.getAllCustomers() : null;
    }

    @DeleteMapping("/customer/{customerId}")//works postman
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable int customerId) throws CouponSystemException {
        if (loginService.getId(request, ClientType.ADMIN.toString()) == 0)
            adminService.deleteCustomer(customerId);
    }
}
