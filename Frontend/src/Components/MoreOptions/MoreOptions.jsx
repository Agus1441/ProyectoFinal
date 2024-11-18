// MoreOptions.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './MoreOptions.css';

const MoreOptions = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="more-options">
            <button onClick={toggleDropdown} className="three-dots">
                <img 
                    src="https://static.thenounproject.com/png/856781-200.png" 
                    alt="More options" 
                    className="icon"
                />
            </button>
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            )}
        </div>
    );
};

export default MoreOptions;
