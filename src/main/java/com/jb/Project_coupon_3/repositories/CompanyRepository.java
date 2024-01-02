package com.jb.Project_coupon_3.repositories;

import com.jb.Project_coupon_3.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

    boolean existsByEmail(String email);

    boolean existsByName(String name);
    boolean existsByEmailAndPassword(String email, String password);

    Company getCompanyByEmailAndPassword(String email, String password);

}
