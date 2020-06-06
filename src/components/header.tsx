import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@chakra-ui/core";

interface Props {
  pathname: String;
}

export default function Header() {
  let location: Props = useLocation();

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
    </div>
  );
}
