package com.jb.Project_coupon_3.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Company;
import com.jb.Project_coupon_3.models.Customer;
import com.jb.Project_coupon_3.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class LoginController {

    private LoginManager loginManager;
    private Set<String> tokensStore = new HashSet<>();
    //Dependency injection INSTEAD OF @Autowired on top of the Objects


    public LoginController(LoginManager loginManager, Set<String> tokensStore) {
        this.loginManager = loginManager;
        this.tokensStore = tokensStore;
    }

    @PostMapping("login")
    public ResponseEntity<String> login(String email, String password, ClientType clientType ) throws CouponSystemException {
            //login successful

            ClientService service = loginManager.login(email, password, clientType);
            String token = createToken(service, email, password);
            //save token in store...
            tokensStore.add(token);//TODO remove SERVICE, unnecessary if I'M saving the token
            return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }

    private String createToken (ClientService service, String email, String password){
        String token = " ";
        if (service instanceof CompanyService) {
            Company company = ((CompanyService) service).getCompanyDetails(email, password);
            Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
            token = JWT.create()
                    .withClaim("id", company.getId())
                    .withClaim("name", company.getName())
                    .withClaim("role", 333)
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
        }else if(service instanceof AdminService){
            Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
            token = JWT.create()
                    .withClaim("name", "admin")
                    .withClaim("role",999 )
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
      } else {
            Customer customer = ((CustomerService) service).getCustomerDetails(email, password);
            Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
            token = JWT.create()
                    .withClaim("id", customer.getId())
                    .withClaim("name", customer.getFirstName())
                    .withClaim("lastName", customer.getLastName())
                    .withClaim("role", 666)
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
        }
      return token;
    }
}
