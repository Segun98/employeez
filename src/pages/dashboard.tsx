import React, { useEffect, useState } from "react";
import MainHeader from "../components/mainHeader";
import { Button, Spinner } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken, setToken } from "../utils/accesstoken";
import { useAuth } from "../Context/authcontext";

export const Dashboard: React.FC = () => {
  const [mission, setMission] = useState("");
  const [todo, setTodo] = useState("");
  const [vision, setVision] = useState("");
  const [about, setAbout] = useState("");
  const [data, setData] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    fetchRefreshToken();
    // eslint-disable-next-line
  }, []);

  const { setisAuth }: any = useAuth()!;

  async function fetchRefreshToken() {
    const instance = axios.create({
      withCredentials: true,
    });

    try {
      const res = await instance.post(
        "http://localhost:8080/api/refreshtokens"
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
        "http://localhost:8080/api/dashboard",
        config
      );

      if (res.data.data) {
        setPageLoad(false);
        setData(true);
        setAbout(res.data.data.about);
        setMission(res.data.data.mission);
        setVision(res.data.data.vision);
        setTodo(res.data.data.todo);
      }
      if (!res.data.data) {
        setPageLoad(false);
        setData(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <section>
        <MainHeader />
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
          style={{ display: pageLoad ? "none" : "block" }}
        >
          <aside className="edit-dashboard-btn">
            <Link
              to="/dashboard/create"
              style={{ display: data ? "none" : "block" }}
            >
              {" "}
              <Button variantColor="purple">Create Your Dashboard</Button>
            </Link>
            <Link
              to="/dashboard/edit"
              style={{ display: data ? "block" : "none" }}
            >
              {" "}
              <Button variantColor="purple">Edit</Button>
            </Link>
          </aside>
          <div
            className="dashboard-wrap"
            style={{ visibility: data ? "visible" : "hidden" }}
          >
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
                <h3 className="dashboard_h3-firstchild">Gender Diversity</h3>
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
              <p className="todo">{todo}</p>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>About</h3>
                <img src="/images/icons8-spinner-26.png" alt="icon" />
              </div>
              <hr />
              <p>{about}</p>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>Mission</h3>
                <img src="/images/icons8-spinner-26.png" alt="icon" />
              </div>
              <hr />
              <p>{mission}</p>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>Vision</h3>
                <img src="/images/icons8-spinner-26.png" alt="icon" />
              </div>
              <hr />
              <p>{vision}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
