import React, { useState, useEffect } from "react";
import image from "../images/undraw_img2.png";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/core";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { setToken } from "./../utils/accesstoken";
import Header from "./../components/header";
import { useAuth } from "./../Context/authcontext";
import Cookies from "js-cookie";
import { url } from "../utils";

export const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);

  const { setisAuth, isAuth }: any = useAuth()!;

  useEffect(() => {
    if (isAuth) {
      history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 7000);
    }
  }, [error]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const instance = axios.create({
      withCredentials: true,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const payload = {
      email,
      password,
    };
    setError("");
    try {
      setloading(true);
      const res = await instance.post(`${url}/api/login`, payload, config);
      if (res.data.message === "successfully logged in") {
        //setting cookies client side, should be done over server, but i ran into vercel problems in production
        Cookies.set("yeez", res.data.refreshToken, {
          expires: 7,
          // secure: true,
        });
        setisAuth(true);
        setEmail("");
        setPassword("");
        setToken(res.data.accesstoken);
        setSuccess("Login successful!");
        setloading(false);
        window.location.href = "/dashboard";
        return true;
      }
      setloading(false);
      setError(res.data);
    } catch (error) {
      console.log(error.message);
      setloading(false);

      if (error) {
        setError("an Error occurred, check your internet connection");
      }
    }
  }
  return (
    <div>
      <section>
        <Header />
      </section>
      <section className="login-wrap">
        <div className="login-image">
          <img src={image} alt="login illustration" />
        </div>
        <div className="form-wrap">
          <h2
            style={{
              textAlign: "center",
              color: "rgb(118, 74, 188)",
              fontWeight: "bold",
            }}
          >
            {" "}
            Login to Your Space{" "}
          </h2>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <h3 style={{ color: "red" }}>{error}</h3>
              <h3 style={{ color: "green" }}>{success}</h3>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  id="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => {
                      setshow(!show);
                    }}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              isDisabled={loading}
              isLoading={loading}
              variantColor="purple"
              type="submit"
            >
              Submit
            </Button>
          </form>
          <br />
          <h4 style={{ color: "rgb(118, 74, 188)", textAlign: "center" }}>
            Dont have an account?{" "}
            <Link to="/signup">
              <span style={{ textDecoration: "underline" }}>Signup</span>
            </Link>
          </h4>
        </div>
      </section>
    </div>
  );
};

export default Login;
