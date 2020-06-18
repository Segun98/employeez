import React from "react";
import MainHeader from "../components/mainHeader";
import { Button } from "@chakra-ui/core";
import { Link } from 'react-router-dom';

export const Employee = ({ match }: any) => {
  let name_url = match.params.id;

  return (
    <div className="employee-page">
      <section>
        <MainHeader name={name_url} />
      </section>
      <section className="dashboard-body">
        <div className="dashboard-auto">
          <div className="edit-section">
            <Link to="/edit-employee/:id">
              <Button variantColor="purple">Update</Button>
            </Link>
          </div>
          <div className="employee-wrap">
            <div className="employee-page-header">
              <img src="/images/icons8-person-64.png" alt="person" />
              <div>
                <h4>Segun Olanitori</h4>
                <h4>Software Engineer</h4>
                <h4>Full Time</h4>
              </div>
            </div>
            <section className="employee-job-info">
                
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employee;
