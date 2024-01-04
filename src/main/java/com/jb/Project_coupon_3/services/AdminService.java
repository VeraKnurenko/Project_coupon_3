package com.jb.Project_coupon_3.services;

import com.jb.Project_coupon_3.exceptions.CouponSystemException;
import com.jb.Project_coupon_3.models.Company;
import com.jb.Project_coupon_3.models.Coupon;
import com.jb.Project_coupon_3.models.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService extends ClientService {

    @Override
    public boolean login(String email, String password) {
        return (email.equals("admin@admin.com") && password.equals("admin"));
    }

    public Company addCompany(Company company) throws CouponSystemException {
        if (company == null) {
            throw new CouponSystemException("Company is null", HttpStatus.BAD_REQUEST);
        }
        if (companyRepository.existsByEmail(company.getEmail())) {
            throw new CouponSystemException("Company email already in system", HttpStatus.CONFLICT);
        }
        if (companyRepository.existsByName(company.getName())) {
            throw new CouponSystemException("Company with such name already exists", HttpStatus.CONFLICT);
        }
        return companyRepository.save(company);
    }

    public Company getOneCompany(int companyId) throws CouponSystemException {
        if (companyId <= 0) {
            throw new CouponSystemException("Invalid Company Id", HttpStatus.BAD_REQUEST);
        }
        return companyRepository.findById(companyId).
                orElseThrow(() -> new CouponSystemException("No company with such id", HttpStatus.BAD_REQUEST));
    }


    public Company updateCompany(Company company) throws CouponSystemException {
        Company company1 = getOneCompany(company.getId());
        if (company1 == null){
            throw new CouponSystemException("No company with such ID", HttpStatus.NOT_FOUND);
        }
        if (!company1.getName().equals(company.getName())) {
            throw new CouponSystemException("Cannot update Company Name", HttpStatus.CONFLICT);
        }
        if (!company.getEmail().equals(company1.getEmail()) && companyRepository.existsByEmail(company.getEmail())) {
            throw new CouponSystemException("Can't update, company email already in the system", HttpStatus.CONFLICT);
        }
        return companyRepository.save(company);
    }

    public void deleteCompany(int companyId) throws CouponSystemException {
        if (companyId <= 0) {
            throw new CouponSystemException("Invalid Company Id", HttpStatus.BAD_REQUEST);
        }
        if (!companyRepository.existsById(companyId)) {
            throw new CouponSystemException("No Company with Such id", HttpStatus.NOT_FOUND);
        }
        List<Coupon> companyCoupons = couponRepository.findAllByCompany_Id(companyId);
        for (Coupon c : companyCoupons) {
            c.getCustomers().clear();
        }
        couponRepository.saveAll(companyCoupons);
        companyRepository.deleteById(companyId);
    }

    public List<Company> getAllCompanies(){
        List<Company> companies = companyRepository.findAll();
        for (Company c: companies) {
            c.setCompanyCoupons(null);
        }
        return companies;
    }

    public Customer addCustomer(Customer customer) throws CouponSystemException {
        if (customer == null) {
            throw new CouponSystemException("Invalid customer", HttpStatus.BAD_REQUEST);
        }
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new CouponSystemException("Customer email Already exists in system", HttpStatus.CONFLICT);
        }
       return customerRepository.save(customer);
    }

    public Customer updateCustomer(Customer customer) throws CouponSystemException {
        if (customer.getId() <= 0){
            throw new CouponSystemException("invalid customer Id", HttpStatus.BAD_REQUEST);
        }
        Customer customerFromDb = customerRepository.findById(customer.getId())
                .orElseThrow(() -> new CouponSystemException("No Customer with such Id", HttpStatus.NOT_FOUND));
        if (customerRepository.existsByEmailAndIdNot(customer.getEmail(), customer.getId())) {
            throw new CouponSystemException("Customer email already exists in system", HttpStatus.CONFLICT);
        }
            customerFromDb.setEmail(customer.getEmail());
            customerFromDb.setFirstName(customer.getFirstName());
            customerFromDb.setLastName(customer.getLastName());
            customerFromDb.setPassword(customer.getPassword());
        return customerRepository.save(customerFromDb);
    }

    public Customer getOneCustomer(int customerId) throws CouponSystemException {
        if (customerId <= 0) {
            throw new CouponSystemException("invalid customer Id", HttpStatus.BAD_REQUEST);
        }
        return customerRepository.findById(customerId).orElseThrow(()->
                new CouponSystemException("no customer with such ID", HttpStatus.NOT_FOUND));
    }

    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    public void deleteCustomer(int customerId) throws CouponSystemException {
        if (customerId <= 0) {
            throw new CouponSystemException("invalid customer Id", HttpStatus.BAD_REQUEST);
        }
        Customer customer = getOneCustomer(customerId);
        for (Coupon c: customer.getCoupons()) {
            c.getCustomers().remove(customer);
        }
        couponRepository.saveAll(customer.getCoupons());
        customerRepository.delete(customer);
    }


    public List<Coupon> getAllCouponsFromAllCompanies(){
        return couponRepository.findAll();
    }

}
