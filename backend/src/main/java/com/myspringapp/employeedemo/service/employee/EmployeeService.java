package com.myspringapp.employeedemo.service.employee;

import com.myspringapp.employeedemo.entity.Employee;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployeeService {

    Employee findById(Integer id);

    List<Employee> findAll();

    List<Employee> findAllById(List<Integer> employeeIds);

    Employee save(Employee employee);

    List<Employee> saveAll(List<Employee> employees);

    Employee remove(Integer id);


}
