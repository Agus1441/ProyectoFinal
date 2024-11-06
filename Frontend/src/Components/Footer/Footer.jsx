import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaHome, FaHeart, FaPlusSquare, FaUserCircle } from 'react-icons/fa';
import './Footer.css';
import Logout from "../Logout/logout";

const Footer = () => {
    const navigate = useNavigate();
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isDesktop) {
        return (
            <div className="footer-web">
                <h1 className="footer-logo">fakestagram</h1>
                <nav className="footer-nav">
                    <Link to="/myfeed" className="footer-item">
                        <FaHome className="footer-icon" />
                        <span>Home</span>
                    </Link>
                    <Link to="/notifications" className="footer-item">
                        <FaHeart className="footer-icon" />
                        <span>Notificaciones</span>
                    </Link>
                    <Link to="/create" className="footer-item">
                        <FaPlusSquare className="footer-icon" />
                        <span>Create</span>
                    </Link>
                    <Link to="/myprofile" className="footer-item">
                        <FaUserCircle className="footer-icon" />
                        <span>Profile</span>
                    </Link>
                </nav>
            </div>
        );
    }

    return (
        <div className="footer">
            <button onClick={() => navigate("/myfeed")}>
                <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Feed" className="icon" />
            </button>
            <button onClick={() => navigate("/myprofile")}>
                <img src="https://i.pinimg.com/736x/37/8a/27/378a270e775265622393da8c0527417e.jpg" alt="Profile" className="profile-picture" />
            </button>
        </div>
    );
};

export default Footer;
