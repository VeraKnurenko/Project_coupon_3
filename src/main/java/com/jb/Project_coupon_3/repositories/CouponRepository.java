package com.jb.Project_coupon_3.repositories;

import com.jb.Project_coupon_3.models.Category;
import com.jb.Project_coupon_3.models.Coupon;
import com.jb.Project_coupon_3.models.Customer;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    List<Coupon> findAllByCategoryAndCompanyId(Category category, int id);
    List<Coupon> findAllByCompany_IdAndPriceLessThan(int id, double price);
    List<Coupon> findAllByCompany_Id(int companyId);
//    List<Coupon> findCouponsByCustomersAndCategory(Customer customer, Category category);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM coupons WHERE end_date < CURDATE()", nativeQuery = true)
    void deleteCouponByEndDateBefore();
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM coupons_customers WHERE coupons_customers.coupons_id IN(SELECT id FROM coupons WHERE end_date < NOW())", nativeQuery = true)
    void deleteFromPurchaseTable();

    List<Coupon> getCouponsByEndDateBefore(Date endDate);
    boolean existsByCompanyNameAndTitleAndIdNot(String companyName, String title, int id);
    boolean existsByCompanyNameAndTitle(String companyName, String title);
    Coupon getCouponById(int id);
}
