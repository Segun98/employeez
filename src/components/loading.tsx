import React from "react";
import MainHeader from "./mainHeader";

export default function Loading() {
  return (
    <div>
      <section>
        <MainHeader />
      </section>
      <section className="dashboard-body">
        <div className="dashboard-auto">
          <div className="dashboard-wrap">
            <div className="spinner-cont">
              <div className="spinner"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
