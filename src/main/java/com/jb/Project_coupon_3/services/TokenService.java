package com.jb.Project_coupon_3.services;

import com.auth0.jwt.JWT;
import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class TokenService {
    @Autowired
    private Set<String> tokensStore;

    @Autowired
    private HttpServletRequest request;

    public Integer getId(HttpServletRequest request , int  role) throws CouponSystemException {
       String token = request.getHeader("Authorization").replace("Bearer ","");
       int tokenRole =JWT.decode(token).getClaim("role").asInt();
        if(!tokensStore.contains (token)){
            throw new CouponSystemException("token does not exist in store", HttpStatus.UNAUTHORIZED);
        }
        if (tokenRole == 999){
            return -99;
        }
        if(tokenRole != role){
            throw new CouponSystemException("role mismatch", HttpStatus.UNAUTHORIZED);
        }
        System.out.println(tokenRole);
        return Integer.parseInt(JWT.decode(token).getClaim("id").toString());
    }

//    public String getRole(HttpServletRequest request) throws CouponSystemException {
//        String token = request.getHeader("Authorization").replace("Bearer ", "");
//
//        return ;
//    }
}
