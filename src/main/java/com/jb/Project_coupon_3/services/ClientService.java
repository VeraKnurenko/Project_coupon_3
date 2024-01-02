package com.jb.Project_coupon_3.services;

import com.jb.Project_coupon_3.repositories.CompanyRepository;
import com.jb.Project_coupon_3.repositories.CouponRepository;
import com.jb.Project_coupon_3.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public abstract class ClientService {
    @Autowired
    protected CompanyRepository companyRepository;
    @Autowired
    protected CouponRepository couponRepository;
    @Autowired
    protected CustomerRepository customerRepository;

    public abstract boolean login(String email, String password);
}
