import React, { useState, useEffect } from "react";
import MainHeader from "../components/mainHeader";
import { Input, Button, Spinner } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCustomers, searchCustomers } from "../redux/actions/index";
import axios from "axios";
import { setToken } from "../utils/accesstoken";
import { useAuth } from "../Context/authcontext";
import { url } from "../utils";

interface DefaultRootState {
  Customers: any;
}

export const Customers = () => {
  useEffect(() => {
    fetchRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const data = useSelector<DefaultRootState, any>((state) => state.Customers);

  const customerLength = data.result.length;

  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { setisAuth }: any = useAuth()!;

  async function fetchRefreshToken() {
    const instance = axios.create({
      withCredentials: true,
    });

    try {
      const res = await instance.post(`${url}/api/refreshtokens`);
      setToken(res.data.accessToken);
      console.clear();
      dispatch(getCustomers());
      setLoading(data.loading);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setisAuth(false);
      }
      console.log(error.message);
    }
  }

  return (
    <div className="employees-page customers-page">
      <section>
        <MainHeader />
      </section>
      <section className="dashboard-body">
        <header>
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              if (search.length > 1) {
                dispatch(searchCustomers(search));
              }
            }}
          >
            <Input
              type="text"
              placeholder="filter customers"
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);
                if (search.length > 1) {
                  dispatch(searchCustomers(search));
                }
              }}
            />
          </form>
          <div>
            <Link to="/customer-mail">
              <Button
                variantColor="purple"
                isDisabled={customerLength === 0 ? true : false}
              >
                Send Emails
              </Button>
            </Link>
            <Link to="/add-customer">
              <Button variantColor="purple">Register</Button>
            </Link>
          </div>
        </header>

        <div
          className="page-loader"
          style={{
            display: customerLength === 0 ? "flex" : "none",
            color: "purple",
          }}
        >
          No Customer, Add One by clicking the Register Button at the top
        </div>
        <div
          className="page-loader"
          style={{ display: isLoading ? "flex" : "none" }}
        >
          <Spinner></Spinner>
        </div>

        <div className="dashboard-auto">
          <div className="dashboard-wrap">
            {data.result.map((customer: any) => (
              <Link
                key={customer.name_url}
                to={`customer/${customer.name_url}`}
              >
                <div className="dashboard-item">
                  <h2>{customer.name}</h2>
                  <div>
                    <p>{customer.phone}</p>
                    <p style={{ fontWeight: "bold" }}>{customer.occupation}</p>
                  </div>
                  <h5>{customer.gender}</h5>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customers;
