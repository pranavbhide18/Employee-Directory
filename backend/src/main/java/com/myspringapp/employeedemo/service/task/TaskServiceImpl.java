package com.myspringapp.employeedemo.service.task;

import com.myspringapp.employeedemo.dao.ProjectRepository;
import com.myspringapp.employeedemo.dao.TaskRepository;
import com.myspringapp.employeedemo.entity.Project;
import com.myspringapp.employeedemo.entity.Task;
import com.myspringapp.employeedemo.dto.TaskRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
@Component
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService{

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    @Override
    public Task findTaskById(Integer id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Override
    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    @Transactional
    public Task createTask(Integer projectId, TaskRequest task) {
        Task newTask = Task.builder()
                .name(task.name())
                .description(task.description())
                .createdAt(new Date(System.currentTimeMillis()))
                .build();

        Project taskProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        taskProject.addTask(newTask);

        taskRepository.save(newTask);
        projectRepository.save(taskProject);

        return newTask;
    }

    @Override
    @Transactional
    public List<Task> createMultipleTask(Integer projectId, List<Task> tasks) {
        Project taskProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        taskProject.addTasks(tasks);

        taskRepository.saveAll(tasks);
        projectRepository.save(taskProject);

        return tasks;
    }

    @Override
    @Transactional
    public Task deleteTask(Integer id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setProject(null);
        taskRepository.deleteById(id);

        return task;
    }

    @Override
    @Transactional
    public Task completeTask(Integer id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        task.setCompleted(true);

        return taskRepository.save(task);
    }



}
