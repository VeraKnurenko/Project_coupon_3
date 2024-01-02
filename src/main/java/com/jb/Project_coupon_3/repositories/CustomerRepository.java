package com.jb.Project_coupon_3.repositories;

import com.jb.Project_coupon_3.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    boolean existsByEmail(String email);
    Customer getCustomerByEmailAndPassword(String email, String password);
    boolean existsByEmailAndIdNot(String email, int id);



    boolean existsByEmailAndId(String email, int id);
    Customer getByEmail(String email);
}
