import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/core";

export default function Header() {
  return (
    <div>
      <Link to="/"><Button variantColor="blue" >Home</Button></Link>
      <Link to="/about"><Button>About</Button></Link>
    </div>
  );
}
