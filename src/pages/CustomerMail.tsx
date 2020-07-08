import React, { useState, useEffect } from "react";
import MainHeader from "../components/mainHeader";
import {
  Button,
  Textarea,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { setToken } from "../utils/accesstoken";
import { url } from "../utils";
import { useAuth } from "../Context/authcontext";
import { useSelector, useDispatch } from "react-redux";
import { getCustomers } from "../redux/actions/index";
import axios from "axios";

interface props {
  email: string;
  name_url: number;
}

interface DefaultRootState {
  Customers: any;
}

export const CustomerMail = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emails, setEmails] = useState<Array<props>>([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setsuccess] = useState(false);
  const dispatch = useDispatch();
  const customers = useSelector<DefaultRootState, any>(
    (state) => state.Customers
  );

  useEffect(() => {
    fetchRefreshToken();
    // eslint-disable-next-line
  }, []);

  const { setisAuth }: any = useAuth()!;

  async function fetchRefreshToken() {
    const instance = axios.create({
      withCredentials: true,
    });

    try {
      const res = await instance.post(`${url}/api/refreshtokens`);
      setToken(res.data.accessToken);
      console.clear();
      dispatch(getCustomers());
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setisAuth(false);
      }
      console.log(error.message);
    }
  }

  //submit email to server
  const handleEmail = async (e: any) => {
    e.preventDefault();
    const mailMap = emails.map((mail) => mail.email);
    if (mailMap.length === 0) {
      return alert("Please select recipients");
    }
    const payload = {
      email: customers.result[0].ORG_ID,
      to: mailMap,
      subject,
      body,
    };

    try {
      setError(false);
      setloading(true);
      const res = await axios.post(`${url}/api/sendmails`, payload);
      if (res.data) {
        setloading(false);
        setsuccess(true);
        setEmails([]);
        setSubject("");
        setBody("");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setloading(false);
    }
  };

  //select the recipients
  const selectMail = (mail: any) => {
    const existing = emails.filter((c) => c.name_url === mail.name_url);
    if (existing.length > 0) {
      return null;
    } else {
      setEmails([...emails, mail]);
    }
  };

  //remove recipients
  const removeMail = (id: number) => {
    const remove = emails.filter((mail) => mail.name_url !== id);
    setEmails(remove);
  };

  return (
    <div className="send-mail-page">
      <section>
        <MainHeader />
      </section>
      <section className="dashboard-body">
        <div className="dashboard-auto">
          <h3 className="send-mail-header"> Send Emails to Customers</h3>
          <div className="send-mail-wrap">
            <section className="emails">
              <h3>Customers' Emails</h3>
              <div>
                {customers.result.map((employee: props) => (
                  <div key={employee.name_url} style={{ display: "flex" }}>
                    <div className="email-item">{employee.email}</div> &nbsp;
                    <div
                      style={{ color: "green", cursor: "pointer" }}
                      onClick={() => {
                        let newMail = {
                          email: employee.email,
                          name_url: employee.name_url,
                        };
                        selectMail(newMail);
                      }}
                    >
                      +
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <div className="selected-mails">
                <h3>To: &nbsp;</h3>
                {emails.map((email) => (
                  <div key={email.name_url} style={{ display: "flex" }}>
                    <div className="email-item">{email.email}</div> &nbsp;
                    <div
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        removeMail(email.name_url);
                      }}
                    >
                      x
                    </div>
                    &nbsp; &nbsp;
                  </div>
                ))}
              </div>
              <form onSubmit={handleEmail}>
                <FormControl isRequired>
                  <FormLabel htmlFor="subject">Subject</FormLabel>
                  <Input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e: any) => {
                      setSubject(e.target.value);
                    }}
                  />
                  <FormLabel htmlFor="Body">Body</FormLabel>
                  <Textarea
                    size="lg"
                    placeholder="Send bulk emails to Customers"
                    value={body}
                    onChange={(e: any) => {
                      setBody(e.target.value);
                    }}
                  ></Textarea>
                </FormControl>
                <div style={{ textAlign: "center" }}>
                  <h3
                    style={{ color: "red", display: error ? "block" : "none" }}
                  >
                    an error occurred, check your internet connection
                  </h3>
                  <h3
                    style={{
                      color: "green",
                      display: success ? "block" : "none",
                    }}
                  >
                    email sent!
                  </h3>
                </div>
                <br />
                <Button type="submit" variantColor="purple" isLoading={loading}>
                  Send
                </Button>
              </form>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerMail;
