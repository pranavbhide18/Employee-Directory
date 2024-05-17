import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextInput, Label } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function UpdateProfile() {
    const { empId } = useParams();
    const navigate = useNavigate();
    const { currentEmployee } = useSelector((state) => state.employee);
    const [formData, setFormData] = useState({
        id: empId,
        firstName: "",
        lastName: "",
        username: "",
    });

    useEffect(() => {
        if (currentEmployee.id != empId) {
            navigate(`/employee/${empId}`);
        } else {
            const fetchEmploye = async () => {
                const token = localStorage.getItem("token");
                if (token) {
                    try {
                        const res = await axios.get(`/api/employees/${empId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        const { username, firstName, lastName, password } =
                            res.data;
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            username,
                            firstName,
                            lastName,
                        }));
                        console.log(res.data);
                    } catch (error) {
                        console.log("Error fetching employee details");
                    }
                } else {
                    console.log("Token not found...");
                }
            };

            fetchEmploye();
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await axios.put(`/api/employees`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                navigate("/profile");
            } catch (error) {
                console.log("Error updating the employee", error);
            }
        } else {
            console.log("Token not found...");
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 to-yellow-100">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8"
                >
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Update Profile
                    </h1>
                    <div className="mb-4">
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-800 mb-2"
                        >
                            First Name
                        </label>
                        <TextInput
                            id="firstName"
                            type="text"
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            readOnly
                            className="w-full rounded-lg  bg-gray-100 border border-gray-300  text-sm text-gray-800 "
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-800 mb-2"
                        >
                            Last Name
                        </label>
                        <TextInput
                            id="lastName"
                            type="text"
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            readOnly
                            className="w-full rounded-lg "
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-800 mb-2"
                        >
                            Username
                        </label>
                        <TextInput
                            id="username"
                            type="text"
                            placeholder="Enter Username"
                            value={formData.username}
                            readOnly
                            className="w-full rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-800 mb-2"
                        >
                            New Password
                        </label>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="Enter New Password"
                            onChange={handleChange}
                            className="w-full rounded-lg bg-gray-100 border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-200 ease-in-out"
                    >
                        Update
                    </Button>
                </form>
            </div>
        </>
    );
}

export default UpdateProfile;
