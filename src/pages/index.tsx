import React from "react";
import image from "../images/undraw_img.png";
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
    </div>
  );
}
