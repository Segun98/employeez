import React, { useState, useEffect } from "react";
import MainHeader from "../components/mainHeader";
import {
  Button,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  Spinner,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken, setToken } from "../utils/accesstoken";
import { Commas, url } from "../utils";
import { useAuth } from "../Context/authcontext";
import { useHistory } from "react-router-dom";

type ObjectType = {
  address: string;
  benefits: string;
  classification: string;
  department: string;
  dob: string;
  email: string;
  gender: string;
  name: string;
  name_url: string;
  note: string;
  phone: string;
  picture: string;
  title: string;
  workLocation: string;
  salary: string;
  hireDate: string;
};

export const Employee = ({ match }: any) => {
  useEffect(() => {
    fetchRefreshToken();
    // eslint-disable-next-line
  }, []);
  let name_url = match.params.id;
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [showEMail, setShowEmail] = useState(false);
  const [data, setData] = useState<ObjectType | any>({});
  const [pageLoad, setPageLoad] = useState(true);
  const handleEmail = (e: any) => {
    e.preventDefault();
    console.log(email);
  };

  const { setisAuth }: any = useAuth()!;

  async function fetchRefreshToken() {
    const instance = axios.create({
      withCredentials: true,
    });

    try {
      const res = await instance.post(
        `${url}/api/refreshtokens`
      );
      setToken(res.data.accessToken);
      console.clear();
      fetchdata();
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setisAuth(false);
      }
      console.log(error.message);
    }
  }

  async function fetchdata() {
    const instance = axios.create({
      withCredentials: true,
    });
    let accessToken = getToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `${accessToken ? `bearer ${accessToken}` : ""}`,
      },
    };

    try {
      const res = await instance.get(
        `${url}/api/employee/profile/${name_url}`,
        config
      );

      if (res.data.data) {
        setPageLoad(false);
        setData(res.data.data);
      }
      if (!res.data.data) {
        setPageLoad(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="employee-page">
      <section>
        <MainHeader name={`${pageLoad ? name_url : data.name} Profile (E)`} />
      </section>
      <section className="dashboard-body">
        <div
          className="page-loader"
          style={{ display: pageLoad ? "flex" : "none" }}
        >
          <Spinner></Spinner>
        </div>
        <div
          className="dashboard-auto"
          style={{
            position: "relative",
            visibility: pageLoad ? "hidden" : "visible",
          }}
        >
          <div className="edit-section">
            <Button
              variantColor="purple"
              onClick={() => {
                setShowEmail(true);
              }}
            >
              Send Email
            </Button>
            <Link to={`/edit-employee/${data.name_url}`}>
              <Button variantColor="purple">Edit</Button>
            </Link>
          </div>
          <div className="employee-wrap">
            <div className="employee-page-header">
              <img
                src={`${
                  data.picture === ""
                    ? "/images/icons8-person-64.png"
                    : data.picture
                }`}
                alt={`${data.name}`}
              />
              <div>
                <h4>
                  {data.name} ({data.gender})
                </h4>
                <h4>{data.title}</h4>
                <h4>{data.classification}</h4>
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
                <h4>{data.department}</h4>
                <h4>{Commas(parseInt(data.salary))}</h4>
                <h4>{data.hireDate}</h4>
                <h4>{data.benefits}</h4>
                <h4>{data.workLocation}</h4>
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
                <h4>{data.email}</h4>
                <h4>{data.phone}</h4>
                <h4>{data.address}</h4>
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
                <h4>{data.dob}</h4>
              </div>
            </section>

            <section className="employee-notes-info">
              <h2>Notes</h2>
              <div className="employee-note">
                <h3>{data.notes}</h3>
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

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variantColor="red"
            onClick={async () => {
              if (
                window.confirm(`Are you sure you want to fire ${data.name}?`)
              ) {
                const instance = axios.create({
                  withCredentials: true,
                });
                let accessToken = getToken();
                const config = {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: `${
                      accessToken ? `bearer ${accessToken}` : ""
                    }`,
                  },
                };

                try {
                  const res = await instance.delete(
                    `${url}/api/employee/remove/${name_url}`,
                    config
                  );
                  if (res.data.message === "employee removed") {
                    history.push("/employees");
                  }
                } catch (error) {
                  console.log(error.message);
                  alert("an err occured" + error.message);
                }
              }
            }}
          >
            Fire Employee
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Employee;
