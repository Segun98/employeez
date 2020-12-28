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
import { fetchToken, getToken } from "../utils/accesstoken";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { url } from "../utils";

export const EditCustomer: React.FC = ({ match }: any) => {
  useEffect(() => {
    fetchToken(null, fetchdata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();
  let name_url = match.params.id;
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [notes, setNotes] = useState("");

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
        `${url}/api/customer/profile/${name_url}`,
        config
      );

      if (res.data.data) {
        let data = res.data.data;
        setPageLoad(false);
        setName(data.name);
        setEmail(data.email);
        setAddress(data.address);
        setOccupation(data.occupation);
        setPhone(data.phone);
        setDob(data.DOB);
        setGender(data.gender);
        setNotes(data.notes);
      }
    } catch (error) {
      console.log(error.message);
      setErr(true);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const payload = {
      name,
      email,
      address,
      occupation,
      phone,
      DOB: dob,
      gender,
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
        `${url}/api/customer/profile/${name_url}`,
        payload,
        config
      );
      if (res.data.success) {
        return history.push(`/customer/${name_url}`);
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
                  <FormLabel htmlFor="name"> Customer Name</FormLabel>
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
                  <FormLabel htmlFor="Occupation">Occupation</FormLabel>
                  <Input
                    isRequired={false}
                    type="text"
                    name="Occupation"
                    value={occupation}
                    onChange={(e: any) => {
                      setOccupation(e.target.value);
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
                  <FormLabel htmlFor="Notes">Notes</FormLabel>
                  <Textarea
                    isRequired={false}
                    size="sm"
                    placeholder="useful notes about this customer"
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
              </div>
              <div className="add-employee-submit">
                <Button variantColor="purple" type="submit" isLoading={loading}>
                  Edit Customer
                </Button>
              </div>
            </form>
          </FormControl>
        </div>
      </section>
    </div>
  );
};

export default EditCustomer;
