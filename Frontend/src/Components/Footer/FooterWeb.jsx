// Importa los íconos de react-icons y Link de react-router-dom
import React from 'react';
import { FaHome, FaHeart, FaPlusSquare, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './FooterWeb.css';

const FooterWeb = () => {
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
          <span>Notifications</span>
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
};

export default FooterWeb;
