import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import "./header.css";
const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    console.log('Dropdown toggled'); // Add this line
    setDropdownVisible((prevDropdownVisible) => !prevDropdownVisible);
  };

  const handlelogout = ()=>{
    localStorage.clear()
    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "You have successfully Logout ",
    });

  }
  
  
  return (
    <nav className="navbar-admin">
      <h3 className="logo-admin">DGMT_ADMIN</h3>
      <ul className="navlist-admin">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mark-attendce">Mark Attendence</Link>
        </li>
        <li>
          <Link to="/attendceDownload">Download All Attendence</Link>
        </li>
        <li>
          <Link to="/download-client">Download All Clients</Link>
        </li>
        <li>
          <Link to="/register">Make A Executive</Link>
        </li>
        <li>
          <Link to="/All-executive">All Executive</Link>
        </li>
        <li>
          <Link to="/all-client">Get Client Information</Link>
        </li>
        <li>
          <Link to="/user-seacrch">Seacrh user</Link>
        </li>
        <div className="dropdown">
  <span className="dropdown-toggle" onClick={toggleDropdown}>
    Action
  </span>
  {/* Dropdown content */}
  <div className={`dropdown-content ${dropdownVisible ? 'dropdown-content-visible' : ''}`}>
    <Link to="/login">Login</Link>
    <Link onClick={handlelogout} >Logout</Link>
    {/* Additional dropdown options */}
    {/* <Link to="/other-option">Other Option</Link> */}
  </div>
</div>

      </ul>
    </nav>
  );
};

export default Header;
