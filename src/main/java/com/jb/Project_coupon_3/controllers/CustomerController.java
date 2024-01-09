package com.jb.Project_coupon_3.controllers;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Category;
import com.jb.Project_coupon_3.models.Coupon;
import com.jb.Project_coupon_3.models.Customer;
import com.jb.Project_coupon_3.services.ClientType;
import com.jb.Project_coupon_3.services.CustomerService;
import com.jb.Project_coupon_3.services.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/customer")
public class CustomerController extends ClientController{
    CustomerService customerService;

    @Autowired
    private LoginService loginService;

    @Autowired
    HttpServletRequest request;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    public boolean login(String email, String password) {
        return customerService.login(email, password);
    }

    @PostMapping("purchase")//WORKS POSTMAN
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void couponPurchase(@RequestParam int couponId) throws CouponSystemException {
        int customerId = loginService.getId(request, ClientType.CUSTOMER.toString());
        customerService.couponPurchase(couponId, customerId);
    }
    @GetMapping("{customerId}")//works postman
    @ResponseStatus(HttpStatus.FOUND)
    public Customer getOneCustomer(@PathVariable int customerId) throws CouponSystemException {
        int customerTokenId = loginService.getId(request, ClientType.CUSTOMER.toString());
        if(customerTokenId != customerId)
            throw new CouponSystemException("Please login with correct customer ID");
        return customerService.getOneCustomer(customerId);
    }

    @GetMapping("coupons")
    @ResponseStatus(HttpStatus.OK)
    public Set<Coupon> getAllCustomerCoupons(@RequestParam int customerId) throws CouponSystemException {
        int customerTokenId = loginService.getId(request, ClientType.CUSTOMER.toString());
        if(customerTokenId != customerId)
            throw new CouponSystemException("Please login with correct customer ID");
        return customerService.getAllCustomerCoupons(customerId);
    }

    @GetMapping("coupons/category")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCouponsByCategory(@RequestParam Category category) throws CouponSystemException {
        int customerId = loginService.getId(request, ClientType.CUSTOMER.toString());
        return customerService.getCustomerCouponsByCategory(category, customerId);
    }

    @GetMapping("coupons/price")
    public List<Coupon> getCouponsByMaxPrice(@RequestParam double price) throws CouponSystemException {
        int customerId = loginService.getId(request, ClientType.CUSTOMER.toString());
        return customerService.getCouponsByMaxPrice(price, customerId);
    }

    //TODO - make sure only the customer that logged in can delete
    @DeleteMapping("{customerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable int customerId) throws CouponSystemException {
        if(loginService.getId(request, ClientType.CUSTOMER.toString()) == customerId)
            customerService.deleteCustomer(customerId);
    }


}

