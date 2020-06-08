import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Add, Delete, Completed } from "./../actions/index";
import { Button, Input } from "@chakra-ui/core";

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
      <h3 style={{ textAlign: "center" }}>About Page</h3>
      <div style={{ textAlign: "center" }}>
        {Transaction.map((t,index) => (
          <ul key={t.id}>
            <Button
              variantColor="pink"
              onClick={() => {
               dispatch(Completed(index))
              }}
            >
              {t.completed? "Completed" : "Pending"}
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
      <form onSubmit={addTransaction}>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="price">Price</label>
        <Input
          type="number"
          id="price"
          value={price}
          onChange={(e: any) => {
            setPrice(e.target.value);
          }}
        />
        <br />
        <br />
        <Button type="submit" variantColor="blue">
          Submit
        </Button>
      </form>
    </div>
  );
}
