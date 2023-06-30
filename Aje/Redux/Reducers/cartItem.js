import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";

const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case REMOVE_FROM_CART:
      console.log("E Press");
      return state.filter((cartItem) => cartItem !== action.payload);
    case CLEAR_CART:
      return (state = []);
  }
  console.log(`Cart item ${JSON.stringify(action.payload)}`);
  console.log(`Cart item ${JSON.stringify(state)}`);
  return state;
};

export default cartItems;
