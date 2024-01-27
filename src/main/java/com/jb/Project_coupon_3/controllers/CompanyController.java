package com.jb.Project_coupon_3.controllers;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Category;
import com.jb.Project_coupon_3.models.Company;
import com.jb.Project_coupon_3.models.Coupon;
import com.jb.Project_coupon_3.services.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/company")
public class CompanyController extends ClientController {


    private CompanyService companyService;

    @Autowired
    private LoginService loginService;

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
    public Coupon addCoupon(@RequestBody Coupon coupon) throws CouponSystemException {
        int companyId = loginService.getId(request, ClientType.COMPANY.toString());
//        if (coupon.getImage() != null) {
//            byte[] decodedImage = Base64.getDecoder().decode(coupon.getImage());
//            coupon.setImage(new String(decodedImage));
//        }
        System.out.println(coupon);
        return companyService.addCoupon(coupon, companyId); //todo check if works
    }

    @PutMapping("coupon")
    @ResponseStatus(HttpStatus.CREATED)//TODO test, or maynbe change COMPANY to companyID to coupon
    public Coupon updateCoupon(@RequestBody Coupon coupon ) throws CouponSystemException {
        int companyId = loginService.getId(request, ClientType.COMPANY.toString());
        return companyService.updateCoupon(coupon, companyId);
    }

    @GetMapping("coupons")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getAllCoupons() throws CouponSystemException {
        int companyId = loginService.getId(request, ClientType.COMPANY.toString());
        return companyService.getAllCompanyCoupons(companyId);
    }

    @DeleteMapping("coupons/{couponId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCoupon(@PathVariable int couponId) throws CouponSystemException {
        int companyId = loginService.getId(request, ClientType.COMPANY.toString());
        companyService.deleteCoupon(couponId, companyId);

    }


    @GetMapping("/coupons/category")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCouponsByCategory(@RequestParam Category category) throws CouponSystemException {
        int companyId = loginService.getId(request, ClientType.COMPANY.toString());
        return companyService.getCouponsByCategory(category, companyId);
    }

    @GetMapping("coupons/price")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCouponsByMaxPrice(@RequestParam double price) throws CouponSystemException {
        int companyId = loginService.getId(request, ClientType.COMPANY.toString());
        return companyService.getCouponByMaxPrice(price, companyId);
    }
    @GetMapping("getCompanyDetails")//todo fix after class
    public Company getCompanyDetails(@RequestParam int id) throws CouponSystemException {
        int companyId = loginService.getId(request, ClientType.COMPANY.toString());
        return companyService.OneCompany(companyId);

    }

    @GetMapping("coupon/{couponId}")
    public Coupon getOneCoupon(@PathVariable int couponId) throws CouponSystemException {
        int companyId = loginService.getId(request, ClientType.COMPANY.toString());
        return companyService.getOneCompanyCoupon(couponId, companyId);

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
