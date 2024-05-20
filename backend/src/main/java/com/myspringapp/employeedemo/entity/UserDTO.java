package com.myspringapp.employeedemo.entity;

import java.util.List;

public class UserDTO {
    private Integer id;
    private String username;
    private Role role;
    private String token;
    private Integer projectId;

    public UserDTO(Integer id, String username, Role role, String token, Integer projectId) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.token = token;
        this.projectId = projectId;
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

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }
}
