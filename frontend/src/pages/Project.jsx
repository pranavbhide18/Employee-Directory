import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Button,
    ButtonGroup,
    Select,
    Table,
    Label,
    TextInput,
    Textarea,
    Progress,
} from "flowbite-react";
import { useSelector } from "react-redux";

function Project() {
    const [project, setProject] = useState({});
    const [employee, setEmployee] = useState([]);
    const [manager, setManager] = useState();
    const [team, setTeam] = useState([]);
    const [newTask, setNewTask] = useState({
        taskName: "",
        description: "",
    });
    const { currentEmployee } = useSelector((state) => state.employee);
    const { projectId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await axios.get(`/api/projects/${projectId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log(res.data);
                    setProject(res.data);
                } catch (error) {
                    console.log("Error in fetching project data", error);
                }
            } else {
                console.log("Token not found...");
            }
        };

        const fetchEmployees = async () => {
            ``;
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const res = await axios.get("/api/employees", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    // console.log(res);
                    setEmployee(res.data);
                } catch (error) {
                    console.log("Error while fetching employees:", error);
                }
            } else {
                console.log("Token not found....");
            }
        };

        fetchProject();
        fetchEmployees();
    }, [team, manager, project.task]);

    const handleChange = (e) => {
        setManager(e.target.value);
    };

    const handleTaskChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.id]: e.target.value,
        });
    };

    const handleTeamChange = (e) => {
        const selectedOptions = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setTeam(selectedOptions);
    };

    // admin control
    const handleManagerChange = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await axios.post(
                    `/api/admin/projects/${projectId}/addManager`,
                    manager,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                // console.log(res);
                setManager(res.data);
            } catch (error) {
                console.log("Error while fetching employees:", error);
            }
        } else {
            console.log("Token not found....");
        }
    };

    // manager control
    const checkComplete = async (taskId) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                console.log("inside try");
                const res = await axios.put(
                    `/api/manager/tasks/${taskId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setProject((prevProject) => ({
                    ...prevProject,
                    tasks: prevProject.tasks.map((task) => {
                        if (task.id === taskId) {
                            return {
                                ...task,
                                completed: true,
                            };
                        }
                        return task;
                    }),
                }));
            } catch (error) {
                console.log("Error completing task", error);
            }
        } else {
            console.log("Token not found...");
        }
    };

    // manager control
    const deleteTask = async (taskId) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await axios.delete(`/api/manager/tasks/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProject((prevProject) => ({
                    ...prevProject,
                    tasks: prevProject.tasks.filter(
                        (task) => task.id != taskId
                    ),
                }));
            } catch (error) {
                console.log("Error deleting task", error);
            }
        } else {
            console.log("Token not found...");
        }
    };

    // manager control
    const addTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await axios.post(
                    `/api/manager/projects/${projectId}/task`,
                    newTask, // Send newTask directly
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setProject((prevProject) => ({
                    ...prevProject,
                    tasks: [...prevProject.tasks, res.data], // Add the new task to the tasks array
                }));

                // Clear the new task form fields
                setNewTask({
                    taskName: "",
                    description: "",
                });
            } catch (error) {
                console.log("Error adding a new task", error);
            }
        } else {
            console.log("Token not found...");
        }
    };

    // admin control
    const addTeamMembers = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await axios.post(
                    `/api/admin/projects/${projectId}/addEmployees`,
                    team,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log(res.data);
                setTeam(res.data);
            } catch (error) {
                console.log("Error in adding employees to the team");
            }
        } else {
            console.log("Token not found...");
        }
    };

    // admin control
    const handleDelete = async (projectId) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await axios.delete(
                    `/api/admin/projects/${projectId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(res.data);
                navigate("/project");
            } catch (error) {
                console.log("Error delete the project", error);
            }
        } else {
            console.log("Token not found...");
        }
    };

    return (
        <>
            <div className="flex justify-evenly w-full my-5 mx-10 gap-x-4">
                {/* General Project Details */}
                <div className="flex-1">
                    <h1>Project Details</h1>
                    <h2>Project Id : {project.id}</h2>
                    <h2 className="text-xl">
                        Project Name: {project.projectName}
                    </h2>
                    <h2>Project Description: {project.description}</h2>
                    <h2>Project Type: {project.projectType}</h2>
                    <h2>
                        Project Status:{" "}
                        {project.completed ? "Completed" : "Not Complete"}
                    </h2>
                    <h2>
                        Project Creation:{" "}
                        {new Date(project.createdAt).toDateString()}
                    </h2>
                    Project Manager :
                    {project.projectManager ? (
                        <span> {project.projectManager.firstName}</span>
                    ) : (
                        "Not Assigned"
                    )}
                    <div className="my-3">
                        Project Team :
                        {project.projectTeam &&
                            project.projectTeam.map((emp) => (
                                <React.Fragment key={emp.id}>
                                    <h3
                                        className={
                                            emp.role == "ROLE_MANAGER"
                                                ? "font-bold text-green-600 underline"
                                                : ""
                                        }
                                    >
                                        {emp.id} | {emp.firstName}{" "}
                                        {emp.lastName}
                                    </h3>
                                </React.Fragment>
                            ))}
                    </div>
                    <div>
                        Project Tasks:
                        <Table>
                            <Table.Body>
                                {project.tasks &&
                                    project.tasks.map((task) => (
                                        <Table.Row
                                            key={task.id}
                                            className={`text-black ${
                                                task.completed
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            } `}
                                        >
                                            <Table.Cell>
                                                {task.taskName}
                                            </Table.Cell>
                                            <Table.Cell className="truncate">
                                                {task.description}
                                            </Table.Cell>

                                            <Table.Cell>
                                                {(currentEmployee.role ==
                                                    "ROLE_ADMIN" ||
                                                    currentEmployee.id ==
                                                        project.projectManager
                                                            .id) && (
                                                    <Button.Group>
                                                        <Button
                                                            disabled={
                                                                task.completed
                                                            }
                                                            outline
                                                            onClick={() =>
                                                                checkComplete(
                                                                    task.id
                                                                )
                                                            }
                                                        >
                                                            &#10003;
                                                        </Button>
                                                        <Button
                                                            outline
                                                            onClick={() =>
                                                                deleteTask(
                                                                    task.id
                                                                )
                                                            }
                                                        >
                                                            X
                                                        </Button>
                                                    </Button.Group>
                                                )}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
                <div className="flex-1">
                    {/* Select Menu to assign Manager */}
                    {currentEmployee.role == "ROLE_ADMIN" && (
                        <div className="mt-4">
                            <div>
                                <form
                                    className="max-w-sm"
                                    onSubmit={handleManagerChange}
                                >
                                    <label
                                        htmlFor="manager"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {project.projectManager ? (
                                            <h2>Assign New Manager</h2>
                                        ) : (
                                            <h2>Assign Project Manager</h2>
                                        )}
                                    </label>
                                    <Select
                                        id="manager"
                                        value={manager}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">
                                            Assign a manager
                                        </option>
                                        {employee.map(
                                            (emp) =>
                                                emp.role != "ROLE_ADMIN" &&
                                                (project.projectManager ==
                                                    null ||
                                                    emp.id !=
                                                        project.projectManager
                                                            .id) && (
                                                    <option
                                                        className={
                                                            emp.role ==
                                                            "ROLE_MANAGER"
                                                                ? "text-red-600"
                                                                : "text-blue-600"
                                                        }
                                                        key={emp.id}
                                                        value={emp.id}
                                                    >
                                                        {emp.id} |{" "}
                                                        {emp.firstName}{" "}
                                                        {emp.lastName}{" "}
                                                        {emp.role ==
                                                        "ROLE_MANAGER"
                                                            ? `| (Project ${emp.projectId} | Manager) `
                                                            : emp.projectId
                                                            ? `| (Project ${emp.projectId})`
                                                            : ""}
                                                    </option>
                                                )
                                        )}
                                    </Select>
                                    <Button type="submit">
                                        Assign Manager
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Select Menu to add members */}
                    {currentEmployee.role == "ROLE_ADMIN" && (
                        <div className="mt-4">
                            <div>
                                <form
                                    className="max-w-sm"
                                    onSubmit={addTeamMembers}
                                >
                                    <label
                                        htmlFor="team"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {project.projectTeam ? (
                                            <h2>Add More Team Members</h2>
                                        ) : (
                                            <h2>Add Team Members</h2>
                                        )}
                                    </label>
                                    <Select
                                        multiple
                                        id="team"
                                        value={team}
                                        onChange={handleTeamChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">+ members</option>
                                        {employee.map(
                                            (emp) =>
                                                emp.role == "ROLE_EMPLOYEE" &&
                                                emp.projectId != projectId && (
                                                    <option
                                                        key={emp.id}
                                                        value={emp.id}
                                                        className={
                                                            emp.projectId
                                                                ? "text-red-600"
                                                                : "text-blue-700"
                                                        }
                                                    >
                                                        {emp.id} |{" "}
                                                        {emp.firstName}{" "}
                                                        {emp.lastName}{" "}
                                                        {emp.projectId
                                                            ? `| (Project ${emp.projectId})`
                                                            : ""}
                                                    </option>
                                                )
                                        )}
                                    </Select>
                                    <Button type="submit">Add Members</Button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Form for manager to add new task */}
                    {(currentEmployee.role == "ROLE_ADMIN" ||
                        (project.projectManager &&
                            project.projectManager.id ==
                                currentEmployee.id)) && (
                        <form onSubmit={addTask} className=" max-w-md">
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="taskName"
                                        value="Task Name"
                                    />
                                </div>
                                <TextInput
                                    id="taskName"
                                    type="text"
                                    placeholder="Task Name"
                                    value={newTask.taskName}
                                    onChange={handleTaskChange}
                                    required
                                    shadow
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="description"
                                        value="Description"
                                    />
                                </div>
                                <Textarea
                                    id="description"
                                    placeholder="Enter description..."
                                    value={newTask.description}
                                    onChange={handleTaskChange}
                                    required
                                    rows={2}
                                />
                            </div>
                            <Button type="submit">Add Task</Button>
                        </form>
                    )}

                    <div>
                        {currentEmployee.role == "ROLE_ADMIN" && (
                            <Button
                                className="my-5"
                                onClick={() => handleDelete(project.id)}
                            >
                                Delete Project
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Project;
