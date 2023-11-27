import {
  Box,
  Flex,
  Heading,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import { products } from "./data/Products";
import Rating from "./Rating";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import { useNavigation } from "@react-navigation/native";
import Colors from "../color";
import Spinner from "react-native-loading-spinner-overlay";
import { Dimensions, StyleSheet } from "react-native";
import { View } from "react-native";

// const datas = require('../assets/data/products.json')

const HomeProducts = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActive(-1);
    setIsLoading(true);

    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        setCategories(res.data);
        setInitialState(res.data);
      })
      .catch((error) => {
        // Handle any errors that occur
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      setCategories([]);
      setInitialState([]);
    };
  }, []);
  // setTimeout(() => {
  //   setIsLoading(false); // Hide the spinner
  // }, 7000);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((data) => (
          <Pressable
            onPress={() => navigation.navigate("Single", { data: data })}
            key={data._id}
            w={Dimensions.get("window").width * 0.45}
            h={Dimensions.get("window").height * 0.25}
            rounded="8"
            shadow={1}
            pt={15}
            my={3}
            // pb={2}

            // overflow="hidden"
          >
            <View key={data.id} style={styles.categoryItem}>
              <Image
                source={
                  data.image && { uri: data.image }
                    ? { uri: data.image }
                    : { uri: require("../assets/images/Delta.png") }
                }
                alt={data.name}
                w="full"
                h={40}
                resizeMode="contain"
              />
              <Text style={styles.categoryName}>{data.name}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 10,
  },
  categoryItem: {
    margin: 10,
    
  },
  categoryName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeProducts;
