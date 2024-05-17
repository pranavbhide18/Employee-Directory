package com.myspringapp.employeedemo.service;

import com.myspringapp.employeedemo.dao.EmployeeRepository;
import com.myspringapp.employeedemo.entity.AuthenticationResponse;
import com.myspringapp.employeedemo.entity.Employee;
import com.myspringapp.employeedemo.entity.Role;
import com.myspringapp.employeedemo.entity.UserDTO;
import com.myspringapp.employeedemo.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }


    public UserDTO register(Employee request) {
        Employee employee = new Employee();
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setUsername(request.getUsername());
        employee.setPassword(passwordEncoder.encode(request.getPassword()));

        employee.setRole(Role.ROLE_EMPLOYEE);

        employee = employeeRepository.save(employee);

        String token = jwtService.generateToken(employee);

        AuthenticationResponse authRes = new AuthenticationResponse(token, employee);

        return authRes.getUserDTO();
    }

    public UserDTO authenticate(Employee request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        Employee employee = employeeRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(employee);

        AuthenticationResponse authRes = new AuthenticationResponse(token, employee);

        return authRes.getUserDTO();
    }
}
