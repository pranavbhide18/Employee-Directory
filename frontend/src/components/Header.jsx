import React from "react";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/employee/employeeSlice";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const {
    loading,
    error: errorMessage,
    currentEmployee,
  } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(signOutSuccess());
    navigate("/login");
  };

  return (
    <nav className="bg-green-900 text-white">
      <div className="mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/employee" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="text-2xl font-semibold">Directory</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/employee"
            className="px-3 py-2 rounded hover:bg-green-700 focus:outline-none focus:bg-green-700"
          >
            Employees
          </Link>
          <Link
            to="/project"
            className="px-3 py-2 rounded hover:bg-green-700 focus:outline-none focus:bg-green-700"
          >
            Projects
          </Link>
          {!currentEmployee ? (
            <Link
              to="/login"
              className="px-3 py-2 rounded hover:bg-green-700 focus:outline-none focus:bg-green-700"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to={`/profile`}
                className="px-3 py-2 rounded hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >
                Profile
              </Link>
              <Button onClick={handleLogout} className="px-3 py-2 rounded">
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
