package com.myspringapp.employeedemo.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id")
    private Integer id;

    @Column(name = "project_name")
    private String projectName;

    @ManyToOne
    @JoinColumn(name = "project_manager_id")
    private Employee projectManager;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "project_type")
    private String projectType;

    @Column(name = "created_At")
    private Date createdAt;

    @Column(name = "completed", columnDefinition = "BOOLEAN")
    private boolean completed;

    @OneToMany(mappedBy = "project")
    @JsonManagedReference
    private List<Employee> projectTeam;


    @OneToMany(mappedBy = "project")
    @JsonManagedReference
    private List<Task> tasks;

    public Project () {}

    public Project(String projectName, Employee projectManager, List<Employee> projectTeam, List<Task> tasks) {
        this.projectName = projectName;
        this.projectManager = projectManager;
        this.projectTeam = projectTeam != null ? projectTeam : new ArrayList<>();;
        this.tasks = tasks != null ? tasks : new ArrayList<>();
        this.completed = false;
        this.createdAt = new Date(System.currentTimeMillis());
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public Employee getProjectManager() {
        return projectManager;
    }

    public void setProjectManager(Employee projectManager) {
        this.projectManager = projectManager;
    }

    public List<Employee> getProjectTeam() {
        return projectTeam;
    }

    public void setProjectTeam(List<Employee> projectTeam) {
        this.projectTeam = projectTeam;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProjectType() {
        return projectType;
    }

    public void setProjectType(String projectType) {
        this.projectType = projectType;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }


    // add convenience method to add the project manager
    public void addProjectManager(Employee employee) {
        setProjectManager(employee);
    }

    // add convenience method to add an employee to the team
    public void addEmployeesToProject(List<Employee> employees) {
        if (projectTeam == null) {
            projectTeam = new ArrayList<>();
        }
        projectTeam.addAll(employees);
        for (Employee employee : employees) {
            employee.setProject(this);
        }
    }

    // method to add a single task to the project
    public void addTask(Task newTask) {
        if(tasks == null) {
            tasks = new ArrayList<>();
        }

        tasks.add(newTask);
        newTask.setCreatedAt(new Date(System.currentTimeMillis()));
        newTask.setProject(this);
    }

    // method to add multiple tasks to the project
    public void addTasks(List<Task> newTasks) {
        if(tasks == null) {
            tasks = new ArrayList<>();
        }

        tasks.addAll(newTasks);
        for(Task task : newTasks) {
            task.setCreatedAt(new Date(System.currentTimeMillis()));
            task.setProject(this);
        }

    }



}
