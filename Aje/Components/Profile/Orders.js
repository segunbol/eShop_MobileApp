import {
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Colors from "../../color";
import AuthGlobal from "../../Context/store/AuthGlobal";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Dimensions, StyleSheet } from "react-native";
import baseURL from "../../assets/common/baseUrl";
import OrderCard from "../../Shared/OrderCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

var { width } = Dimensions.get("window");

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("jwt");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// Usage example

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

const Orders = () => {
  getToken().then((token) => {
    if (token) {
      console.log(token);
      return token;
      // You can use the token for your API requests or other purposes
    } else {
      console.log("Token not found");
    }
  });
  const context = useContext(AuthGlobal);
  const token = getToken();
  console.log(token);
  const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });
  console.log(orders);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken(); // Wait for the token
        if (token) {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`${baseURL}orders`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        }
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (order) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        dispatch({ type: "DELETE_REQUEST" });
        await axios.delete(`${baseURL}orders/${order._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("order deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  return (
    <Box h="full" bg={Colors.white} pt={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable>
          <Box style={styles.order}>
            <VStack>
              {orders ? (
                orders.map((x) => {
                  return <OrderCard key={x.id} {...x} />;
                })
              ) : (
                <View style={styles.order}>
                  <Text>You have no orders</Text>
                </View>
              )}
            </VStack>
          </Box>
        </Pressable>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: width,
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
});
export default Orders;
