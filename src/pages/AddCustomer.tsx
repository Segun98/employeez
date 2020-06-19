import React, { useState } from "react";
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
} from "@chakra-ui/core";
import { dash } from "../utils";

export const AddCustomer: React.FC = () => {
  // const [loading, setloading] = useState(false);
  // const [success, setSuccess] = useState("");
  // const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    const payload = {
      name_url: dash(name),
      name,
      email,
      address,
      occupation,
      phone,
      dob,
      gender,
      notes,
    };
    console.log(payload);
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
