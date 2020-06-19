import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/core";
import Header from "../components/header";
// import axios from "axios";
// import { getToken, setToken } from "../utils/accesstoken";

export default function Index() {
  // useEffect(() => {
  //   fetchRefreshToken();
  //   // eslint-disable-next-line
  // }, []);

  // async function fetchRefreshToken() {
  //   const instance = axios.create({
  //     withCredentials: true,
  //   });

  //   try {
  //     const res = await instance.post(
  //       "http://localhost:8080/api/refreshtokens"
  //     );
  //      setToken(res.data.accessToken);
  //      fetchdata();
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // async function fetchdata() {
  //   const instance = axios.create({
  //     withCredentials: true,
  //   });
  //   let accessToken = getToken();
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `${accessToken ? `bearer ${accessToken}` : ""}`,
  //     },
  //   };

  //   try {
  //     const res = await instance.get(
  //       "http://localhost:8080/api/customers",
  //       config
  //     );
  //      setCustomers(res.data.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  return (
    <div className="home-page">
      <Header />
      <section className="intro">
        <div className="intro-wrap">
          <h2>Spend Less Time Managing Your Employees and Customers</h2>
          <p>
            Employeez Helps <span>You</span> Spend More Time Running your
            Business. Built for <span>SMEs</span> and <span>MSMEs</span>
          </p>
          <Link to="/signup">
          <Button variantColor="purple">
            Get Started
          </Button>
          </Link>
        </div>
        <div className="intro-image">
          <img src="/images/undraw_img.png" alt="intro-img" />
        </div>
      </section>
    </div>
  );
}
