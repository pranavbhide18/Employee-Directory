import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";

function Profile() {
    const [employee, setEmployee] = useState({});
    const [project, setProject] = useState({});
    const { currentEmployee } = useSelector((state) => state.employee);
    const { empId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchEmployee = async () => {
            if (token) {
                try {
                    const res = await axios.get(`/api/employees/${empId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
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

    // function to delete a user from directory
    const handleDelete = async (empId) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await axios.delete(
                    `/api/admin/employees/${empId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                // setEmployee((oldData) =>
                //     oldData.filter((emp) => emp.id !== empId)
                // );
                navigate("/employee");
            } catch (error) {
                console.log("Error in deleting employee", error);
            }
        } else {
            console.log("Token not found....");
        }
    };
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 p-8">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                    <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
                        Employee Profile
                    </h2>
                    <div className="mb-4">
                        <p className="text-gray-700 font-semibold">Id:</p>
                        <p className="text-lg font-medium text-gray-900">
                            {employee.id}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 font-semibold">
                            First Name:
                        </p>
                        <p className="text-lg font-medium text-gray-900">
                            {employee.firstName}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 font-semibold">
                            Last Name:
                        </p>
                        <p className="text-lg font-medium text-gray-900">
                            {employee.lastName}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 font-semibold">Username:</p>
                        <p className="text-lg font-medium text-gray-900">
                            {employee.username}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 font-semibold">Role:</p>
                        <p className="text-lg font-medium text-gray-900">
                            {employee.role}
                        </p>
                    </div>
                    {employee.projectId != null && (
                        <>
                            <hr className="my-6 border-gray-300" />
                            <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
                                Project Details
                            </h2>
                            <div>
                                <p className="text-gray-700 font-semibold">
                                    Project Name:
                                </p>
                                <p className="text-lg font-medium text-gray-900">
                                    {project.projectName}
                                </p>
                            </div>
                        </>
                    )}
                    <div className="mt-8 flex justify-between items-center">
                        <button
                            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
                            onClick={() => handleDelete(employee.id)}
                        >
                            Delete Employee
                        </button>
                        <button
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
                            onClick={() =>
                                navigate(`/employee/${employee.id}/update`)
                            }
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
