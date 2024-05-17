import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Employees() {
    const [employee, setEmployee] = useState([]);
    const { currentEmployee } = useSelector((state) => state.employee);

    // contains function to fetch all the employees
    useEffect(() => {
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
        fetchEmployees();
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
                setEmployee((oldData) =>
                    oldData.filter((emp) => emp.id !== empId)
                );
            } catch (error) {
                console.log("Error in deleting employee", error);
            }
        } else {
            console.log("Token not found....");
        }
    };

    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-teal-200 to-pink-300 p-8">
                <h2 className="text-3xl text-center font-bold text-purple-700 mb-8">
                    Employee Directory
                </h2>
                <div className="relative overflow-x-auto shadow-md rounded-lg w-full max-w-7xl bg-white p-6 max-h-screen overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Employee Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Admin Controls
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((emp) => (
                                <React.Fragment key={emp.id}>
                                    {emp.role != "ROLE_ADMIN" && (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {emp.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    to={`/employee/${emp.id}`}
                                                >
                                                    {emp.firstName}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                {emp.lastName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {emp.role}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 transition duration-200 ease-in-out transform hover:scale-105 focus:scale-105"
                                                    onClick={() =>
                                                        handleDelete(emp.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Employees;
