import React from "react";
import MainHeader from "../components/mainHeader";
import { Input, Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";

export const Employees = () => {
  return (
    <div className="employees-page">
      <section>
        <MainHeader />
      </section>
      <section className="dashboard-body">
        <header>
          <form>
            <Input type="search" placeholder="filter employees" />
          </form>
          <div>
            <Link to="/add-employee">
              <Button variantColor="purple">Onboard</Button>
            </Link>
          </div>
        </header>
        <div className="dashboard-auto">
          <div className="dashboard-wrap">
            <Link to="/employee/segun-os">
              <div className="dashboard-item">
                {/* employees.img === ""? src =/images/icons8-person-64.png : employees.img */}
                <img src="/images/icons8-person-64.png" alt="person" />
                <div>
                  <h2>Segun Olanitori</h2>
                  <p>Software Engineer</p>
                </div>
                <h5>Full Time</h5>
              </div>
            </Link>

            <Link to="/employee/john-doe">
              <div className="dashboard-item">
                <img src="/images/icons8-person-64.png" alt="person" />
                <div>
                  <h2>John Doe</h2>
                  <p>Backend Engineer</p>
                </div>
                <h5>Full Time</h5>
              </div>
            </Link>

            <Link to="/employee/segun os">
              <div className="dashboard-item">
                <img src="/images/icons8-person-64.png" alt="person" />
                <div>
                  <h2>Segun Olanitori</h2>
                  <p>Software Engineer</p>
                </div>
                <h5>Full Time</h5>
              </div>
            </Link>

            <Link to="/employee/moses-simon">
              <div className="dashboard-item">
                <img src="/images/icons8-person-64.png" alt="person" />
                <div>
                  <h2>Moses Simon</h2>
                  <p>Marketing</p>
                </div>
                <h5>Full Time</h5>
              </div>
            </Link>

            <Link to="/employee/segun-os">
              <div className="dashboard-item">
                <img src="/images/icons8-person-64.png" alt="person" />
                <div>
                  <h2>Segun Olanitori</h2>
                  <p>Software Engineer</p>
                </div>
                <h5>Full Time</h5>
              </div>
            </Link>

            <Link to="/employee/segun-os">
              <div className="dashboard-item">
                <img src="/images/icons8-person-64.png" alt="person" />
                <div>
                  <h2>Segun Olanitori</h2>
                  <p>Software Engineer</p>
                </div>
                <h5>Full Time</h5>
              </div>
            </Link>

            <Link to="/employee/segun-os">
              <div className="dashboard-item">
                <img src="/images/icons8-person-64.png" alt="person" />
                <div>
                  <h2>Bob Simon</h2>
                  <p>Data Analyst</p>
                </div>
                <h5>Part-Time</h5>
              </div>
            </Link>

            <Link to="/employee/segun-os">
              <div className="dashboard-item">
                <img src="/images/icons8-person-64.png" alt="person" />
                <div>
                  <h2>Samuel Olanitori</h2>
                  <p>Software Engineer</p>
                </div>
                <h5>Contractor</h5>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employees;
