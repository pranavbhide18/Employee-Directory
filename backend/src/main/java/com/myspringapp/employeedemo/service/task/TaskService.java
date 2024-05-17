package com.myspringapp.employeedemo.service.task;

import com.myspringapp.employeedemo.entity.Task;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface TaskService {

    Task findById(Integer id);

    List<Task> findAll();

    Task save(Task task);

    List<Task> saveAll(List<Task> tasks);

    Task delete(Integer id);
}
