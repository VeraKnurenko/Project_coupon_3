package com.jb.Project_coupon_3.controllers;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Category;
import com.jb.Project_coupon_3.models.Coupon;
import com.jb.Project_coupon_3.models.Customer;
import com.jb.Project_coupon_3.services.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("customer")
@CrossOrigin
public class CustomerController extends ClientController{
    CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Override
    public boolean login(String email, String password) {
        return false;
    }

    @PostMapping("purchase")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void couponPurchase(@RequestParam int couponId, @RequestParam int customerId) throws CouponSystemException {
        customerService.couponPurchase(couponId, customerId);
    }
    @GetMapping("{customerId}")
    @ResponseStatus(HttpStatus.FOUND)
    public Customer getOneCustomer(@PathVariable int customerId){
        return customerService.getOneCustomer(customerId);
    }

    @GetMapping("coupons")
    @ResponseStatus(HttpStatus.OK)
    public Set<Coupon> getAllCustomerCoupons(@RequestParam int customerId){
        return customerService.getAllCustomerCoupons(customerId);
    }

    @GetMapping("coupons/category/{category}")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCouponsByCategory(@PathVariable Category category, @RequestParam int customerId){
        return customerService.getCustomerCouponsByCategory(category, customerId);
    }

    @GetMapping("coupons/price/{price}")
    public List<Coupon> getCouponsByMaxPrice(@PathVariable double price,@RequestParam int customerId){
        return customerService.getCouponsByMaxPrice(price, customerId);
    }

    //TODO - make sure only the customer that logged in can delete
    @DeleteMapping("{customerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable int customerId){
        customerService.deleteCustomer(customerId);
    }


}

