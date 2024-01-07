package com.jb.Project_coupon_3.controllers;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.services.ClientType;
import com.jb.Project_coupon_3.services.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class LoginController {

    private LoginService loginManager;


    public LoginController(LoginService loginManager) {
        this.loginManager = loginManager;
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestParam String email,@RequestParam String password, @RequestParam ClientType clientType ) throws CouponSystemException {
            String token = loginManager.login(email, password, clientType);
            return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }


}
