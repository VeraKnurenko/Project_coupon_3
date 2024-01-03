package com.jb.Project_coupon_3.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Company;
import com.jb.Project_coupon_3.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private LoginManager loginManager;
    private HashMap<String, ClientService> tokensStore;
    //Dependency injection INSTEAD OF @Autowired on top of the Objects
    public LoginController(LoginManager loginManager, HashMap<String, ClientService> tokensStore) {
        this.loginManager = loginManager;
        this.tokensStore = tokensStore;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(String email, String password,ClientType clientType ) {
        try {
            //login successful
            ClientService service = loginManager.login(email, password, clientType);
            String token = createToken(service, email, password); //JWT.create().withClaim()
            //save token in store...
            tokensStore.put(token, service);//TODO remove SERVICE, unnecessary if I'M saving the token
            return ResponseEntity.ok(token);
        } catch (CouponSystemException e) {//TODO - REWRITE WITH GLOBAL EXCEPTION HANDLER IN MIND
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unable to Login, password or email incorrect");
        }
    }

    private String createToken (ClientService service, String email, String password){
        String token = " ";
        if (service instanceof CompanyService) {
            Company company = ((CompanyService) service).getCompanyDetails(email, password);
            Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
            token = JWT.create()
                    .withClaim("id", company.getId())
                    .withClaim("name", company.getName())
                    .withClaim("role", "company")
                    .withIssuedAt(new Date())
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());


//        } else if(service instanceof AdminService){
//            Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
//            token = JWT.create()
//                    .withClaim("name", "Admin")
//                    .withClaim("role", "administrator")
//                    .withExpiresAt(expires)
//                    .sign(Algorithm.none());
//
//
//        } else {

        }
        return token;
    }
}
