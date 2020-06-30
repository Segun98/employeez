import React, { useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { Icon } from "@chakra-ui/core";
import { useAuth } from "./../Context/authcontext";
import { url } from "../utils";

interface props {
  name?: string;
}

const MainHeader: React.FC<props> = ({ name }) => {
  const [ham, setham] = useState(false);

  let location = useLocation();
  const { setisAuth }: any = useAuth()!;

  // Change text on header based on location
  function headerName() {
    if (location.pathname === "/dashboard") {
      return "Dashboard";
    } else if (location.pathname === "/dashboard/edit") {
      return "Edit Dashboard";
    } else if (location.pathname === "/employees") {
      return "Employee Directory";
    } else if (location.pathname === "/add-employee") {
      return "Onboard Employee";
    } else if (location.pathname === "/add-customer") {
      return "Register Customer";
    } else if (location.pathname === "/customers") {
      return "Customer Directory";
    } else if (name) {
      return name;
    } else if (location.pathname === "/send-mail") {
      return "Employee Emails";
    } else if (location.pathname === "/customer-mail") {
      return "Customer Emails";
    } else if (location.pathname === "/dashboard/create") {
      return "Create Dashboard";
    }
  }

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to LogOut?")) {
      const instance = axios.create({
        withCredentials: true,
      });

      try {
        const res = await instance.post(`${url}/api/logout`);
        if (res.data.message === "Logged out") {
          setisAuth(false);
          return true;
        }
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }
  };

  function toggleMenu() {
    setham(!ham);
  }

  return (
    <div>
      <section>
        <div
          className={ham ? "mainheader-head open-hamburger" : "mainheader-head"}
        >
          <ul>
            <li onClick={toggleMenu}>
              <Icon name="arrow-right" />
            </li>
            <li
              style={{
                textDecoration:
                  location.pathname === "/dashboard" ? "underline" : "none",
              }}
            >
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li
              style={{
                textDecoration:
                  location.pathname === "/employees" ? "underline" : "none",
              }}
            >
              <Link to="/employees">Employee Directory</Link>
            </li>
            <li
              style={{
                textDecoration:
                  location.pathname === "/add-employee" ? "underline" : "none",
              }}
            >
              <Link to="/add-employee">Onboard Employee</Link>
            </li>
            <li
              style={{
                textDecoration:
                  location.pathname === "/customers" ? "underline" : "none",
              }}
            >
              <Link to="/customers">Customer Directory</Link>
            </li>
            <li
              style={{
                textDecoration:
                  location.pathname === "/add-customer" ? "underline" : "none",
              }}
            >
              <Link to="/add-customer">Register Customer</Link>
            </li>
            <li style={{ cursor: "pointer" }}>
              <a href="/about#contact">Request a Feature</a>
            </li>
            <li style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </section>
      <section className="aside-header">
        <div className="aside-header-wrap">
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <aside className="hamburger" onClick={toggleMenu}>
              <Icon name="arrow-right" />
            </aside>
            <h1
              className="header-page-title"
              style={{ color: "rgb(118, 74, 188)" }}
            >
              {headerName()}
            </h1>
          </div>

          <h1 style={{ color: "rgb(118, 74, 188)" }}>
            <a href="/about#privacy">Privacy Policy</a>
          </h1>
        </div>
      </section>
    </div>
  );
};

export default MainHeader;
