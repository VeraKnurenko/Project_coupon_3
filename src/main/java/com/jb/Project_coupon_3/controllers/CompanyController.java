package com.jb.Project_coupon_3.controllers;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Category;
import com.jb.Project_coupon_3.models.Coupon;
import com.jb.Project_coupon_3.services.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("company")
@CrossOrigin
public class CompanyController extends ClientController {
    CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @Override
    public boolean login(String email, String password) {
        return false; //TODO the actual method
    }

    @PostMapping("coupon")
    @ResponseStatus(HttpStatus.CREATED)
    public Coupon addCoupon(@RequestBody Coupon coupon, @RequestParam int companyId) throws CouponSystemException {
        return companyService.addCoupon(coupon, companyId);
    }

    @PutMapping("coupon")
    @ResponseStatus(HttpStatus.CREATED)//TODO test, or maynbe change COMPANY to companyID to cooupn
    public Coupon updateCoupon(@RequestBody Coupon coupon, @RequestParam int companyId) throws CouponSystemException {
        return companyService.updateCoupon(coupon, companyId);
    }

    @GetMapping("coupons")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getAllCoupons(@RequestParam int companyId){
        return companyService.getAllCompanyCoupons(companyId);
    }

    @DeleteMapping("{couponId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCoupon(@PathVariable int couponId, @RequestParam int companyId) throws CouponSystemException {
        companyService.deleteCoupon(couponId, companyId);
    }


    @GetMapping("/coupons/category")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCouponsByCategory(@RequestParam Category category, @RequestParam int companyId){
       return companyService.getCouponsByCategory(category, companyId);
    }

    @GetMapping("coupons/price")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCouponsByMaxPrice(@RequestParam double price, @RequestParam int companyId){
        return companyService.getCouponByMaxPrice(price, companyId);
    }



}
