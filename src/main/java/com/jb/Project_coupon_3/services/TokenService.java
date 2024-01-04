package com.jb.Project_coupon_3.services;

import com.auth0.jwt.JWT;
import com.jb.Project_coupon_3.exceptions.CouponSystemException;
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

    public Integer getId(HttpServletRequest request , String role) throws CouponSystemException {
       String token = request.getHeader("Authorization").replace("Bearer ","");
       String tokenRole =JWT.decode(token).getClaim("role").toString();
        if(!tokensStore.contains (token)){
            throw new CouponSystemException("token does nt exist in store", HttpStatus.UNAUTHORIZED);
        }
        if(!tokenRole.equals(role)){
            throw new CouponSystemException("role mismatch", HttpStatus.UNAUTHORIZED);
        }
        if (tokenRole.equals("admin")){
            return -99;
        }
        return Integer.parseInt(JWT.decode(token).getClaim("id").toString());
    }

//    public String getRole(HttpServletRequest request) throws CouponSystemException {
//        String token = request.getHeader("Authorization").replace("Bearer ", "");
//
//        return ;
//    }
}
