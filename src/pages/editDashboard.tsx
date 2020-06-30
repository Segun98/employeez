import React, { useState, useEffect } from "react";
import MainHeader from "../components/mainHeader";
import { Button, Textarea, Spinner } from "@chakra-ui/core";
import { getToken, setToken } from "../utils/accesstoken";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { url } from "../utils";

export const EditDashboard: React.FC = () => {
  const history = useHistory();
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [about, setAbout] = useState("");
  const [todo, setTodo] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    fetchRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchRefreshToken() {
    const instance = axios.create({
      withCredentials: true,
    });

    try {
      const res = await instance.post(`${url}/api/refreshtokens`);
      setToken(res.data.accessToken);
      console.clear();
      fetchdata();
    } catch (error) {
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
      const res = await instance.get(`${url}/api/dashboard`, config);

      if (res.data.data) {
        setPageLoad(false);
        setAbout(res.data.data.about);
        setMission(res.data.data.mission);
        setVision(res.data.data.vision);
        setTodo(res.data.data.todo);
      }
    } catch (error) {
      console.log(error.message);
      setErr(true);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
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
      const res = await instance.post(
        `${url}/api/dashboard/update`,
        payload,
        config
      );
      if (res.data.success) {
        return history.push("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
      setErr(true);
      setLoading(false);
    }
  }
  return (
    <div className="edit-dashboard-page">
      <section>
        <MainHeader />
      </section>
      <section className="dashboard-body">
        <div className="dashboard-auto">
          <div
            className="page-loader"
            style={{ display: pageLoad ? "flex" : "none" }}
          >
            <Spinner></Spinner>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{ visibility: pageLoad ? "hidden" : "visible" }}
          >
            <div className="dashboard-wrap">
              <div className="dashboard-item">
                <div className="dashboard-item-wrap">
                  <h3>ToDo</h3>
                  <i className="fas fa-money-check"></i>
                </div>
                <hr />
                <Textarea
                  size="sm"
                  placeholder="Tasks for today"
                  value={todo}
                  onChange={(e: any) => {
                    setTodo(e.target.value);
                  }}
                ></Textarea>
              </div>

              <div className="dashboard-item">
                <div className="dashboard-item-wrap">
                  <h3>About</h3>
                  <i className="far fa-address-card"></i>
                </div>
                <hr />
                <Textarea
                  size="sm"
                  placeholder="About your Organisation"
                  value={about}
                  onChange={(e: any) => {
                    setAbout(e.target.value);
                  }}
                ></Textarea>
              </div>

              <div className="dashboard-item">
                <div className="dashboard-item-wrap">
                  <h3>Mission</h3>
                  <i className="fas fa-thumbtack"></i>
                </div>
                <hr />
                <Textarea
                  size="sm"
                  placeholder="Your Organisation's Mission"
                  value={mission}
                  onChange={(e: any) => {
                    setMission(e.target.value);
                  }}
                ></Textarea>
              </div>

              <div className="dashboard-item">
                <div className="dashboard-item-wrap">
                  <h3>Vision</h3>
                  <i className="fas fa-street-view"></i>
                </div>
                <hr />
                <Textarea
                  size="sm"
                  placeholder="Your Organisation's Vision"
                  value={vision}
                  onChange={(e: any) => {
                    setVision(e.target.value);
                  }}
                ></Textarea>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <h3
                style={{
                  textAlign: "center",
                  display: err ? "block" : "none",
                  color: "red",
                }}
              >
                An error occurred, check your internet connection or refresh
                page
              </h3>
              <Spinner
                style={{ display: loading ? "block" : "none" }}
              ></Spinner>
            </div>
            <section style={{ textAlign: "center", marginTop: "15px" }}>
              <Button type="submit" variantColor="purple">
                Update
              </Button>
            </section>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditDashboard;
