import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <div className="header_wrap">
        <header>
          <div className="logo">
            <Link to="/">Employeez</Link>
          </div>
          <aside>
            <div className="about">
              <Link to="/about">About</Link>
            </div>
            <div className="privacy">
              <Link to="/about#privacy">Privacy</Link>
            </div>
            <div className="login_button">
              <Link to="/login">Login</Link>
            </div>
            <div className="header_wrap-dashboard">
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </aside>
        </header>
      </div>
    </div>
  );
}
