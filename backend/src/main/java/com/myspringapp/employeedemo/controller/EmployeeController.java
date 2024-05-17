package com.myspringapp.employeedemo.controller;

import com.myspringapp.employeedemo.entity.Employee;
import com.myspringapp.employeedemo.entity.Project;
import com.myspringapp.employeedemo.entity.Role;
import com.myspringapp.employeedemo.service.employee.EmployeeService;
import com.myspringapp.employeedemo.service.project.ProjectService;
import org.hibernate.Hibernate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    private EmployeeService employeeService;
    private ProjectService projectService;
    private final PasswordEncoder passwordEncoder;

    public EmployeeController(EmployeeService employeeService, ProjectService projectService, PasswordEncoder passwordEncoder) {
        this.employeeService = employeeService;
        this.projectService = projectService;
        this.passwordEncoder = passwordEncoder;
    }

    // Fetch all the employees
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> findAllEmployees() {
        List<Employee> list = employeeService.findAll();

        return ResponseEntity.ok(list);
    }

    // Fetch single employee using employee id
    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<Employee> findEmployeeById(@PathVariable Integer employeeId) {
        Employee employee = employeeService.findById(employeeId);

        return ResponseEntity.ok(employee);
    }

    // Create an employee
    @PostMapping("/admin/employees")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {

        employee.setRole(Role.ROLE_EMPLOYEE);
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        Employee newEmployee = employeeService.save(employee);

        return ResponseEntity.ok(newEmployee);
    }

    // Create multiple employees
    @PostMapping("/admin/employees/all")
    public ResponseEntity<List<Employee>> addEmployeeList(@RequestBody List<Employee> employees) {
        List<Employee> newEmployees = employees.stream()
                .peek(emp -> {
                    emp.setRole(Role.ROLE_EMPLOYEE);
                    emp.setPassword(passwordEncoder.encode(emp.getPassword()));
                })
                .collect(Collectors.toList());

        newEmployees = employeeService.saveAll(newEmployees);

        return ResponseEntity.ok(newEmployees);
    }


    // Update an employee
    @PutMapping("/employees")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        Employee existing = employeeService.findById(employee.getId());

        if(existing == null) return ResponseEntity.notFound().build();

        if(employee.getFirstName() != null) existing.setFirstName(employee.getFirstName());
        if(employee.getLastName() != null) existing.setLastName(employee.getLastName());
        if(employee.getPassword() != null) existing.setPassword(passwordEncoder.encode(employee.getPassword()));
        if(employee.getUsername() != null) existing.setUsername(employee.getUsername());

        employeeService.save(existing);
        return ResponseEntity.ok(existing);
    }

    // Delete an employee
    @DeleteMapping("/admin/employees/{employeeId}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable int employeeId) {
        Employee employee = employeeService.findById(employeeId);
        Project project = null;
        if(employee.getProjectId() != null) {
            project = projectService.findById(employee.getProjectId());
            employee.setProject(null);
            if(employee.getRole() == Role.ROLE_MANAGER) {
                project.setProjectManager(null);
            }
            projectService.save(project);
        }


        employeeService.remove(employeeId);

        return ResponseEntity.ok(employee);
    }
}
