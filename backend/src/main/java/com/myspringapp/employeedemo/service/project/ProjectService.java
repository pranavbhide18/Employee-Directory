package com.myspringapp.employeedemo.service.project;

import com.myspringapp.employeedemo.entity.Project;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ProjectService {

    Project findById(Integer id);

    List<Project> findAll();

    Project save(Project project);

    Project remove(Integer id);

}
