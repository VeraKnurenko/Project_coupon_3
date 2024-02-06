package com.jb.Project_coupon_3.services;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Category;
import com.jb.Project_coupon_3.models.Company;
import com.jb.Project_coupon_3.models.Coupon;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

@Service
public class CompanyService extends ClientService {

    @Override
    public boolean login(String email, String password) {
        return getCompanyDetails(email, password) != null;
    }


    public Coupon addCoupon (Coupon coupon, int companyId) throws CouponSystemException {
        if (coupon == null){
            throw new CouponSystemException("Invalid Coupon", HttpStatus.BAD_REQUEST);
        }
//        if (coupon.getCompany().getId() != companyId){
//            System.out.println(" coupon.getCompany().getId(): " + coupon.getCompany().getId() + " , companyId: " + companyId );
//            throw new CouponSystemException("coupon id and company id do not match!!!", HttpStatus.UNAUTHORIZED);//company trying to add coupon of a different company
//        }
        if(!companyRepository.existsById(companyId)){
            throw new CouponSystemException("No Company with such id", HttpStatus.BAD_REQUEST);
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
        if (coupon.getStartDate().after(coupon.getEndDate())){
            throw new CouponSystemException("Cannot add Coupon with Start Date after Coupon expiration date", HttpStatus.BAD_REQUEST);
        }
        if (couponRepository.existsByCompanyNameAndTitle(companyRepository.getReferenceById(companyId).getName(), coupon.getTitle())){
            throw new CouponSystemException("Coupon with this name already exists", HttpStatus.CONFLICT);
        }
        if (coupon.getImage() != null) {
            String base64Image = Base64.getEncoder().encodeToString(coupon.getImage().getBytes());
            coupon.setImage(base64Image);
        }
        return couponRepository.save(coupon);
    }

    public Coupon updateCoupon(Coupon coupon, int companyId) throws CouponSystemException {
        if (coupon == null){
            throw new CouponSystemException("Invalid Coupon", HttpStatus.BAD_REQUEST);
        }
        if (coupon.getCompany().getId() != companyId){
            throw new CouponSystemException("coupon id and company id do not match", HttpStatus.UNAUTHORIZED);//company trying toi add coupon of a different company
        }
        if(!couponRepository.existsById(coupon.getId())){
            throw new CouponSystemException("No coupon with such id", HttpStatus.NOT_FOUND);
        }
        Company tempCompany = companyRepository.getReferenceById(companyId);
        Coupon oldCoupon = couponRepository.getCouponById(coupon.getId());
        if(!coupon.getCompany().getName().equals(tempCompany.getName() )){
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
            if (coupon.getImage() != null) {
                String base64Image = Base64.getEncoder().encodeToString(coupon.getImage().getBytes());
                coupon.setImage(base64Image);
           }//else {
//                coupon.setImage(oldCoupon.getImage());
//                System.out.println(coupon);
//            }
        return couponRepository.save(coupon);
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
        Company company = companyRepository.getReferenceById(companyId);
        company.getCompanyCoupons().remove(couponToDelete);
        companyRepository.save(company);
        couponToDelete.setCompany(null);

        couponRepository.save(couponToDelete);
        couponRepository.deleteById(couponId);
    }

    public List<Coupon> getAllCompanyCoupons(int companyId){
        return couponRepository.findAllByCompany_Id(companyId);
    }
    public List<Coupon> getCouponsByCategory(Category category, int companyId){
        return couponRepository.findAllByCategoryAndCompanyId(category, companyId);
    }
    public List<Coupon> getCouponByMaxPrice(double price, int companyId){
       return  (price <= 0) ? List.of() : couponRepository.findAllByCompany_IdAndPriceLessThan(companyId, price);
    }


    //TODO check to add exception if NULL
    public Company getCompanyDetails (String email, String password){
        return companyRepository.getCompanyByEmailAndPassword(email, password);
    }

    public Coupon getOneCompanyCoupon(int couponId, int companyId) throws CouponSystemException {
        if (couponId <= 0)
            throw new CouponSystemException("invalid coupon Id", HttpStatus.UNAUTHORIZED);
        if (!couponRepository.existsById(couponId))
            throw new CouponSystemException("No coupon with such id", HttpStatus.NOT_FOUND);
        if (couponRepository.getCouponById(couponId).getCompany().getId() != companyId)
            throw new CouponSystemException("mismatch coupon and company id", HttpStatus.UNAUTHORIZED);

        return couponRepository.getCouponById(couponId);
    }

    public Company OneCompany(int companyId){
        return companyRepository.getReferenceById(companyId);
    }
}
