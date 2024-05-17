package com.myspringapp.employeedemo.entity;

public class AuthenticationResponse {
    private String token;
    private Employee employee;
    private UserDTO userDTO;



    public AuthenticationResponse(String token, Employee employee) {
        this.token = token;
        this.employee = employee;
        this.userDTO = new UserDTO(employee.getId(), employee.getUsername(), employee.getRole(), this.token);
    }

    public String getToken() {
        return token;
    }

    public Employee getUser() {
        return employee;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }
}
