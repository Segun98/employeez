export const count = (state:number = 0, action: any): Number => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload ;
    case "DECREMENT":
      return state - 5;
    default:
      return state;
  }
};



