import React from "react";
import { Outlet } from "react-router-dom";
import Headerc from "./components/Headerc.jsx";
import Login from "./pages/Login.jsx";
import { useSelector } from "react-redux";

function Root() {
    const { currentEmployee } = useSelector((state) => state.employee);
    return (
        <>
            {currentEmployee ? (
                <div className="flex min-h-screen">
                    <Headerc />
                    <div className="flex-grow  ml-64 ">
                        <Outlet />
                    </div>
                </div>
            ) : (
                <div className="flex  min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 justify-center">
                    <div>
                        <Login />
                    </div>
                </div>
            )}
        </>
    );
}

export default Root;
