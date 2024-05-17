package com.myspringapp.employeedemo.controller;

import com.myspringapp.employeedemo.entity.Project;
import com.myspringapp.employeedemo.entity.Task;
import com.myspringapp.employeedemo.service.project.ProjectService;
import com.myspringapp.employeedemo.service.task.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {
    private TaskService taskService;
    private ProjectService projectService;

    public TaskController(TaskService taskService, ProjectService projectService) {
        this.taskService = taskService;
        this.projectService = projectService;
    }

    // Fetch all the tasks
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> findAllTasks() {
        List<Task> tasks = taskService.findAll();

        return ResponseEntity.ok(tasks);
    }

    // Fetch a specific task using task id
    @GetMapping("/tasks/{taskId}")
    public ResponseEntity<Task> findTaskById(@PathVariable Integer taskId) {
        Task task = taskService.findById(taskId);

        if(task == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(task);
    }

    // Create one task for a specific project using project id
    @PostMapping("/manager/projects/{projectId}/task")
    public ResponseEntity<Task> createTask(@PathVariable Integer projectId, @RequestBody Task task) {
        Project taskProject  = projectService.findById(projectId);

        taskProject.addTask(task);

        Task newTask = taskService.save(task);
        projectService.save(taskProject);

        return ResponseEntity.ok(newTask);
    }

    // Create multiple tasks for a specific project using project id
    @PostMapping("/manager/projects/{projectId}/tasks")
    public ResponseEntity<List<Task>> createMultipleTask(@PathVariable Integer projectId, @RequestBody List<Task> tasks) {
        Project taskProject  = projectService.findById(projectId);

        taskProject.addTasks(tasks);

        List<Task> newTasks = taskService.saveAll(tasks);
        projectService.save(taskProject);

        return ResponseEntity.ok(newTasks);
    }

    // Delete a specific task using task id
    @DeleteMapping("/manager/tasks/{taskId}")
    public ResponseEntity<Task> deleteTask(@PathVariable Integer taskId) {
        Task task = taskService.findById(taskId);
        task.setProject(null);

        taskService.delete(taskId);

        return ResponseEntity.ok(task);
    }

    // Set a specific task as complete
    @PutMapping("/manager/tasks/{taskId}")
    public ResponseEntity<Task> completeTask(@PathVariable Integer taskId) {
        Task task = taskService.findById(taskId);
        // Check if the task exists
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        task.setCompleted(true);

        Task updatedTask = taskService.save(task);

        return ResponseEntity.ok(updatedTask);
    }

}
