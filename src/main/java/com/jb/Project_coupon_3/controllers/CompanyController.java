package com.jb.Project_coupon_3.controllers;

import com.auth0.jwt.JWT;
import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Category;
import com.jb.Project_coupon_3.models.Coupon;
import com.jb.Project_coupon_3.services.ClientService;
import com.jb.Project_coupon_3.services.ClientType;
import com.jb.Project_coupon_3.services.CompanyService;
import com.jb.Project_coupon_3.services.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/company")
@CrossOrigin("*")
public class CompanyController extends ClientController {

    //TODO ADD THROWS EXCEPTION TO THE TOKEN GETTER THt needs to nbe in every method

    private CompanyService companyService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private HttpServletRequest request;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @Override
    public boolean login(String email, String password) {
       return companyService.login(email, password);

    }

    @PostMapping("coupon")
    @ResponseStatus(HttpStatus.CREATED)
    public Coupon addCoupon(@RequestBody Coupon coupon) throws CouponSystemException {//TODO add companyID as RequestParam
        int companyId = tokenService.getId(request, 333);
        return companyService.addCoupon(coupon, companyId); //todo check if works
    }

    @PutMapping("coupon")
    @ResponseStatus(HttpStatus.CREATED)//TODO test, or maynbe change COMPANY to companyID to coupon
    public Coupon updateCoupon(@RequestBody Coupon coupon ) throws CouponSystemException {
        int companyId = tokenService.getId(request, 333);
        return companyService.updateCoupon(coupon, companyId);
    }

    @GetMapping("coupons")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getAllCoupons() throws CouponSystemException {
        int companyId = tokenService.getId(request, 333);
        return companyService.getAllCompanyCoupons(companyId);
    }

    @DeleteMapping("{couponId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCoupon(@PathVariable int couponId) throws CouponSystemException {
        int companyId = tokenService.getId(request, 333);
        companyService.deleteCoupon(couponId, companyId);

    }


    @GetMapping("/coupons/category")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCouponsByCategory(@RequestParam Category category) throws CouponSystemException {
        int companyId = tokenService.getId(request, 333);
        return companyService.getCouponsByCategory(category, companyId);
    }

    @GetMapping("coupons/price")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCouponsByMaxPrice(@RequestParam double price) throws CouponSystemException {
        int companyId = tokenService.getId(request, 333);
        return companyService.getCouponByMaxPrice(price, companyId);
    }



//    private CompanyService getService() throws CouponSystemException {// IF WAS PROTOTYPE
//
//        String token = request.getHeader("Autorization").replace("Bearer","");
//        CompanyService companyService1 = (CompanyService) tokensStore.get(token);
//        if(companyService1 == null)
//            throw new CouponSystemException("I'm sorry Dave, I can't do that", HttpStatus.UNAUTHORIZED);
//        int companyId =  Integer.parseInt(JWT.decode(token).getClaim("id").toString());//TODO MAKE METHOD getIdFromToken for general use
//        return  (CompanyService) tokensStore.get(token);
//    }



}
