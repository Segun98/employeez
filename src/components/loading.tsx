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
          <Spinner></Spinner>
        </div>
      </section>
    </div>
  );
}
