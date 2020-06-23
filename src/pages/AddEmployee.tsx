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
import {dash} from "../utils";

export const AddEmployee: React.FC = () => {
  // const [loading, setloading] = useState(false);
  // const [success, setSuccess] = useState("");
  // const [error, setError] = useState("");
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

  function handleSubmit(e: any) {
    e.preventDefault();
    const payload = {
      name_url: dash(name),
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
      classif,
      salary,
      benefits,
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
                    placeholder= "City, e.g Lagos"
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
                    placeholder="useful notes about this employee. Performance review etc"
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
                  Add Employee
                </Button>
              </div>
            </form>
          </FormControl>
        </div>
      </section>
    </div>
  );
};

export default AddEmployee;
