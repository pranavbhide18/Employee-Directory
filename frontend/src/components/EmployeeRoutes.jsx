import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EmployeeRoutes() {
    const { currentEmployee } = useSelector((state) => state.employee);
    return currentEmployee ? <Outlet /> : <Navigate to="/login" />;
}

export default EmployeeRoutes;
