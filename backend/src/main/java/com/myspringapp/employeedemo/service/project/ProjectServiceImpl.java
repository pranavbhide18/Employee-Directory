package com.myspringapp.employeedemo.service.project;

import com.myspringapp.employeedemo.dao.ProjectRepository;
import com.myspringapp.employeedemo.entity.Project;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class ProjectServiceImpl implements ProjectService {

    private ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project findById(Integer id){
        Project project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));

        return project;
    }

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    @Override
    @Transactional
    public Project save(Project project) {

        return projectRepository.save(project);
    }

    @Override
    @Transactional
    public Project remove(Integer id) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));

        projectRepository.delete(project);

        return project;
    }



}
