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

// const datas = require('../assets/data/products.json')

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActive(-1);
    setIsLoading(true);

    axios
      .get(`${baseURL}products`)
      .then((res) => {
        setProducts(res.data);
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
      setProducts([]);
      setInitialState([]);
    };
  }, []);
  // setTimeout(() => {
  //   setIsLoading(false); // Hide the spinner
  // }, 7000);
  return (
    <>
      <Text fontSize={24} fontWeight={"bold"} mt={1} pl={3}>
        Products
      </Text>
      <ScrollView flex={1}>
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          color={Colors.main}
          size={"large"}
          overlayStyle={{ backgroundColor: "black", opacity: 0.5 }}
          // overlayColor={Colors.mainLight}
        />
        <Flex
          flexWrap="wrap"
          direction="row"
          justifyContent="space-between"
          px={6}
        >
          {products.map((data) => (
            <Pressable
              onPress={() => navigation.navigate("Single", { data: data })}
              key={data._id}
              w="47%"
              bg={Colors.lightBlack}
              rounded="md"
              shadow={2}
              pt={0.3}
              my={3}
              pb={2}
              overflow="hidden"
            >
              <Flex alignItems="center">
                <Image
                  source={
                    data.image && { uri: data.image }
                      ? { uri: data.image }
                      : {
                          uri: require("../assets/images/categoryImages/electronicss.png"),
                        }
                  }
                  alt={data.name}
                  w="full"
                  h={24}
                  resizeMode="contain"
                  bg="transparent"
                />
              </Flex>

              <Box px={4} pt={1}>
                <Heading size="sm" bold>
                  ₦{data.price}
                </Heading>

                <Text fontSize={10} mt={1} isTruncated w="full">
                  {data.name}
                </Text>
                <Rating value={data.rating} />
              </Box>
            </Pressable>
          ))}
        </Flex>
      </ScrollView>
    </>
  );
};

export default HomeProducts;
