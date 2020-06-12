import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/core";
import axios from "axios";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
      const res = await axios.post(
        "http://localhost:8080/api/register",
        payload,
        config
      );
      if (res.data === "sign up successful") {
        setEmail("");
        setName("");
        setPassword("");
        return setSuccess("Sign Up successful! You can now log in");
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
      <h2 style={{ textAlign: "center" }}>Sign up </h2>
      <br />
      <section className="form-wrap">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <h3 style={{ color: "red" }}>{error}</h3>
            <h3 style={{ color: "green" }}>{success}</h3>
            <FormLabel htmlFor="name">Company Name</FormLabel>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
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

export default Signup;
