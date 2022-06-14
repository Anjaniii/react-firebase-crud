import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddEmployee");
    } 
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate.push(`/search?name=${search}`);
    setSearch("");
  };
  return (
    <div className="header">
      <p className="logo">Employee data App</p>
      <div className="header-right">
        <form onSubmit={handleSubmit} style={{ display: "inline" }}>
          <input
            type="text"
            className="inputField"
            placeholder="Search Employee ..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === "AddEmployee" ? "active" : ""}`}
            onClick={() => setActiveTab("AddEmployee")}
          >
            Add Employee
          </p>
        </Link>
        
      </div>
    </div>
  );
};

export default Header;
