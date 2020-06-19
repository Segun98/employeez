import React from "react";
import MainHeader from "../components/mainHeader";
import { Input, Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";

export const Customers = () => {
  return (
    <div className="employees-page customers-page">
      <section>
        <MainHeader />
      </section>
      <section className="dashboard-body">
        <header>
          <form>
            <Input type="search" placeholder="filter customers" />
          </form>
          <div>
            <Link to="/add-customer">
              <Button variantColor="purple">Register</Button>
            </Link>
          </div>
        </header>
        <div className="dashboard-auto">
          <div className="dashboard-wrap">
            <Link to="/customer/segun-os">
              <div className="dashboard-item">
                <h2>Segun Olanitori</h2>
                <div>
                  <p>08102679869</p>
                  <p>Designer</p>
                </div>
                <h5>M</h5>
              </div>
            </Link>

            <Link to="/customer/segun-os">
              <div className="dashboard-item">
                <h2>Bob Harrison</h2>
                <div>
                  <p>08102679869</p>
                  <p>Accountant</p>
                </div>
                <h5>F</h5>
              </div>
            </Link>

            <Link to="/customer/segun-os">
              <div className="dashboard-item">
                <h2>Net Ninja</h2>
                <div>
                  <p>08102679869</p>
                  <p>Digital Marketer</p>
                </div>
                <h5>F</h5>
              </div>
            </Link>

            <Link to="/customer/segun-os">
              <div className="dashboard-item">
                <h2>Traversy Media</h2>
                <div>
                  <p>08102679869</p>
                  <p>Banker</p>
                </div>
                <h5>M</h5>
              </div>
            </Link>

            <Link to="/customer/segun-os">
              <div className="dashboard-item">
                <h2>Dev Edinson</h2>
                <div>
                  <p>08102679869</p>
                  <p>Software Engineer</p>
                </div>
                <h5>M</h5>
              </div>
            </Link>

            <Link to="/customer/segun-os">
              <div className="dashboard-item">
                <h2>John Doe</h2>
                <div>
                  <p>08102679869</p>
                  <p>Tailor</p>
                </div>
                <h5>F</h5>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customers;
