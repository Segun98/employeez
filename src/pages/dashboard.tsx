import React, { useEffect, useState } from "react";
import MainHeader from "../components/mainHeader";
import { Button, Spinner } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken, setToken } from "../utils/accesstoken";
import { Commas, url } from "../utils";
import { useAuth } from "../Context/authcontext";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, getCustomers } from "../redux/actions/index";
import { Doughnut } from "react-chartjs-2";

interface DefaultRootState {
  Employees: any;
  Customers: any;
}

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const employees = useSelector<DefaultRootState, any>(
    (state) => state.Employees
  );
  const customers = useSelector<DefaultRootState, any>(
    (state) => state.Customers
  );
  const customerLength = customers.result.length;

  const getSalary = employees.result.map((employee: any) => employee.salary);
  let TotalSalary = getSalary.reduce(
    (a: any, b: any) => parseInt(a) + parseInt(b),
    0
  );

  const employeeLength = employees.result.length;

  const totalMale = employees.result.filter(
    (employee: any) => employee.gender === "M"
  ).length;

  const totalFemale = employees.result.filter(
    (employee: any) => employee.gender === "F"
  ).length;

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
        `${url}/api/dashboard`,
        config
      );

      if (res.data.data) {
        setPageLoad(false);
        setData(true);
        setAbout(res.data.data.about);
        setMission(res.data.data.mission);
        setVision(res.data.data.vision);
        setTodo(res.data.data.todo);
        dispatch(getEmployees());
        dispatch(getCustomers());
      }
      if (!res.data.data) {
        setPageLoad(false);
        setData(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //Pie chart Library

  const MalePercentage = () => {
    const percentage = (totalMale / employeeLength) * 100;
    return Math.round(percentage);
  };
  const FemalePercentage = () => {
    const percentage = (totalFemale / employeeLength) * 100;
    return Math.round(percentage);
  };

  const stat = {
    labels: [`F - ${totalFemale}`, `M - ${totalMale}`],
    datasets: [
      {
        data: [FemalePercentage(), MalePercentage()],
        backgroundColor: ["#FF6384", "#32cd32"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

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
                <i className="fas fa-chart-line"></i>
              </div>
              <hr />
              <div className="customer-no">
                <p>{employeeLength}</p>
                <Link to="/employees">
                  <Button variantColor="purple">View Directory</Button>
                </Link>
              </div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3 className="dashboard_h3-firstchild">Gender Diversity</h3>
                <i className="fas fa-venus-mars"></i>
              </div>
              <hr />
              <div className="gender-balance-content">
                <Doughnut
                  data={stat}
                  width={8}
                  height={5}
                  options={{
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                  }}
                />
              </div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3 className="dashboard_h3-firstchild">No Of Customers</h3>
                <i className="fas fa-chart-line"></i>
              </div>
              <hr />
              <div className="customer-no">
                <p>{customerLength}</p>
                <Link to="/customers">
                  <Button variantColor="purple">View Directory</Button>
                </Link>
              </div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>Total Salary</h3>
                <i className="far fa-money-bill-alt"></i>
              </div>
              <hr />
              <p style={{ fontSize: "1.9rem", fontWeight: "bolder" }}>
                {Commas(TotalSalary)}
              </p>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>ToDo</h3>
                <i className="fas fa-money-check"></i>
              </div>
              <hr />
              <p className="todo">{todo}</p>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>About</h3>
                <i className="far fa-address-card"></i>
              </div>
              <hr />
              <p>{about}</p>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>Mission</h3>
                <i className="fas fa-thumbtack"></i>
              </div>
              <hr />
              <p>{mission}</p>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-item-wrap">
                <h3>Vision</h3>
                <i className="fas fa-street-view"></i>
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
