package com.myspringapp.employeedemo.entity;

import java.util.List;

public class UserDTO {
    private Integer id;
    private String username;
    private Role role;
    private String token;

    public UserDTO(Integer id, String username, Role role, String token) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.token = token;
    }

    public Integer getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Role getRole() {
        return role;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
