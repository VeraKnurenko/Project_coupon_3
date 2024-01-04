package com.jb.Project_coupon_3.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

//@Component
//@Order(2)
public class TokenFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        if(token == null){
            //no token from client
            response.setStatus(403);
            response.getWriter().write("You must log in!");
        }else {
            //we got token
            token = token.replace("Bearer ", "");
            try {
                JWT.decode(token).getClaim("role");
                //ok, everything checks out, client can move on to next step
                filterChain.doFilter(request, response);
            }catch (JWTDecodeException e){
                response.setStatus(401);
                response.getWriter().write("You must log in!");
            }
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        List<String> patterns = List.of("/auth/login ", "/general/getAllCoupons", "/admin/allcoupons", "/v3/api-docs, /configuration/, /swagger, /webjars,");//TODO MAKE general controller for home page
//        return request.getRequestURL().toString().contains("/auth");
        return patterns.stream().anyMatch(p -> request.getRequestURL().toString().contains(p) );
    }
}
