package com.jb.Project_coupon_3.services;

import com.auth0.jwt.JWT;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    @Autowired
    private HttpServletRequest request;

    public Integer getId(){
        String token = request.getHeader("Autorization").replace("Bearer","");
        int companyId =  Integer.parseInt(JWT.decode(token).getClaim("id").toString());//TODO MAKE METHOD getIdFromToken for general use
    }
}
