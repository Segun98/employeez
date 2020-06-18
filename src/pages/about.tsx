import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Add, Delete, Completed } from "../redux/actions/index";
import { Button, Input } from "@chakra-ui/core";
import Header from "../components/header";

interface props {
  id: number;
  name: string;
  price: string;
  completed: boolean;
}

interface DefaultRootState {
  Transaction: Array<props>;
}

export default function About() {
  const Transaction: Array<props> = useSelector<DefaultRootState, any>(
    (state) => state.Transaction
  );

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<props["price"]>("");

  function addTransaction(e: any) {
    e.preventDefault();
    const newT = {
      id: Math.random(),
      name,
      price: parseInt(price),
      completed: false,
    };
    dispatch(Add(newT));
    setName("");
    setPrice("");
  }

  function deleteTransaction(id: props["id"]) {
    dispatch(Delete(id));
  }

  return (
    <div>
      <Header />
      <br/>
      <h3 style={{ textAlign: "center" }}>About Page</h3>
      <div style={{ margin: "auto", width: "50%" }}>
        {Transaction.map((t, index) => (
          <ul key={t.id}>
            <Button
              variantColor="pink"
              onClick={() => {
                dispatch(Completed(index));
              }}
            >
              {t.completed ? "Completed" : "Pending"}
            </Button>
            <li
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
            >
              {t.name}
            </li>
            <li>{t.price}</li>
            <Button
              variantColor="red"
              onClick={() => {
                deleteTransaction(t.id);
              }}
            >
              Delete
            </Button>
          </ul>
        ))}
      </div>
      <form onSubmit={addTransaction} style={{ margin: "auto", width: "50%" }}>
        <label htmlFor="name">Name</label>
        <Input
          isRequired
          type="text"
          id="name"
          value={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="price">Price</label>
        <Input
          isRequired
          type="number"
          id="price"
          value={price}
          onChange={(e: any) => {
            setPrice(e.target.value);
          }}
        />
        <br />
        <Button type="submit" variantColor="blue">
          Submit
        </Button>
      </form>
    </div>
  );
}
