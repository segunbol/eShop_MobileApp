import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import AuthGlobal from "../Context/store/AuthGlobal";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
  ordered: {
    orderedItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (existItem) {
        let cartItems = state.cart.cartItems.map((item) =>
          item.id === existItem.id
            ? { ...item, quantity: newItem.quantity }
            : item
        );
        axios
          .put(`${baseURL}cartitems/${existItem.userId}`, newItem)
          .then((res) => {
            console.log("Cart item updated successfully:", res.data);
          })
          .catch((error) => {
            console.error("Error updating cart item:", error);
          });

        return { ...state, cart: { ...state.cart, cartItems } };
      } else {
        // console.log(`This is New Item ${JSON.stringify(newItem)}`);
        axios
          .post(`${baseURL}cartitems`, newItem)
          .then((res) => {
            console.log("Cart items posted successfully:", res.data);
          })
          .catch((error) => {
            console.error("Error posting cart items:", error);
          });
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: [...state.cart.cartItems, newItem],
          },
        };
      }

    case "RETRIEVE_CART_ITEMS":
      cartItems = action.payload;
      // console.log(`Coming from Retrieve Initial State ${JSON.stringify(initialState)}`);
      // console.log(`Coming from Retrieve Initial State ${JSON.stringify(cartItems)}`);
      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM":
      console.log(`This is ClearCart ${JSON.stringify(action.payload)}`);
      let itemToRemove = action.payload;
      const updatedCartItems = state.cart.cartItems.filter(
        (item) => item.id !== itemToRemove.id
      );
      // Make a delete request to remove the product from the backend
      axios
        .delete(`${baseURL}cartitems/${itemToRemove.userId}/${itemToRemove.id}`)
        .then((res) => {
          console.log("Product removed from cart successfully:", res.data);
        })
        .catch((error) => {
          console.error("Error removing product from cart:", error.message);
        });
      return {
        ...state,
        cart: { ...state.cart, cartItems: updatedCartItems },
      };

    case "CART_CLEAR":
      itemToRemove = action.payload;
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };

    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };

    case "ADD_TO_ORDERED":
      const orderedItems = action.payload;
      console.log(`Add to Ordered ${orderedItems}`)
      return { ...state, ordered: { ...state.ordered, orderedItems } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
