import React, { useState } from "react";
import MainHeader from "../components/mainHeader";
import {
  Button,
  Textarea,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";

export const Employee = ({ match }: any) => {
  let name_url = match.params.id;

  const [email, setEmail] = useState("");
  const [showEMail, setShowEmail] = useState(false);
  const handleEmail = (e: any) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="employee-page">
      <section>
        <MainHeader name={`${name_url} Profile (E)`} />
      </section>
      <section className="dashboard-body">
        <div className="dashboard-auto" style={{ position: "relative" }}>
          <div className="edit-section">
            <Button
              variantColor="purple"
              onClick={() => {
                setShowEmail(true);
              }}
            >
              Send Email
            </Button>
            <Link to="/edit-employee/segun-os">
              <Button variantColor="purple">Edit</Button>
            </Link>
          </div>
          <div className="employee-wrap">
            <div className="employee-page-header">
              <img src="/images/icons8-person-64.png" alt="person" />
              <div>
                <h4>Segun Olanitori (M)</h4>
                <h4>Software Engineer</h4>
                <h4>Full Time</h4>
              </div>
            </div>
            <section className="employee-job-info">
              <h2>Job Information</h2>
              <div
                className="employee-job-info-grid"
                style={{
                  backgroundColor: "rgba(32, 33, 36, 0.28)",
                  padding: "5px 7px",
                  borderRadius: "5px",
                  color: "white",
                }}
              >
                <h3>Department</h3>
                <h3>Salary</h3>
                <h3>Hire Date</h3>
                <h3>Benefits</h3>
                <h3>Work Location</h3>
              </div>
              <hr />
              <div className="employee-job-info-grid">
                <h4>I.T</h4>
                <h4>250,000</h4>
                <h4>10/11/2016</h4>
                <h4>Housing, HeathCare, Free Lunch</h4>
                <h4>Lagos</h4>
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

            <section className="employee-personal-info">
              <h2>Personal Information</h2>
              <div
                className="employee-personal-info-grid"
                style={{
                  backgroundColor: "rgba(32, 33, 36, 0.28)",
                  padding: "5px 7px",
                  borderRadius: "5px",
                  color: "white",
                }}
              >
                <h3>Date Of Birth</h3>
              </div>
              <hr />
              <div className="employee-personal-info-grid">
                <h4>10-11-1998</h4>
              </div>
            </section>

            <section className="employee-notes-info">
              <h2>Notes</h2>
              <div className="employee-note">
                <h3>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid a nam voluptatem sunt at consequatur quo et, sint
                  necessitatibus, iste reprehenderit quas fuga reiciendis illo
                  exercitationem nemo repellendus dignissimos ex? Maiores,
                  delectus eaque eum iusto aliquam aliquid. Aut, illo iusto
                  ducimus ipsum saepe voluptatibus veritatis fugit odit cumque
                  labore perferendis.
                </h3>
              </div>
            </section>
          </div>

          <section
            className="single-email"
            id="single-email"
            style={{
              transition: "transform 1s ease-in",
              transform: showEMail ? "scale(1)" : "scale(0)",
            }}
          >
            <form onSubmit={handleEmail}>
              <FormControl isRequired>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <Input type="text" placeholder="Subject" />
                <FormLabel htmlFor="Body">Body</FormLabel>
                <Textarea
                  size="lg"
                  placeholder={`Send ${name_url} an Email`}
                  value={email}
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                ></Textarea>
              </FormControl>
              <div
                className="close-mail"
                onClick={() => {
                  setShowEmail(false);
                }}
              >
                X Hide
              </div>
              {/* <h3 style={{ color: "red" }}>failure</h3>
                <h3 style={{ color: "green" }}>success</h3> */}
              <Button type="submit" variantColor="purple">
                Send
              </Button>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Employee;
