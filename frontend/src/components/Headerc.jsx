import React from "react";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/employee/employeeSlice";
import { Link, useNavigate } from "react-router-dom";

function Headerc() {
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
    <nav className="w-64 bg-gradient-to-b from-purple-700 to-purple-500 shadow-lg text-white h-full fixed top-0 left-0">
      <div className="px-4 py-9">
        <Link to="/employee" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="text-2xl font-semibold">Directory</span>
        </Link>
        <div className="mt-8 flex flex-col">
          <ul className="space-y-4">
            <li>
              <Link
                to="/employee"
                className="block px-4 py-2 rounded transition duration-300 ease-in-out transform hover:bg-purple-500 hover:scale-105 focus:bg-purple-500"
              >
                Employees
              </Link>
            </li>
            <li>
              <Link
                to="/project"
                className="block px-4 py-2 rounded transition duration-300 ease-in-out transform hover:bg-purple-500 hover:scale-105 focus:bg-purple-500"
              >
                Projects
              </Link>
            </li>
            {currentEmployee && (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 rounded transition duration-300 ease-in-out transform hover:bg-purple-500 hover:scale-105 focus:bg-purple-500"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 rounded transition duration-300 ease-in-out transform bg-purple-700 hover:bg-purple-900 hover:scale-105 focus:bg-purple-900"
                  >
                    Logout
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Headerc;
