package com.jb.Project_coupon_3.filters;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@Order(1)
public class CROSFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if(request.getMethod().equals("OPTIONS")) {
            response.setHeader("Access-Control-Allow-Origin", "*");    //http://localhost:3000
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
            response.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, Accept, Content-type, Access-Control-Request-Method, Access-Control-Request-Headers");
            response.setStatus(HttpServletResponse.SC_ACCEPTED);
        }else {
            filterChain.doFilter(request, response);
        }
    }
}
