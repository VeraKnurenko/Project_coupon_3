package com.jb.Project_coupon_3.controllers;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.services.ClientType;
import com.jb.Project_coupon_3.services.LoginManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class LoginController {

    private LoginManager loginManager;



    public LoginController(LoginManager loginManager) {
        this.loginManager = loginManager;

    }

    @PostMapping("login")
    public ResponseEntity<String> login(String email, String password, ClientType clientType ) throws CouponSystemException {
            String token = loginManager.login(email, password, clientType);
            return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }


}
