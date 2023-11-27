import React, { useEffect, useState, useReducer } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const screenWidth = Dimensions.get("window").width;
const data = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const DashboardScreen = () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    summary: null,
  });
  const { loading, summary } = state;
  

  useEffect(() => {
    const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem("jwt");
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
    
          const { data } = await axios.get(`${baseURL}orders/summary`, {
            headers: { Authorization: `Bearer ${headers}` },
          });
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        } catch (err) {
          dispatch({
            type: "FETCH_FAIL",
            payload: getError(err),
          });
        }
      };
      fetchData()
  }, [summary, loading]);

    // console.log(summary.productCategories);
  //   console.log(summary)
  //   console.log(state)
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {summary ? (
        <>
          
          <PieChart
            data={summary.productCategories}
            width={screenWidth}
            height={250}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[15, 0]}
            absolute
          />
        </>
      ) : (
        <Text>No Data</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default DashboardScreen;
