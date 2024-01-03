package com.jb.Project_coupon_3.controllers;

import com.auth0.jwt.JWT;
import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Category;
import com.jb.Project_coupon_3.models.Coupon;
import com.jb.Project_coupon_3.services.ClientService;
import com.jb.Project_coupon_3.services.ClientType;
import com.jb.Project_coupon_3.services.CompanyService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/company")
public class CompanyController extends ClientController {

    //TODO ADD THROWS EXCEPTION TO THE TOKEN GETTER THt needs to nbe in every method

    private CompanyService companyService;
    private HashMap<String, ClientService> tokensStore;

    @Autowired
    private HttpServletRequest request;

    public CompanyController(CompanyService companyService, HashMap<String, ClientService> tokensStore) {
        this.companyService = companyService;
        this.tokensStore = tokensStore;
    }

    @Override
    public boolean login(String email, String password) {
        return false; //TODO the actual method
    }

    @PostMapping("coupon")
    @ResponseStatus(HttpStatus.CREATED)
    public Coupon addCoupon(@RequestBody Coupon coupon) throws CouponSystemException {//TODO add companyID as RequestParam

        String token = request.getHeader("Autorization").replace("Bearer","");
        int companyId =  Integer.parseInt(JWT.decode(token).getClaim("id").toString());//TODO MAKE METHOD getIdFromToken for general use
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

    private CompanyService getService() throws CouponSystemException {// IF WAS PROTOTYPE

        String token = request.getHeader("Autorization").replace("Bearer","");
        CompanyService companyService1 = (CompanyService) tokensStore.get(token);
        if(companyService1 == null)
            throw new CouponSystemException("I'm sorry Dave, I can't do that", HttpStatus.UNAUTHORIZED);

        int companyId =  Integer.parseInt(JWT.decode(token).getClaim("id").toString());//TODO MAKE METHOD getIdFromToken for general use
        return  (CompanyService) tokensStore.get(token);
    }



}
