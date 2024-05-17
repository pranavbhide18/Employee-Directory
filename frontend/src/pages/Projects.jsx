import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Projects() {
    const [projects, setProjects] = useState([]);
    const { currentEmployee } = useSelector((state) => state.employee);

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await axios.get("/api/projects", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProjects(res.data);
                } catch (error) {
                    console.log("Error in fetching all projects", error);
                }
            } else {
                console.log("Token does not exist...");
            }
        };

        fetchProjects();
    }, []);

    const handleDelete = async (projectId) => {
        const token = localStorage.getItem("token");
        if (token && currentEmployee.role === "ROLE_ADMIN") {
            try {
                await axios.delete(`/api/admin/projects/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjects((oldProjects) =>
                    oldProjects.filter((project) => project.id !== projectId)
                );
            } catch (error) {
                console.log("Error deleting the project", error);
            }
        } else {
            console.log(
                "Insufficient permissions to delete the project or token not found..."
            );
        }
    };

    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-pink-200 to-teal-100 p-8">
                <h1 className="text-3xl font-bold text-center text-blue-700 my-8">
                    Project List
                </h1>
                <div className="relative overflow-x-auto shadow-md rounded-lg w-full max-w-7xl bg-white p-6 max-h-screen overflow-y-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Project Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Project Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Project Manager
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Admin Controls
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr
                                    key={project.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {project.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/project/${project.id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {project.projectName}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        {project.projectManager !== null
                                            ? project.projectManager.username
                                            : "Not Assigned"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() =>
                                                handleDelete(project.id)
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Projects;
