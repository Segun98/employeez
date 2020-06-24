import React, { useState, useEffect } from "react";
import MainHeader from "../components/mainHeader";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Radio,
  RadioGroup,
  InputGroup,
  InputLeftElement,
  Icon,
  Spinner,
} from "@chakra-ui/core";
import { getToken, setToken } from "../utils/accesstoken";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { url } from "../utils";

export const EditEmployee: React.FC = ({ match }: any) => {
  useEffect(() => {
    fetchRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();
  let name_url = match.params.id;

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [picture, setPicture] = useState("");
  const [classif, setClassif] = useState("");
  const [salary, setSalary] = useState("");
  const [benefits, setBenefits] = useState("");
  const [notes, setNotes] = useState("");

  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);

  async function fetchRefreshToken() {
    const instance = axios.create({
      withCredentials: true,
    });

    try {
      const res = await instance.post(
        `${url}/api/refreshtokens`
      );
      setToken(res.data.accessToken);
      console.clear();
      fetchdata();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchdata() {
    const instance = axios.create({
      withCredentials: true,
    });
    let accessToken = getToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `${accessToken ? `bearer ${accessToken}` : ""}`,
      },
    };

    try {
      const res = await instance.get(
        `${url}/api/employee/profile/${name_url}`,
        config
      );

      if (res.data.data) {
        let data = res.data.data;
        setPageLoad(false);
        setName(data.name);
        setDepartment(data.department);
        setTitle(data.title);
        setHireDate(data.hireDate);
        setEmail(data.email);
        setAddress(data.address);
        setWorkLocation(data.workLocation);
        setPhone(data.phone);
        setDob(data.dob);
        setGender(data.gender);
        setPicture(data.picture);
        setClassif(data.classification);
        setSalary(data.salary);
        setBenefits(data.benefits);
        setNotes(data.notes);
      }
    } catch (error) {
      console.log(error.message);
      setErr(true);
    }
  }

  //update employee information

  async function handleSubmit(e: any) {
    e.preventDefault();
    const payload = {
      name,
      department,
      title,
      hireDate,
      email,
      address,
      workLocation,
      phone,
      dob,
      gender,
      picture,
      classification: classif,
      salary,
      benefits,
      notes,
    };
    const instance = axios.create({
      withCredentials: true,
    });
    let accessToken = getToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `${accessToken ? `bearer ${accessToken}` : ""}`,
      },
    };
    setLoading(true);
    try {
      const res = await instance.post(
        `${url}/api/employee/profile/${name_url}`,
        payload,
        config
      );
      if (res.data.success) {
        return history.push(`/employee/${name_url}`);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="addemployee-page">
      <section>
        <MainHeader name={`Edit ${pageLoad ? name_url : name}`} />
      </section>
      <section className="dashboard-body">
        <div className="dashboard-auto">
          <div
            className="page-loader"
            style={{ display: pageLoad ? "flex" : "none" }}
          >
            <Spinner></Spinner>
          </div>
          <FormControl isRequired>
            <form autoComplete="on" onSubmit={handleSubmit}>
              <div className="dashboard-wrap">
                <div>
                  <FormLabel htmlFor="name"> Employee Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name..."
                    value={name}
                    onChange={(e: any) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="department"> Department </FormLabel>
                  <Input
                    type="text"
                    name="department"
                    value={department}
                    onChange={(e: any) => {
                      setDepartment(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="Job title">Job title</FormLabel>
                  <Input
                    type="text"
                    name="Job title"
                    value={title}
                    onChange={(e: any) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="Hire Date">Hire Date</FormLabel>
                  <Input
                    type="date"
                    name="Hire Date"
                    value={hireDate}
                    onChange={(e: any) => {
                      setHireDate(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="Email">Email</FormLabel>
                  <Input
                    type="email"
                    name="Email"
                    value={email}
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="Work Location">Work Location</FormLabel>
                  <Input
                    isRequired={false}
                    type="text"
                    name="Work Location"
                    placeholder="City, e.g Lagos"
                    value={workLocation}
                    onChange={(e: any) => {
                      setWorkLocation(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="Classification">Classification</FormLabel>
                  <RadioGroup
                    spacing={5}
                    isInline
                    value={classif}
                    onChange={(e: any) => setClassif(e.target.value)}
                  >
                    <Radio name="Full-Time" value="Full-Time">
                      Full-Time
                    </Radio>
                    <Radio name="Part-time" value="Part-time">
                      Part-Time
                    </Radio>
                    <Radio name="Contract" value="Contract">
                      Contract
                    </Radio>
                  </RadioGroup>
                </div>

                <div>
                  <FormLabel htmlFor="Salary"> Salary </FormLabel>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="Salary"
                    value={salary}
                    onChange={(e: any) => {
                      setSalary(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="Benefits"> Benefits</FormLabel>
                  <Input
                    type="text"
                    isRequired={false}
                    placeholder="Housing, Health Insurance..."
                    name="Benefits"
                    value={benefits}
                    onChange={(e: any) => {
                      setBenefits(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="Phone">Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      children={<Icon name="phone" color="gray.300" />}
                    />
                    <Input
                      isRequired={false}
                      type="tel"
                      name="Phone"
                      value={phone}
                      onChange={(e: any) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </InputGroup>
                </div>

                <div>
                  <FormLabel htmlFor="Address">Home Address</FormLabel>
                  <Input
                    isRequired={false}
                    type="text"
                    name="Address"
                    value={address}
                    onChange={(e: any) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="DOB">D.O.B</FormLabel>
                  <Input
                    isRequired={false}
                    type="date"
                    name="DOB"
                    value={dob}
                    onChange={(e: any) => {
                      setDob(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="Gender">Gender</FormLabel>
                  <RadioGroup
                    spacing={5}
                    isInline
                    value={gender}
                    onChange={(e: any) => setGender(e.target.value)}
                  >
                    <Radio name="Gender" value="M">
                      Male
                    </Radio>
                    <Radio name="Gender" value="F">
                      Female
                    </Radio>
                  </RadioGroup>
                </div>

                <div>
                  <FormLabel htmlFor="Picture">Picture</FormLabel>
                  <Input
                    isRequired={false}
                    type="file"
                    name="Picture"
                    value={picture}
                    onChange={(e: any) => {
                      setPicture(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="Notes">Notes</FormLabel>
                  <Textarea
                    isRequired={false}
                    size="sm"
                    placeholder="useful notes about this employee"
                    name="Notes"
                    value={notes}
                    onChange={(e: any) => {
                      setNotes(e.target.value);
                    }}
                  ></Textarea>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "15px" }}>
                <h3
                  style={{
                    textAlign: "center",
                    display: err ? "block" : "none",
                    color: "red",
                  }}
                >
                  An error occurred, check your internet connection or refresh
                  page
                </h3>
                <Spinner
                  style={{ display: loading ? "block" : "none" }}
                ></Spinner>
              </div>
              <div className="add-employee-submit">
                <Button variantColor="purple" type="submit">
                  Update
                </Button>
              </div>
            </form>
          </FormControl>
        </div>
      </section>
    </div>
  );
};

export default EditEmployee;
