import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateEmployee() {
    const [employee, setEmployee] = useState({});
    const { currentEmployee } = useSelector((state) => state.employee);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token && currentEmployee.role == "ROLE_ADMIN") {
            try {
                console.log(employee);
                console.log(currentEmployee.role);
                console.log(token);
                const res = await axios.post("/api/admin/employees", employee, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                navigate("/employee");
            } catch (error) {
                console.log("Error creating new employee", error);
            }
        } else {
            console.log("Your token doesnt have Admin Access");
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-200 to-blue-200 shadow-lg rounded-md p-8">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-8 rounded-md shadow-lg"
                >
                    <h1 className="text-center text-3xl font-bold mb-6 text-purple-700">
                        Create New Employee
                    </h1>

                    <div className="mb-4">
                        <label
                            htmlFor="firstName"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
                            placeholder="Enter First Name"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="lastName"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
                            placeholder="Enter Last Name"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
                            placeholder="Enter Username"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
                            placeholder="Enter email"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
                            placeholder="Enter Password"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg text-sm px-5 py-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
                    >
                        Create Employee
                    </button>
                </form>
            </div>
        </>
    );
}

export default CreateEmployee;
