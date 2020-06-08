interface props {
  id: number;
  name: string;
  price: string;
  completed: boolean;
}

const transaction: Array<props> = []

export const Transaction = (state: Array<props> = transaction, action: any) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((st) => st.id !== action.payload);
    case "COMPLETE":
      let handler = [...state];
      handler[action.payload].completed = !handler[action.payload].completed;
      return handler;
    default:
      return state;
  }
};
