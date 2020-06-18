export const Increment = (num:number) => {
  return {
    type: "INCREMENT",
    payload: num
  };
};

export const Decrement = () => {
  return {
    type: "DECREMENT",
  };
};

interface props {
  id: number,
  name: string,
  price: number,
  completed: boolean
}


export const Add = (newT:props) => {
  return {
    type: "ADD",
    payload:newT
  };

};

export const Delete = (id:number) => {
  return {
    type: "DELETE",
    payload: id
  };
};

export const Completed = (index:number) => {
  return {
    type: "COMPLETE",
    payload: index
  };
};
