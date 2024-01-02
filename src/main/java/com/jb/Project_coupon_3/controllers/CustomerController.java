package com.jb.Project_coupon_3.controllers;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.services.CustomerService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("customer")
@CrossOrigin
public class CustomerController extends ClientController{
    CustomerService customerService;

    @Override
    public boolean login(String email, String password) {
        return false;
    }

    @PostMapping("purchase")
    public void couponPurchase(@RequestParam int couponId, @RequestParam int customerId) throws CouponSystemException {
        customerService.couponPurchase(couponId, customerId);
    }

}

