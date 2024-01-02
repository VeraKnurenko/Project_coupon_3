package com.jb.Project_coupon_3.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CouponSystemException extends Exception{

    private HttpStatus httpStatus;

    public CouponSystemException(String message) {
        super(message);
    }

    public CouponSystemException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }
}
