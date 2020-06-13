import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "@chakra-ui/core";
// import axios from "axios";

// interface Props {
//   pathname: String;
// }

export default function Header() {
  // let location: Props = useLocation();
  // let history = useHistory();

  // const handleLogout = async () => {
  //   const instance = axios.create({
  //     withCredentials: true,
  //   });

  //   try {
  //     const res = await instance.post("http://localhost:8080/api/logout");
  //     if (res.data.message === "Logged out") {
  //       return history.push("/login");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

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
          </aside>
        </header>
      </div>
    </div>
  );
}
