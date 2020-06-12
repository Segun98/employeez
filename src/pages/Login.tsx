import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { setToken, getToken} from './../utils/accesstoken';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();
  
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
      const res = await instance.post(
        "http://localhost:8080/api/login",
        payload,
        config
      );
      
      if (res.data.message === "successfully logged in") {
        setEmail("");
        setPassword("");
        setToken(res.data.accesstoken)
        setSuccess("Login successful!");
        if (getToken()) {
          history.push("/");
        }        
        return true
      }
      setError(res.data);
    } catch (error) {
      console.log(error.message);
      if (error) {
        setError("an Error occurred, check your internet connection");
      }
    }
  }
  return (
    <div>
      <br />
      <h2 style={{ textAlign: "center" }}> Login </h2>
      <br />
      <section className="form-wrap">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <h3 style={{ color: "red" }}>{error}</h3>
            <h3 style={{ color: "green" }}>{success}</h3>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
          <br/>
          <Button type="submit">Submit</Button>
        </form>
      </section>
    </div>
  );
};

export default Login;
