import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/core";
import axios from "axios";

interface Props {
  pathname: String;
}

export default function Header() {
  let location: Props = useLocation();
  let history = useHistory();

  const handleLogout = async () => {
    const instance = axios.create({
      withCredentials: true,
    });

    try {
      const res = await instance.post("http://localhost:8080/api/logout");
      if (res.data.message === "Logged out") {
        return history.push("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Link to="/">
        <Button variantColor={location.pathname === "/" ? "blue" : undefined}>
          Home
        </Button>
      </Link>
      <Link to="/about">
        <Button
          variantColor={location.pathname === "/about" ? "blue" : undefined}
        >
          About
        </Button>
      </Link>
      <Link to="/dashboard">
        <Button
          variantColor={location.pathname === "/dashboard" ? "blue" : undefined}
        >
          Dashboard
        </Button>
      </Link>
      <Link to="/signup">
        <Button
          variantColor={location.pathname === "/signup" ? "green" : undefined}
        >
          SignUp
        </Button>
      </Link>
      <Link to="/login">
        <Button
          variantColor={location.pathname === "/login" ? "purple" : undefined}
        >
          Login
        </Button>
      </Link>
      <Button variantColor="red" onClick={handleLogout}>
        Logout
      </Button>
      <Link to="/employee/segun-os">
        <Button
          variantColor={
            location.pathname === "/employee/:id" ? "pink" : undefined
          }
        >
          Employee
        </Button>
      </Link>
    </div>
  );
}
