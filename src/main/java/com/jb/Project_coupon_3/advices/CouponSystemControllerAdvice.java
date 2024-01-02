package com.jb.Project_coupon_3.advices;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CouponSystemControllerAdvice {

    @ExceptionHandler(CouponSystemException.class)
    public ResponseEntity<String> exceptionsForCouponSystem(CouponSystemException couponSystemException){
        return new ResponseEntity(couponSystemException.getMessage(), couponSystemException.getHttpStatus());
    }
}
