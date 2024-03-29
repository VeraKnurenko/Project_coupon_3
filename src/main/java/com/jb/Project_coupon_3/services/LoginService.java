package com.jb.Project_coupon_3.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Company;
import com.jb.Project_coupon_3.models.Customer;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.Set;

@Service
public class LoginService {

    ApplicationContext context;

    @Autowired
    private Set<String> tokensStore = new HashSet<>();


    public LoginService(ApplicationContext context) {

        this.context = context;
    }

    public String login(String email, String password, ClientType type) throws CouponSystemException {
        ClientService service = null;
        switch (type){
            case ADMIN -> {
                AdminService adminService = context.getBean(AdminService.class);
                if(adminService.login(email, password)){
                    service =  adminService;
                }

            }
            case COMPANY -> {
                CompanyService companyService = context.getBean(CompanyService.class);
                if(companyService.login(email,password)){
                    service =  companyService;
                }
            }
            case CUSTOMER -> {
                CustomerService customerService = context.getBean(CustomerService.class);
                if(customerService.login(email,password)){
                    service =  customerService;
                }

            }
            default ->   throw new CouponSystemException("Email or password is incorrect", HttpStatus.UNAUTHORIZED);
        }
        if(service == null){
            throw new CouponSystemException("Email or password is incorrect", HttpStatus.UNAUTHORIZED);
        }
        String token = createToken(email, password, service);
        tokensStore.add(token);
        return token;
    }

    private String createToken (String email, String password, ClientService service){
        String token = " ";
        Instant expires = Instant.now().plus(60, ChronoUnit.MINUTES);
        if (service instanceof CompanyService) {
            Company company = ((CompanyService) service).getCompanyDetails(email, password);
            token = JWT.create()
                    .withClaim("id", company.getId())
                    .withClaim("name", company.getName())
                    .withClaim("role", ClientType.COMPANY.toString())
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
        }else if(service instanceof AdminService){
            token = JWT.create()
                    .withClaim("name", "admin")
                    .withClaim("role",ClientType.ADMIN.toString() )
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
        } else {
            Customer customer = ((CustomerService) service).getCustomerDetails(email, password);
            token = JWT.create()
                    .withClaim("id", customer.getId())
                    .withClaim("name", customer.getFirstName())
                    .withClaim("lastName", customer.getLastName())
                    .withClaim("role", ClientType.CUSTOMER.toString())
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
        }
        return token;
    }

    public Integer getId(HttpServletRequest request , String role) throws CouponSystemException {
        String token = request.getHeader("Authorization").replace("Bearer ","");
        String tokenRole = JWT.decode(token).getClaim("role").toString().replace("\"", "");
        if(!tokensStore.contains (token)){
            throw new CouponSystemException("Session ended, please login again ", HttpStatus.UNAUTHORIZED);
        }
        if (tokenRole.equals(ClientType.ADMIN.toString()) ){
            return ClientType.ADMIN.ordinal() ;
        }
        if(!tokenRole.equals(role)){
            throw new CouponSystemException("role mismatch", HttpStatus.UNAUTHORIZED);
        }
        return JWT.decode(token).getClaim("id").asInt();
    }

    public void logout(HttpServletRequest request ){
        tokensStore.remove(request.getHeader("Authorization").replace("Bearer ", ""));
    }
}
