import profilelogo from "../Images/profilelogo.webp";
import docnlplogo from "../Images/docnlp.webp";
import NavImage from '../Images/nav.webp'
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to close the dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener to handle clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstname");
    toast.success("You have been logged out !");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <header className="bg-gradient-to-r from-rose-600 to-rose-400 ">
      <nav className="px-4 lg:px-4">
        <div className="flex items-center justify-between h-16">
          {/* <h1 className="ml-4">DocNLP</h1> */}
          <Link to={'/home'}>
          <img className="h-16 w-24 " src={NavImage} alt="DocNlplogo"/>
          </Link>
          {/* <img src="../images/hamburger-menu.svg"/> */}
          <div className="pr-10 flex">
            <button
              type="button"
              className="mr-7 text-sm bg- rounded-full md:mr-0  items-right flex items-center"
              id="user-menu-button"
              aria-expanded={isDropdownOpen}
              onClick={toggleDropdown}
            >
            
              <img
                className="w-8 h-8 rounded-full"
                src={profilelogo}
                alt="userphoto"
              />
              {/* Dropdown menu */}
              <div className="text-lg text-white ml-2">
                Hi, {localStorage.getItem("firstname")}
              </div>
              {isDropdownOpen && (
                <div
                  className="z-60 absolute mt-56 mr-56 w-32 bg-white rounded-lg duration-700"
                  id="user-dropdown"
                  ref={dropdownRef}
                >
                  <ul className="text-center space-y-4 p-4">
                    <li>
                      
                      <Link to={"/home"}className=" text-md text-gray-700 font-semibold p-2 rounded-md hover:bg-rose-400 rounded-4xl hover:text-white">My Profile</Link>
                    </li>
                    <li>
                      
                      <Link to={"/home"} className=" text-md text-gray-700 font-semibold p-2 rounded-md hover:bg-rose-400 hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                      
                      <Link to={"/home"} className=" text-md text-gray-700 font-semibold p-2 rounded-md hover:bg-rose-400 hover:text-white">Settings</Link>
                    </li>
                    <li>
                      
                    </li>

                    <Link className=" pb-2 text-md font-bold text-black p-2  cursor-pointer hover:bg-rose-400 hover:text-white rounded-md" onClick={handleLogout}>Sign out</Link>
                    <br/>                   
                  </ul>
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
