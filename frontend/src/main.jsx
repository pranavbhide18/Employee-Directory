import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

import Root from "./Root.jsx";
import Login from "./pages/Login.jsx";
import Employees from "./pages/Employees.jsx";
import Projects from "./pages/Projects.jsx";
import Profile from "./pages/Profile.jsx";
import Project from "./pages/Project.jsx";
import CreateEmployee from "./pages/CreateEmployee.jsx";
import AdminRoutes from "./components/AdminRoutes.jsx";
import EmployeeRoutes from "./components/EmployeeRoutes.jsx";
import Employee from "./pages/Employee.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import Profile1 from "./pages/final/Profile1.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route path="/login" element={<Login />} />

            <Route element={<EmployeeRoutes />}>
                <Route
                    path="/employee/:empId/update"
                    element={<UpdateProfile />}
                />

                <Route path="/employee" element={<Employees />} />
                <Route path="/project" element={<Projects />} />
                <Route path="/employee/:empId" element={<Employee />} />
                <Route path="/project/:projectId" element={<Project />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<AdminRoutes />}>
                <Route path="/create-employee" element={<CreateEmployee />} />
                <Route path="/create-project" element={<CreateProject />} />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
