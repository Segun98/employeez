import React from "react";
import MainHeader from "./mainHeader";
import { Spinner } from "@chakra-ui/core";

export default function Loading() {
  return (
    <div>
      <section>
        <MainHeader />
      </section>
      <section className="dashboard-body">
        <div className="page-loader">
          <Spinner speed="0.7s"></Spinner>
        </div>
      </section>
    </div>
  );
}
