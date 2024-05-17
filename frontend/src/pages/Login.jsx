import React, { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess } from "../redux/employee/employeeSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({});
    const { loading, error: errorMessage } = useSelector(
        (state) => state.employee
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/login", formData);
            const token = res.data.token;
            // Store the token in local storage
            localStorage.setItem("token", token);
            if (token) {
                dispatch(signInSuccess(res.data));
                navigate("/employee");
            }
        } catch (e) {
            console.log("Error while registering Employee", e);
        }
    };
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Login to Your Account
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-sm text-gray-800 mb-2"
                            >
                                Username
                            </label>
                            <TextInput
                                id="username"
                                type="text"
                                placeholder="Enter Username"
                                onChange={handleChange}
                                className="w-full rounded-lg  focus:border-purple-500 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105 bg-gray-100 border border-gray-300  text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm text-gray-800 mb-2"
                            >
                                Password
                            </label>
                            <TextInput
                                id="password"
                                type="password"
                                placeholder="Enter Password"
                                onChange={handleChange}
                                className="w-full rounded-lg  focus:border-purple-500 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105 bg-gray-100 border border-gray-300  text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-200 ease-in-out"
                        >
                            Login Account
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
