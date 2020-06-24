import React, { useEffect, useState } from "react";
import MainHeader from "../components/mainHeader";
import { Input, Button, Spinner } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, searchEmployees } from "../redux/actions/index";
import axios from "axios";
import { setToken } from "../utils/accesstoken";
import { useAuth } from "../Context/authcontext";

interface DefaultRootState {
  Employees: any;
}

export const Employees = () => {
  const dispatch = useDispatch();
  const data = useSelector<DefaultRootState, any>((state) => state.Employees);

  const employeeLength = data.result.length;

  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      dispatch(getEmployees());
      setLoading(data.loading);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setisAuth(false);
      }
      console.log(error.message);
    }
  }

  return (
    <div className="employees-page">
      <section>
        <MainHeader />
      </section>
      <section
        className="dashboard-body"
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        <header>
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
            }}
          >
            <Input
              type="search"
              placeholder="filter employees"
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);

                dispatch(searchEmployees(search));
              }}
            />
          </form>
          <div>
            <Link to="/send-mail">
              <Button variantColor="purple">Send Emails</Button>
            </Link>
            <Link to="/add-employee">
              <Button variantColor="purple">Onboard</Button>
            </Link>
          </div>
        </header>
        <div
          className="page-loader"
          style={{
            display: employeeLength === 0 ? "flex" : "none",
            color: "purple",
          }}
        >
          Looks like you have no Employees, Add One by clicking the Onboard
          Button at the top
        </div>
        <div
          className="page-loader"
          style={{ display: isLoading ? "flex" : "none" }}
        >
          <Spinner></Spinner>
        </div>
        <div className="dashboard-auto">
          <div className="dashboard-wrap">
            {data.result.map((employee: any) => (
              <Link
                key={employee.name_url}
                to={`employee/${employee.name_url}`}
              >
                <div className="dashboard-item">
                  <img
                    src={`${
                      employee.picture === ""
                        ? "/images/icons8-person-64.png"
                        : employee.picture
                    }`}
                    alt={`${employee.name}`}
                  />
                  <div>
                    <h2>{employee.name}</h2>
                    <p>{employee.title}</p>
                  </div>
                  <h5>{employee.classification}</h5>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employees;
