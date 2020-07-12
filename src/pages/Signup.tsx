import React, { useState, useEffect } from "react";
import image from "../images/undraw_img2.png";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/core";
import axios from "axios";
import Header from "../components/header";
import { useHistory } from "react-router-dom";
import { url } from "../utils";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);

  let history = useHistory();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 7000);
    }
  }, [error]);

  async function acknowledgeMail(name: string, email: string) {
    const payload = {
      user: name,
      email,
    };
    try {
      await axios.post(`${url}/api/acknowledge`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const payload = {
      organisation_name: name,
      email,
      password,
    };
    setError("");
    try {
      setloading(true);
      const res = await axios.post(`${url}/api/register`, payload, config);
      if (res.data === "sign up successful") {
        await acknowledgeMail(name, email);
        setEmail("");
        setName("");
        setPassword("");
        setloading(false);
        setSuccess("Sign Up successful! You can now log in");
        return history.push("/login");
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
          <img src={image} alt="signup illustration" />
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
            Signup and Get Your Space{" "}
          </h2>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <h3 style={{ color: "red" }}>{error}</h3>
              <h3 style={{ color: "green" }}>{success}</h3>
              <FormLabel htmlFor="name">Company Name</FormLabel>
              <Input
                type="text"
                id="name"
                value={name}
                placeholder="Enter Name"
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                id="email"
                value={email}
                placeholder="Enter Your Email"
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
              variantColor="purple"
              type="submit"
              isLoading={loading}
            >
              Submit
            </Button>
          </form>
          <br />
          <h3>
            By signing up, you have agreed to our{" "}
            <a
              href="/about#privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgb(118, 74, 188)",
                fontWeight: "bold",
              }}
            >
              Privacy Policy
            </a>
          </h3>
        </div>
      </section>
    </div>
  );
};

export default Signup;
