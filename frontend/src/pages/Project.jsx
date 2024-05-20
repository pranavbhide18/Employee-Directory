import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Select, Table } from "flowbite-react";
import { RiDeleteBin6Line } from "react-icons/ri";
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

    const isAdminOrProjectManager =
        currentEmployee.role == "ROLE_ADMIN" ||
        (project.projectManager &&
            project.projectManager.id == currentEmployee.id);

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-pink-300 space-y-8 px-16">
            {/* First section */}
            <div className="flex space-x-8 text-center w-full">
                <div className="  bg-white p-4 rounded-md shadow-lg flex-grow max-w-11">
                    <p>{project.id}</p>
                </div>
                <div className="border-l-2 border-gray-400"></div>
                <div className="min-w-[600px] bg-white p-4 rounded-md shadow-lg">
                    <p>{project.projectName}</p>
                </div>
                <div className="border-l-2 border-gray-400"></div>
                <div className="min-w-64 bg-white p-4 rounded-md shadow-lg">
                    <p>{project.projectType}</p>
                </div>
                <div className="border-l-2 border-gray-400"></div>
                <div className="min-w-44 bg-white p-4 rounded-md shadow-lg">
                    <p>{project.completed ? "Completed" : "Not Complete"}</p>
                </div>
                <div className="border-l-2 border-gray-400"></div>
                <div className="min-w-44 bg-white p-4 rounded-md shadow-lg">
                    <p>{new Date(project.createdAt).toDateString()}</p>
                </div>
            </div>

            {/* *************** */}
            <div className="flex space-x-8 w-full ">
                {/* Second section */}
                <div className="flex flex-col space-y-4 w-full">
                    <div className="min-h-44 bg-white p-4 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105">
                        <h2>Description:</h2>
                        <p>{project.description}</p>
                    </div>
                    <div className="min-h-72 max-h-72  bg-white p-4 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105 overflow-y-scroll">
                        <div>
                            <h2>Project Tasks:</h2>
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
                                                }`}
                                            >
                                                <Table.Cell>
                                                    {task.taskName}
                                                </Table.Cell>
                                                <Table.Cell className="truncate">
                                                    {task.description}
                                                </Table.Cell>
                                                {isAdminOrProjectManager && (
                                                    <Table.Cell>
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
                                                                onClick={() =>
                                                                    deleteTask(
                                                                        task.id
                                                                    )
                                                                }
                                                                outline
                                                            >
                                                                <RiDeleteBin6Line />
                                                            </Button>
                                                        </Button.Group>
                                                    </Table.Cell>
                                                )}
                                            </Table.Row>
                                        ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="min-h-72 max-h-72 bg-white p-4 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105 w-full overflow-y-scroll">
                            <div className="my-3">
                                <h2>Project Team:</h2>
                                {project.projectTeam &&
                                    project.projectTeam.map((emp) => (
                                        <h3
                                            key={emp.id}
                                            className={
                                                emp.role === "ROLE_MANAGER"
                                                    ? "font-bold text-green-600 underline"
                                                    : ""
                                            }
                                        >
                                            {emp.id} | {emp.firstName}{" "}
                                            {emp.lastName}
                                        </h3>
                                    ))}
                            </div>
                        </div>
                        {currentEmployee.role == "ROLE_ADMIN" && (
                            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full">
                                <form
                                    onSubmit={addTeamMembers}
                                    className="max-w-sm space-y-4"
                                >
                                    <label
                                        htmlFor="team"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        <h2>
                                            {project.projectTeam
                                                ? "Add More Team Members"
                                                : "Add Team Members"}
                                        </h2>
                                    </label>
                                    <Select
                                        multiple
                                        id="team"
                                        value={team}
                                        onChange={handleTeamChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    >
                                        <option value="">+ members</option>
                                        {employee
                                            .filter(
                                                (emp) =>
                                                    emp.role ===
                                                        "ROLE_EMPLOYEE" &&
                                                    emp.projectId !== projectId
                                            )
                                            .map((emp) => (
                                                <option
                                                    key={emp.id}
                                                    value={emp.id}
                                                    className={
                                                        emp.projectId
                                                            ? "text-red-600"
                                                            : "text-blue-700"
                                                    }
                                                >
                                                    {emp.id} | {emp.firstName}{" "}
                                                    {emp.lastName}{" "}
                                                    {emp.projectId
                                                        ? `| (Project ${emp.projectId})`
                                                        : ""}
                                                </option>
                                            ))}
                                    </Select>
                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Add Members
                                    </Button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                {/* Third section */}
                <div className="flex flex-col space-y-4 w-full">
                    <div className=" bg-white p-4 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105 ">
                        {project.projectManager ? (
                            <p>
                                {" "}
                                {project.projectManager.firstName}{" "}
                                {project.projectManager.lastName}
                            </p>
                        ) : (
                            "Manager not Assigned"
                        )}
                    </div>
                    {currentEmployee.role == "ROLE_ADMIN" && (
                        <div className=" bg-white p-4 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105 ">
                            {
                                <div className="mt-4">
                                    <form
                                        className="max-w-sm"
                                        onSubmit={handleManagerChange}
                                    >
                                        <label
                                            htmlFor="manager"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            <h2>
                                                {project.projectManager
                                                    ? "Assign New Manager"
                                                    : "Assign Project Manager"}
                                            </h2>
                                        </label>
                                        <select
                                            id="manager"
                                            value={manager}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value="">
                                                Assign a manager
                                            </option>
                                            {employee.map((emp) => (
                                                <option
                                                    key={emp.id}
                                                    value={emp.id}
                                                    className={
                                                        emp.role ===
                                                        "ROLE_MANAGER"
                                                            ? "text-red-600"
                                                            : "text-blue-600"
                                                    }
                                                >
                                                    {`${emp.id} | ${
                                                        emp.firstName
                                                    } ${emp.lastName} ${
                                                        emp.role ===
                                                        "ROLE_MANAGER"
                                                            ? `(Project ${emp.projectId} | Manager)`
                                                            : emp.projectId
                                                            ? `(Project ${emp.projectId})`
                                                            : ""
                                                    }`}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="submit"
                                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                                        >
                                            Assign Manager
                                        </button>
                                    </form>
                                </div>
                            }
                        </div>
                    )}
                    {isAdminOrProjectManager && (
                        <div className=" bg-white p-4 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105">
                            <form onSubmit={addTask} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="taskName"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Task Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="taskName"
                                            type="text"
                                            placeholder="Enter task name"
                                            value={newTask.taskName}
                                            onChange={handleTaskChange}
                                            required
                                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        placeholder="Enter description..."
                                        value={newTask.description}
                                        onChange={handleTaskChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                                >
                                    Add Task
                                </button>
                            </form>
                        </div>
                    )}
                    {currentEmployee.role == "ROLE_ADMIN" && (
                        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ">
                            <h2 className="text-md font-semibold text-gray-800 pb-2 ">
                                Project Control
                            </h2>

                            <Button
                                className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                onClick={() => handleDelete(project.id)}
                            >
                                Delete Project
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Project;
