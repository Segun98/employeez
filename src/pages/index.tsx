import React from "react";
import image from "../images/undraw_img.png";
import dashboardImage from "../images/sc_employee_dash.png";
import profileImage from "../images/sc_employee_profile.png";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/core";
import Header from "../components/header";

export default function Index() {
  return (
    <div className="home-page">
      <Header />
      <section className="intro">
        <div className="intro-wrap">
          <h2>Spend Less Time Managing Your Employees and Customers</h2>
          <p>
            Employeez Helps <span>You</span> Spend More Time Running your
            Business. Built for <span>SMEs</span> and <span>MSMEs</span>
          </p>
          <Link to="/signup">
            <Button variantColor="purple">Get Started</Button>
          </Link>
        </div>
        <div className="intro-image">
          <img src={image} alt="intro-img" />
        </div>
      </section>

      <section className="home-page_dashboard">
        <h2>All In One Place Dashboard</h2>
        <div className="home-page_dashboard_wrap">
          <img src={dashboardImage} alt="dashboard product information" />
          <div className="home-page_dashboard_content">
            <p>
              Employeez dashboard highlights the total number of Employees and
              Customers of your company, calculates your total salary expenses
              and puts to your notice the gender diversity in your organisation.
            </p>
          </div>
        </div>
      </section>

      <section className="home-page_profile">
        <h2>Employees and Customers Profile</h2>
        <div className="home-page_profile_wrap">
          <div className="home-page_profile_content">
            <p>
              Provides Job, Contact and Personal information about your
              Employees and Customers. Each profile allows for notes to put down
              relevant information.
            </p>
            <p>
              Send Individual Emials to an employee or customer directly from
              their profile
            </p>
          </div>
          <img src={profileImage} alt="profile product information" />
        </div>
      </section>

      <section className="home-page_other-info">
        <h3>Other Features</h3>
        <div className="other-info-wrap">
          <div>
            <h4>Send Emails</h4>
            <p>
              In addition to sending personal emails from an employee or
              customer's profile, Employeez allows you send Bulk Emails to all
              Employees and Customers{" "}
            </p>
          </div>
          <div>
            <h4>Easy Search</h4>
            <p>
              Find Employees and Customers easily with our powerful live search,
              filter by name, department, classification and more!{" "}
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/signup">
            <Button variantColor="purple">Get Started</Button>
          </Link>
        </div>
      </section>

      <section className="footer">
        <footer>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <a href="/about#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/about#contact">Contact</a>
            </li>
          </ul>
          <div
            style={{
              textAlign: "center",
              color: "rgb(118, 74, 188)",
              padding: "10px 0",
            }}
          >
            Created By{" "}
            <a
              href="https://segunos.tk"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              Segun
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}
