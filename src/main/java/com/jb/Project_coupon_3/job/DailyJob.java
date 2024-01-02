package com.jb.Project_coupon_3.job;

import com.jb.Project_coupon_3.repositories.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class DailyJob {

    @Autowired
    private CouponRepository couponRepository;
    @Scheduled(timeUnit = TimeUnit.HOURS, fixedRate = 24)
    public void deleteExpiredCoupons() {
        couponRepository.deleteFromPurchaseTable();
        couponRepository.deleteCouponByEndDateBefore();
    }
}
