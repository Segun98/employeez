import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, setToken } from "../utils/accesstoken";

interface props {
  _id: string;
  customer_name: string;
}

export default function Index() {
  const [customers, setCustomers] = useState<Array<props>>([]);
  useEffect(() => {
    fetchRefreshToken();
    // eslint-disable-next-line
  }, []);

  async function fetchRefreshToken() {
    const instance = axios.create({
      withCredentials: true,
    });

    try {
      const res = await instance.post(
        "http://localhost:8080/api/refreshtokens"
      );
       setToken(res.data.accessToken);      
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
        "http://localhost:8080/api/customers",
        config
      );
       setCustomers(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Hello World!!!</h3>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        {customers.map((customer) => (
          <div key={customer._id}>
            <p>{customer.customer_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
