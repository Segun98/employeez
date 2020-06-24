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
import { dash } from "../utils";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getToken, setToken } from "../utils/accesstoken";
import { useAuth } from "../Context/authcontext";

export const AddCustomer: React.FC = () => {
  const history = useHistory();
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
      const res = await instance.post(
        "http://localhost:8080/api/refreshtokens"
      );
      setToken(res.data.accessToken);
      console.clear();
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setisAuth(false);
      }
      console.log(error.message);
    }
  }
  const [Loading, setLoading] = useState(false);
  const [err, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [notes, setNotes] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const payload = {
      name_url: dash(name),
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

    try {
      setLoading(true);
      const res = await instance.post(
        "http://localhost:8080/api/customers/add",
        payload,
        config
      );
      if (res.data.status) {
        history.push("/customers");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error.message);
    }
  }

  return (
    <div className="addemployee-page">
      <section>
        <MainHeader />
      </section>
      <section className="dashboard-body">
        <div className="dashboard-auto">
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
                    isRequired={false}
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
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <Spinner
                  style={{
                    display: Loading ? "block" : "none",
                    textAlign: "center",
                  }}
                ></Spinner>
                <div
                  style={{
                    display: err ? "block" : "none",
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  An error Ocurred, check your internet connection and refresh
                </div>
              </div>
              <div className="add-employee-submit">
                <Button variantColor="purple" type="submit">
                  Add Customer
                </Button>
              </div>
            </form>
          </FormControl>
        </div>
      </section>
    </div>
  );
};

export default AddCustomer;
