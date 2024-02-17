package com.jb.Project_coupon_3.services;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Category;
import com.jb.Project_coupon_3.models.Coupon;
import com.jb.Project_coupon_3.models.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
public class CustomerService extends ClientService{

    @Override
    public boolean login(String email, String password) {
        return getCustomerDetails(email, password) != null;
    }

    public void couponPurchase(int couponId, int customerId) throws CouponSystemException {
        if(couponId <= 0){
            throw new CouponSystemException("invalid coupon Id", HttpStatus.BAD_REQUEST);
        }
        if(!customerRepository.existsById(customerId)){
            throw new CouponSystemException("No customer with such id", HttpStatus.NOT_FOUND);
        }
        if (!couponRepository.existsById(couponId)){
            throw new CouponSystemException("No coupon with such id to purchase", HttpStatus.NOT_FOUND);
        }
        Customer customer = customerRepository.getReferenceById(customerId);
        Coupon coupon = couponRepository.getCouponById(couponId);
        Set<Coupon> coupons = customer.getCoupons();
        if (coupon.getAmount() <= 0){
            throw new CouponSystemException("Not enough coupons to purchase", HttpStatus.NOT_FOUND);
        }
        if (coupons.contains(coupon)){
            throw new CouponSystemException("Cannot purchase, Coupon already purchased", HttpStatus.CONFLICT);
        }
        if (coupon.getEndDate().before(Date.valueOf(LocalDate.now()))){
            throw new CouponSystemException("Cannot purchase expired coupon", HttpStatus.BAD_REQUEST);
        }
        customer.getCoupons().add(coupon);
        System.out.println("debug1");
        coupon.getCustomers().add(customer);
        coupon.setAmount(coupon.getAmount()-1);
        System.out.println("debug2");
        coupons.add(coupon);
        customerRepository.save(customer);
        couponRepository.save(coupon);
        System.out.println("debug3");
    }

    public Customer getOneCustomer(int customerId){
        return customerRepository.getReferenceById(customerId);
    }

    public Set<Coupon> getAllCustomerCoupons(int customerId){
        return customerRepository.getReferenceById(customerId).getCoupons();
    }

    public List<Coupon> getCustomerCouponsByCategory(Category category, int customerId){
        Customer customer = customerRepository.getReferenceById(customerId);
        if(customer.getCoupons() != null){
            return customer.getCoupons().stream().filter(c -> c.getCategory().equals(category)).toList();
        }
        return List.of();
    }

    public List<Coupon> getCouponsByMaxPrice(double price, int customerId) {
        Customer customer = customerRepository.getReferenceById(customerId);
        if ((price >= 0) && customer.getCoupons() != null ) {
            return customer.getCoupons().stream().filter(c -> c.getPrice() < price).toList();
        }
        return List.of();
    }

    //TODO FIND A BETTER WAY?
    public void deleteCustomer(int customerId){
        Customer customer = customerRepository.getReferenceById(customerId);
        for (Coupon c: customer.getCoupons()) {
            c.getCustomers().remove(customer);
        }
        couponRepository.saveAll(customer.getCoupons());
        customerRepository.delete(customer);
    }

    //TODO - FIGURE OUT HOW TO CONSOLIDATE LOGIN & GEToNE CUSTOMER & CUSTOMERDETAILS
    public Customer getCustomerDetails(String email, String password){
        return customerRepository.getCustomerByEmailAndPassword(email, password);
    }

}
