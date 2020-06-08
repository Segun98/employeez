import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Increment, Decrement } from "./../actions/index";
import { Button } from "@chakra-ui/core";

interface DefaultRootState {
  count: Number;
}
export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const number = useSelector<DefaultRootState, any>((state) => state.count);

  function increase() {
    dispatch(Increment(5));
  }
  function decrease() {
    dispatch(Decrement());
  }
  return (
    <div>
      <h3 style={{textAlign:"center"}}>dashboard</h3>
      <div
        style={{
          margin: "auto",
          width: "50%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button variantColor="green" onClick={decrease} style={{ fontSize: "14px" }}>
          -
        </Button>
        {number}
        <Button variantColor="green" onClick={increase} style={{ fontSize: "14px" }}>
          +
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
