import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function AdminRoutes() {
    const { currentEmployee } = useSelector((state) => state.employee);
    return currentEmployee && currentEmployee.role == "ROLE_ADMIN" ? (
        <Outlet />
    ) : (
        <Navigate to="/employee" />
    );
}

export default AdminRoutes;
