package com.jb.Project_coupon_3;

import com.jb.Project_coupon_3.services.ClientService;
import com.jb.Project_coupon_3.services.ClientType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.HashMap;
import java.util.HashSet;

@SpringBootApplication
@EnableScheduling
public class ProjectCoupon3Application {

	public static void main(String[] args) {

		SpringApplication.run(ProjectCoupon3Application.class, args);
	}
	@Bean
	public HashSet<String> tokensStore(){
		return new HashSet<>() ;
	}

}
