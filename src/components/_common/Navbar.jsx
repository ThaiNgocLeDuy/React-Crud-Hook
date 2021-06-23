import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBug } from "react-icons/fa";
import "./Navbar.css";

function Navbar(props) {
  return (
    <nav className="nav_menu">
      <h3 className="logo">
        <Link to="/">LOGO</Link>
      </h3>
        <h3 className="text-center">React Crud App</h3>
      <ul className="nav_links">
        <li className="nav_item">
          <Link to="/">
            <FaHome /> Home
          </Link>
        </li>
        <li className="nav_item">
          <Link to="/about">
            <FaBug /> About me
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
