import React from "react";
import MainHeader from "../components/mainHeader";
import { Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";

export const Dashboard: React.FC = () => {
  return (
    <div>
      <section>
        <MainHeader />
      </section>
      <section className="dashboard-body">
        <div className="dashboard-auto">
          <aside className="edit-dashboard-btn">
            <Link to="/dashboard/edit">
              {" "}
              <Button variantColor="purple">Edit</Button>
            </Link>
          </aside>
          <div className="dashboard-wrap">
            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3 className="dashboard_h3-firstchild">No Of Employees</h3>
                <img src="/images/icons8-spinner-26.png" alt="icon" />
              </div>
              <hr />
              <div className="customer-no">
                <p>25</p>
                <Link to="/employees">
                  <Button variantColor="purple">View Directory</Button>
                </Link>
              </div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3 className="dashboard_h3-firstchild">Gender Balace</h3>
                <img src="/images/icons8-spinner-26.png" alt="icon" />
              </div>
              <hr />
              <div className="gender-balance-content">
                <p>M: 25</p>
                <p>F: 25</p>
              </div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3 className="dashboard_h3-firstchild">No Of Customers</h3>
                <img src="/images/icons8-spinner-26.png" alt="icon" />
              </div>
              <hr />
              <div className="customer-no">
                <p>79</p>
                <Link to="/customers">
                  <Button variantColor="purple">View Directory</Button>
                </Link>
              </div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>Salary Expenses</h3>
                <img src="/images/icons8-spinner-26.png" alt="icon" />
              </div>
              <hr />
              <p style={{ fontSize: "1.9rem", fontWeight: "bolder" }}>
                320,000
              </p>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>ToDo</h3>
                <img src="/images/icons8-spinner-26.png" alt="icon" />
              </div>
              <hr />
              <p className="todo">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
                Quia cumque odio sed quidem enim aliquid <br /> et commodi
                expedita possimus ex!
              </p>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>About</h3>
                <img src="/images/icons8-spinner-26.png" alt="icon" />
              </div>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
                cumque odio sed quidem enim aliquid et commodi expedita possimus
                ex!
              </p>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>Mission</h3>
                <img src="/images/icons8-spinner-26.png" alt="icon" />
              </div>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
                cumque odio sed quidem enim aliquid et commodi expedita possimus
                ex!
              </p>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>Vision</h3>
                <img src="/images/icons8-spinner-26.png" alt="icon" />
              </div>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
                cumque odio sed quidem enim aliquid et commodi expedita possimus
                ex!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
