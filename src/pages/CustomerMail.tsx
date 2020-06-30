import React, { useState } from "react";
import MainHeader from "../components/mainHeader";
import {
  Button,
  Textarea,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/core";

interface props {
  mail: string;
  id: number;
}

export const CustomerMail = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emails, setEmails] = useState<Array<props>>([]);
  const [employeesEmails] = useState<Array<props>>([]);

  const handleEmail = (e: any) => {
    e.preventDefault();
    const mailMap = emails.map((mail) => mail.mail);
    if (mailMap.length === 0) {
      return alert("Please select recipients");
    }
    const payload = {
      to: mailMap,
      subject,
      body,
    };

    console.log(payload);
  };
  const selectMail = (mail: any) => {
    const existing = emails.filter((c) => c.id === mail.id);
    if (existing.length > 0) {
      return null;
    } else {
      setEmails([...emails, mail]);
    }
  };

  const removeMail = (id: number) => {
    const remove = emails.filter((mail) => mail.id !== id);
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
                {employeesEmails.map((employee) => (
                  <div key={employee.id} style={{ display: "flex" }}>
                    <div className="email-item">{employee.mail}</div> &nbsp;
                    <div
                      style={{ color: "green", cursor: "pointer" }}
                      onClick={() => {
                        let newMail = {
                          mail: employee.mail,
                          id: employee.id,
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
                  <div key={email.id} style={{ display: "flex" }}>
                    <div className="email-item">{email.mail}</div> &nbsp;
                    <div
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        removeMail(email.id);
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
                    placeholder="send emails to customers (feature not implemented yet)"
                    value={body}
                    onChange={(e: any) => {
                      setBody(e.target.value);
                    }}
                  ></Textarea>
                </FormControl>
                {/* <h3 style={{ color: "red" }}>failure</h3>
                <h3 style={{ color: "green" }}>success</h3> */}
                <br />
                <Button type="submit" variantColor="purple">
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
