import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
    const [employee, setEmployee] = useState({});
    const [project, setProject] = useState({});
    const { currentEmployee } = useSelector((state) => state.employee);
    const { empId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchEmployee = async () => {
            if (token) {
                try {
                    const res = await axios.get(
                        `/api/employees/${currentEmployee.id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log(res.data);
                    setEmployee(res.data);
                    if (res.data.projectId) {
                        const projectRes = await axios.get(
                            `/api/projects/${res.data.projectId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        console.log(projectRes.data);
                        setProject(projectRes.data);
                    }
                } catch (error) {
                    console.log("Error fetching this employees data", error);
                }
            } else {
                console.log("Token not found...");
            }
        };
        fetchEmployee();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 to-pink-600">
            <div className="mx-auto max-w-xl">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-purple-800 text-center">
                        Employee Profile
                    </h2>
                    <div className="mb-4">
                        <p className="text-gray-700 mb-1">Id:</p>
                        <p className="text-lg font-medium">{employee.id}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 mb-1">First Name:</p>
                        <p className="text-lg font-medium">
                            {employee.firstName}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 mb-1">Last Name:</p>
                        <p className="text-lg font-medium">
                            {employee.lastName}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 mb-1">Username:</p>
                        <p className="text-lg font-medium">
                            {employee.username}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 mb-1">Role:</p>
                        <p className="text-lg font-medium">{employee.role}</p>
                    </div>
                    <div className="my-4">
                        <Link
                            to={`/employee/${employee.id}/update`}
                            className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors duration-300 ease-in-out w-full justify-center"
                        >
                            Update Profile
                        </Link>
                    </div>
                    <hr className="my-6" />
                    <h2 className="text-3xl font-bold mb-4 text-purple-800 text-center">
                        Project Details
                    </h2>
                    <h4 className="text-lg font-medium text-gray-800 mb-4">
                        Project Name: {project.projectName}
                    </h4>
                    <div className="my-4 flex justify-center">
                        <Link
                            to="/create-employee"
                            className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors duration-300 ease-in-out mr-4"
                        >
                            Create Employee
                        </Link>
                        <Link
                            to="/create-project"
                            className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors duration-300 ease-in-out"
                        >
                            Create Project
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
