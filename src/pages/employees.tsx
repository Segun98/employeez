import React, { useEffect, useState } from "react";
import MainHeader from "../components/mainHeader";
import { Input, Button, Spinner } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, searchEmployees } from "../redux/actions/index";
import { fetchToken, getToken } from "../utils/accesstoken";
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
    fetchToken(setisAuth, dispatch(getEmployees()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getEmployees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken()]);

  useEffect(() => {
    setLoading(false);
  }, [data.loading]);

  const { setisAuth }: any = useAuth()!;

  return (
    <div className="employees-page">
      <section>
        <MainHeader
          userID={data.result.length > 0 ? data.result[0].ORG_ID : ""}
        />
      </section>
      <section className="dashboard-body">
        <header>
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              if (search.length > 1) {
                dispatch(searchEmployees(search));
              }
            }}
          >
            <Input
              type="text"
              placeholder="filter employees by name, classification and job title"
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);
                if (search.length > 1) {
                  dispatch(searchEmployees(search));
                }
              }}
            />
          </form>
          <div>
            <Link to="/send-mail">
              <Button
                variantColor="purple"
                isDisabled={employeeLength === 0 ? true : false}
              >
                Send Emails
              </Button>
            </Link>
            <Link to="/add-employee">
              <Button variantColor="purple">Onboard</Button>
            </Link>
          </div>
        </header>
        {isLoading && (
          <div className="page-loader">
            <Spinner speed="1s"></Spinner>
          </div>
        )}

        <div
          className="page-loader"
          style={{
            display: employeeLength === 0 ? "flex" : "none",
            color: "purple",
            visibility: isLoading ? "hidden" : "visible",
          }}
        >
          No Employees, Add One by clicking the Onboard Button at the top
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
