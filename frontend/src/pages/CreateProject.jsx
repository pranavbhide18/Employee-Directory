import { useState } from "react";
import { Label, TextInput, Textarea, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateProject() {
    const [formData, setFormData] = useState({});

    const { currentEmployee } = useSelector((state) => state.employee);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token && currentEmployee.role == "ROLE_ADMIN") {
            try {
                const res = await axios.post("/api/admin/projects", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(res.data);
                navigate("/project");
            } catch (error) {
                console.log("Error in creating new project", error);
            }
        } else {
            console.log("Token not found...");
        }
    };
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-200 to-pink-300 shadow-lg p-8">
                <div className="w-full max-w-lg p-8 mx-auto flex flex-col bg-white rounded-md shadow-md">
                    <h1 className="text-center text-3xl font-bold mb-6 text-purple-700">
                        Create New Project
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Project Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Project Name"
                                onChange={handleChange}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105 shadow"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="type"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Project Type
                            </label>
                            <input
                                id="type"
                                type="text"
                                placeholder="Project Type"
                                onChange={handleChange}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105 shadow"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Project Description
                            </label>
                            <textarea
                                rows={8}
                                id="description"
                                placeholder="Project Description"
                                onChange={handleChange}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105 shadow"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg text-sm px-5 py-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
                        >
                            Create Project
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateProject;
