import React, { useState } from "react";
import MainHeader from "../components/mainHeader";
import { Button, Textarea, Spinner } from "@chakra-ui/core";
import { getToken } from "../utils/accesstoken";
import axios from "axios";

export const CreateDashboard: React.FC = () => {
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [about, setAbout] = useState("");
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const payload = {
      mission,
      vision,
      about,
      todo,
    };

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
      setLoading(true);
      const res = await instance.post(
        "http://localhost:8080/api/dashboard/add",
        payload,
        config
      );
      if (res.data.status) {
        setLoading(false);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setErr(true);
    }
  }
  return (
    <div className="edit-dashboard-page">
      <section>
        <MainHeader />
      </section>
      <section className="dashboard-body">
        <div className="dashboard-auto">
          <h3
            style={{
              color: "red",
              display: err ? "block" : "none",
              textAlign: "center",
            }}
          >
            An error occured, check your internet connection and refresh
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="dashboard-wrap">
              <div className="dashboard-item">
                <div className="dashboard-item-wrap">
                  <h3>ToDo</h3>
                  <img src="/images/icons8-spinner-26.png" alt="icon" />
                </div>
                <hr />
                <Textarea
                  size="sm"
                  placeholder="Tasks for today"
                  value={todo}
                  isRequired
                  onChange={(e: any) => {
                    setTodo(e.target.value);
                  }}
                ></Textarea>
              </div>

              <div className="dashboard-item">
                <div className="dashboard-item-wrap">
                  <h3>About</h3>
                  <img src="/images/icons8-spinner-26.png" alt="icon" />
                </div>
                <hr />
                <Textarea
                  size="sm"
                  placeholder="About your Organisation"
                  value={about}
                  isRequired
                  onChange={(e: any) => {
                    setAbout(e.target.value);
                  }}
                ></Textarea>
              </div>

              <div className="dashboard-item">
                <div className="dashboard-item-wrap">
                  <h3>Mission</h3>
                  <img src="/images/icons8-spinner-26.png" alt="icon" />
                </div>
                <hr />
                <Textarea
                  size="sm"
                  placeholder="Your Organisation's Mission"
                  value={mission}
                  isRequired
                  onChange={(e: any) => {
                    setMission(e.target.value);
                  }}
                ></Textarea>
              </div>

              <div className="dashboard-item">
                <div className="dashboard-item-wrap">
                  <h3>Vision</h3>
                  <img src="/images/icons8-spinner-26.png" alt="icon" />
                </div>
                <hr />
                <Textarea
                  size="sm"
                  placeholder="Your Organisation's Vision"
                  value={vision}
                  isRequired
                  onChange={(e: any) => {
                    setVision(e.target.value);
                  }}
                ></Textarea>
              </div>
            </div>
            <section style={{ textAlign: "center", marginTop: "15px" }}>
              <Spinner
                style={{ display: loading ? "block" : "none" }}
              ></Spinner>
              <Button type="submit" variantColor="purple">
                Create
              </Button>
            </section>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateDashboard;
