package com.myspringapp.employeedemo.controller;

import com.myspringapp.employeedemo.entity.Employee;
import com.myspringapp.employeedemo.entity.Project;
import com.myspringapp.employeedemo.entity.Role;
import com.myspringapp.employeedemo.entity.Task;
import com.myspringapp.employeedemo.service.employee.EmployeeService;
import com.myspringapp.employeedemo.service.project.ProjectService;
import com.myspringapp.employeedemo.service.task.TaskService;
import org.hibernate.Hibernate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectController {

    private ProjectService projectService;
    private EmployeeService employeeService;
    private TaskService taskService;

    public ProjectController(ProjectService projectService, EmployeeService employeeService, TaskService taskService) {
        this.projectService = projectService;
        this.employeeService = employeeService;
        this.taskService = taskService;
    }

    // Fetch all the projects
    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.findAll();

        return ResponseEntity.ok(projects);
    }

    // Fetch single project using project id
    @GetMapping("/projects/{projectId}")
    public ResponseEntity<Project> getProject(@PathVariable int projectId) {
        Project project = projectService.findById(projectId);

        return ResponseEntity.ok(project);
    }

    // Create a new project
    @PostMapping("/admin/projects")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {

        project.setCreatedAt(new Date(System.currentTimeMillis()));
        Project newProject = projectService.save(project);

        return ResponseEntity.ok(newProject);
    }

    // Update existing project
    @PutMapping("/admin/projects/{projectId}")
    public ResponseEntity<Project> updateProject(@PathVariable int projectId,@RequestBody Project request) {
        Project project = projectService.findById(projectId);

        project.setProjectName(request.getProjectName());
        project.setDescription(request.getDescription());
        project.setProjectType(request.getProjectType());

        projectService.save(project);

        return ResponseEntity.ok(project);
    }

    // Delete an existing project using project id
    @DeleteMapping("/admin/projects/{projectId}")
    public ResponseEntity<Project> deleteProject(@PathVariable int projectId) {
        Project project = projectService.findById(projectId);

        Hibernate.initialize(project.getProjectTeam());
        Hibernate.initialize(project.getTasks());

        Employee manager = null;
        if(project.getProjectManager() != null) {
            manager = project.getProjectManager();
            manager.setRole(Role.ROLE_EMPLOYEE);
            employeeService.save(manager);
        }

        if(project.getTasks() != null) {
            for(Task task : project.getTasks()) {
                task.setProject(null);
                taskService.delete(task.getId());

            }
        }

        for (Employee employee : project.getProjectTeam()) {
            employee.setProject(null);
        }

        projectService.remove(projectId);

        return ResponseEntity.ok(project);
    }

    // Assign project to employees
    @PostMapping("/admin/projects/{projectId}/addEmployees")
    public ResponseEntity<Project> addEmployeesToProject(@PathVariable int projectId,  @RequestBody List<Integer> employeeIds) {
        Project project = projectService.findById(projectId);

        if(project == null) {
            return ResponseEntity.notFound().build();
        }

        List<Employee> employees = employeeService.findAllById(employeeIds);
        if (employees.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        project.addEmployeesToProject(employees);
        projectService.save(project);

        return ResponseEntity.ok(project);
    }

    // Assign project manager to a project
    @PostMapping("/admin/projects/{projectId}/addManager")
    public ResponseEntity<Project> setProjectManager(@PathVariable int projectId,@RequestBody int employeeId) {
        Employee manager = employeeService.findById(employeeId);
        Project project = projectService.findById(projectId);
        Employee preManager = null;

        if(project.getProjectManager() != null) {
            preManager = project.getProjectManager();
            preManager.setProject(null);
            preManager.setRole(Role.ROLE_EMPLOYEE);
            employeeService.save(preManager);
        }

        if(manager == null) {
            return ResponseEntity.notFound().build();
        }
        manager.setRole(Role.ROLE_MANAGER);
        manager.setProject(project);
        project.setProjectManager(manager);


        employeeService.save(manager);
        projectService.save(project);

        return ResponseEntity.ok(project);

    }
}
