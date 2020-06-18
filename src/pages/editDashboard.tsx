import React, { useState } from "react";
import MainHeader from "../components/mainHeader";
import { Button, Textarea } from "@chakra-ui/core";

export const EditDashboard: React.FC = () => {
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [about, setAbout] = useState("");
  const [todo, setTodo] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    const payload = {
      mission,
      vision,
      about,
      todo,
    };
    console.log(payload);
  }
  return (
    <div className="edit-dashboard-page">
      <section>
        <MainHeader />
      </section>
      <section className="dashboard-body">
        <div className="dashboard-auto">
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
                  onChange={(e: any) => {
                    setVision(e.target.value);
                  }}
                ></Textarea>
              </div>
            </div>
            <section style={{ textAlign: "center", marginTop: "15px" }}>
              <Button type="submit" variantColor="purple">
                Save
              </Button>
            </section>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditDashboard;
