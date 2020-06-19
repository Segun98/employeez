import React from "react";
import MainHeader from "../components/mainHeader";
import { Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";

export const Customer = ({ match }: any) => {
  let name_url = match.params.id;

  return (
    <div className="single-customer-page">
      <div className="employee-page">
        <section>
          <MainHeader name={`${name_url} Profile`} />
        </section>
        <section className="dashboard-body">
          <div className="dashboard-auto">
            <div className="edit-section">
              <Link to="/edit-customer/segun-os">
                <Button variantColor="purple">Edit</Button>
              </Link>
            </div>

            <div className="employee-wrap">
              <section className="employee-job-info">
                <h2>Personal Information</h2>
                <div
                  className="employee-job-info-grid"
                  style={{
                    backgroundColor: "rgba(32, 33, 36, 0.28)",
                    padding: "5px 7px",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  <h3>Name</h3>
                  <h3>Gender</h3>
                  <h3>Occupation</h3>
                  <h3>Date of Birth</h3>
                </div>
                <hr />
                <div className="employee-job-info-grid">
                  <h4>Mr. John Doe</h4>
                  <h4>M</h4>
                  <h4>Farmer</h4>
                  <h4>10/11/2016</h4>
                </div>
              </section>

              <section className="employee-contact-info">
                <h2>Contact Information</h2>
                <div
                  className="employee-contact-info-grid"
                  style={{
                    backgroundColor: "rgba(32, 33, 36, 0.28)",
                    padding: "5px 7px",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  <h3>Email</h3>
                  <h3>Phone</h3>
                  <h3>Address</h3>
                </div>
                <hr />
                <div className="employee-contact-info-grid">
                  <h4>shegunolanitori@gmail.com</h4>
                  <h4>+234-810-2679-869</h4>
                  <h4>5, Masaba Close, CITS, Unilag</h4>
                </div>
              </section>

              <section className="employee-notes-info">
                <h2>Notes</h2>
                <div className="employee-note">
                  <h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid a nam voluptatem sunt at consequatur quo et, sint
                    necessitatibus, iste reprehenderit quas fuga reiciendis illo
                    exero aliquam aliquid. Aut, illo iusto ducimus ipsum saepe
                    voluptatibus veritatis fugit odit cumque labore perferendis.
                  </h3>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Customer;
