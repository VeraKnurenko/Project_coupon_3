package com.jb.Project_coupon_3.services;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Category;
import com.jb.Project_coupon_3.models.Company;
import com.jb.Project_coupon_3.models.Coupon;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
////@Scope("prototype")
public class CompanyService extends ClientService {
//    private Company company; //todo - delete!

    @Override
    public boolean login(String email, String password) { //WORKS AS SINGELTON //todo finish writing
        return companyRepository.getCompanyByEmailAndPassword(email, password) != null;
    }


    /**
     * Adds new coupon to the system. CAN add coupon with amount zero, cannot add with negative amount.
     * @param coupon
     * @throws CouponSystemException
     */

    // TODO - add to input - companyId!
    // TODO - add to output - Coupon (for redux)

    public Coupon addCoupon (Coupon coupon, int companyId) throws CouponSystemException {
        if (coupon == null){
            throw new CouponSystemException("Invalid Coupon", HttpStatus.BAD_REQUEST);
        }
        if (coupon.getCompany().getId() != companyId){
            throw new CouponSystemException("coupon id and company id do not match", HttpStatus.UNAUTHORIZED);//company trying to add coupon of a different company
        }

        if(coupon.getAmount() < 0){
            throw new CouponSystemException("Cannot add coupon less than 0 amount", HttpStatus.BAD_REQUEST);
        }
        if (coupon.getPrice() < 0 ){
            throw new CouponSystemException("cannot add coupon with price less than 0", HttpStatus.BAD_REQUEST);
        }
        if (coupon.getEndDate().before(Date.valueOf(LocalDate.now()))){
            throw new CouponSystemException("Cannot add coupon with expiration in the past", HttpStatus.BAD_REQUEST);
        }
        if (couponRepository.existsByCompanyNameAndTitle(companyRepository.getReferenceById(companyId).getName(), coupon.getTitle())){
            throw new CouponSystemException("Coupon with this name already exists", HttpStatus.CONFLICT);
        }
        return couponRepository.save(coupon);//TODO - find out why creates new coupons with NULL instead of CATEGORY
    }

    public Coupon updateCoupon(Coupon coupon, int companyId) throws CouponSystemException {
        if (coupon == null){
            throw new CouponSystemException("Invalid Coupon", HttpStatus.BAD_REQUEST);
        }
        if (coupon.getCompany().getId() != companyId){
            throw new CouponSystemException("coupon id and company id do not match", HttpStatus.UNAUTHORIZED);//company trying toi add coupon of a different company
        }
//  TODO ADD VARIABLE COMPANY SO NO NEED TP CALL THE REPOSITORY SEVERAL TIMES

        if(!couponRepository.existsById(coupon.getId())){
            throw new CouponSystemException("No coupon with such id", HttpStatus.NOT_FOUND);
        }
        Company tempCompany = companyRepository.getReferenceById(companyId);//TODO - find out if GetReferenceById is responsible for failed update

        if(!coupon.getCompany().getName().equals( tempCompany.getName() )){
            throw new CouponSystemException("cannot update company name", HttpStatus.BAD_REQUEST);
        }
        if (couponRepository.existsByCompanyNameAndTitleAndIdNot(tempCompany.getName(), coupon.getTitle(), coupon.getId())){
            throw new CouponSystemException("Coupon with this title already exists", HttpStatus.CONFLICT );
        }
        if (coupon.getEndDate().before(Date.valueOf(LocalDate.now()))){
            throw new CouponSystemException("Cannot have coupon expiration date in the past", HttpStatus.BAD_REQUEST);
        }
        if (coupon.getAmount() < 0){
            throw new CouponSystemException("Coupon amount cannot be less than 0", HttpStatus.BAD_REQUEST);
        }
        return couponRepository.save(coupon);//TODO FIX
    }

    public void deleteCoupon(int couponId, int companyId) throws CouponSystemException {
        if (couponId <= 0){
            throw new CouponSystemException("invalid coupon Id", HttpStatus.BAD_REQUEST);
        }
        if (!couponRepository.existsById(couponId)){
            throw new CouponSystemException("no coupon with such id", HttpStatus.NOT_FOUND);
        }
        Coupon couponToDelete = couponRepository.getCouponById(couponId);
        if (couponToDelete.getCompany().getId() != companyId){
            throw new CouponSystemException("coupon id and company id do not match", HttpStatus.UNAUTHORIZED);
        }
        couponToDelete.setCustomers(null);
        couponToDelete.setCompany(null);
        couponRepository.save(couponToDelete);
        couponRepository.delete(couponToDelete);
    }

    public List<Coupon> getAllCompanyCoupons(int companyId){
        return couponRepository.findAllByCompany_Id(companyId);
    }

    public List<Coupon> getCouponsByCategory(Category category, int companyId){
        return couponRepository.findAllByCategoryAndCompanyId(category, companyId);
    }

    public List<Coupon> getCouponByMaxPrice(double price, int companyId){
       return  (price < 0) ? List.of() : couponRepository.findAllByCompany_IdAndPriceLessThan(companyId, price);
    }
}
