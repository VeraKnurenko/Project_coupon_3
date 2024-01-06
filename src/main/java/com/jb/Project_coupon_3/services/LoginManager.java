package com.jb.Project_coupon_3.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Company;
import com.jb.Project_coupon_3.models.Customer;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class LoginManager {
    ApplicationContext context;

    @Autowired
    private Set<String> tokensStore;

    public LoginManager(ApplicationContext context) {

        this.context = context;
    }

    public String login(String email, String password, ClientType type) throws CouponSystemException {
        ClientService service = null;
        switch (type) {
            case ADMIN -> {
                AdminService adminService = context.getBean(AdminService.class);
                if (adminService.login(email, password)) {
                    service = adminService;
                }
            }
            case COMPANY -> {
                CompanyService companyService = context.getBean(CompanyService.class);
                if (companyService.login(email, password)) {
                    service = companyService;
                }
            }
            case CUSTOMER -> {
                CustomerService customerService = context.getBean(CustomerService.class);
                if (customerService.login(email, password)) {
                    service = customerService;
                }
            }
            default -> throw new CouponSystemException("Email or password is incorrect", HttpStatus.UNAUTHORIZED);
        }
        String token = createToken(service, email, password);
        tokensStore.add(token);
        return token;
    }

    private String createToken(ClientService service, String email, String password) {
        String token = " ";
        Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
        if (service instanceof CompanyService) {
            Company company = ((CompanyService) service).getCompanyDetails(email, password);
            token = JWT.create()
                    .withClaim("id", company.getId())
                    .withClaim("name", company.getName())
                    .withClaim("role", 333)
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
        } else if (service instanceof AdminService) {
            token = JWT.create()
                    .withClaim("name", "admin")
                    .withClaim("role", 999)
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
        } else {
            Customer customer = ((CustomerService) service).getCustomerDetails(email, password);
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
