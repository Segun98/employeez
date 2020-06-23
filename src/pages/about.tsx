import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Add, Delete, Completed } from "../redux/actions/index";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/core";
import Header from "../components/header";
import { Link } from "react-router-dom";

// interface props {
//   id: number;
//   name: string;
//   price: string;
//   completed: boolean;
// }

// interface DefaultRootState {
//   Transaction: Array<props>;
// }

export default function About() {
  // const Transaction: Array<props> = useSelector<DefaultRootState, any>(
  //   (state) => state.Transaction
  // );

  // // const dispatch = useDispatch();
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState<props["price"]>("");

  // function addTransaction(e: any) {
  //   e.preventDefault();
  //   const newT = {
  //     id: Math.random(),
  //     name,
  //     price: parseInt(price),
  //     completed: false,
  //   };
  //   dispatch(Add(newT));
  //   setName("");
  //   setPrice("");
  // }

  // function deleteTransaction(id: props["id"]) {
  //   dispatch(Delete(id));
  // }

  return (
    <div>
      <Header />
      <br />
      <section>
        <div className="about-page">
          <h3 style={{ margin: "15px 0", textAlign: "center" }}>About</h3>
          <div className="about-page-body">
            <p>
              Employeez is an Employee and Customer Management app. We Help You
              Spend Less Time Managing Your Employees and Customers, so You
              Spend More Time Running your Business. Built for SMEs and MSMEs.{" "}
              <Link
                to="/signup"
                style={{ color: "purple", textDecoration: "underline" }}
              >
                Sign Up Today
              </Link>
            </p>
            <br />
            <section className="privacy" id="privacy">
              <h3 style={{ textAlign: "center" }}>Privacy Policy</h3>
              <p>
                Employeez collects basic information from users. They Include:
              </p>
              <ul>
                <li>contact messages sent to us.</li>

                <li>employee details and customer details.</li>
              </ul>
              <br />
              <p>We do not store your emails in our datatabase</p>
              <p>
                We do not share or sell user personal information with third
                parties.
              </p>
              <br />
              <p>
                You can request for the deletion of all your account, by{" "}
                <a href="/about#contact">contacting us</a>
              </p>
              <br />
              <p>
                We reserve the right to update this policy at any time, the time
                of revision will be clearly stated on this page
              </p>
            </section>
            <br />
            <section className="terms" id="terms">
              <h3 style={{ textAlign: "center" }}>Terms of Use</h3>
              <p>
                By accessing this website, you are agreeing to be bound by our
                privacy policy
              </p>
              <p>Violaton of this can lead to us taking down your account</p>
            </section>
            <br />
            <div id="contact" style={{ marginBottom: "50px" }}>
              <h3 style={{ textAlign: "center" }}>Contact US</h3>
              <form>
                <FormControl isRequired>
                  {/* <h3 style={{ color: "red" }}>{error}</h3>
              <h3 style={{ color: "green" }}>{success}</h3> */}
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter a valid Email"
                  />
                  <FormLabel htmlFor="subject">Subject</FormLabel>
                  <Input type="text" name="subject" />
                  <FormLabel htmlFor="body">Body</FormLabel>
                  <Textarea
                    style={{ height: "250px" }}
                    size="sm"
                    placeholder="Please Enter your Message"
                  ></Textarea>
                </FormControl>
                {/* <Spinner style={{ display: loading ? "block" : "none" }}></Spinner> */}
                <br />
                <Button variantColor="purple" type="submit">
                  Contact
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
