package com.jb.Project_coupon_3.controllers;

import org.springframework.web.bind.annotation.RestController;

@RestController
public abstract class ClientController {

    public abstract boolean login(String email, String password);
}
