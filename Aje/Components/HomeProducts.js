import { Box, Flex, Heading, Image, Pressable, ScrollView, Text } from "native-base";
import React, { useEffect, useState } from "react";
import   { products }   from "./data/Products";
import Rating from "./Rating";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import { useNavigation } from "@react-navigation/native";

const datas = require('../assets/data/products.json')



const HomeProducts = (props) => {

  const [products, setProducts] = useState([]);
  const navigation = useNavigation()
  const [active, setActive] = useState()
  const [initialState, setInitialState] = useState()
  useEffect(() => {
    setActive(-1)

    axios
    .get(`${baseURL}products`)
    .then((res) =>{
      setProducts(res.data);
      setInitialState(res.data)
    })
    .catch((error) => {
          // Handle any errors that occur
          console.error(error);
      });
    return () => {
      setProducts([])
      setInitialState([])
    }
  }, [])

  return (
    <ScrollView flex={1}>
      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={6}
      >
        {products.map((data) => (
          <Pressable
            onPress={() => navigation.navigate("Single", {datas : data})}
            key={data._id}
            w="47%"
            bg={"white "}
            rounded="md"
            shadow={2}
            pt={0.3}
            my={3}
            pb={2}
            overflow="hidden"
          >
            <Image
              source={{ uri: data.image }}
              alt={data.name}
              w="full"
              h={24}
              resizeMode="contain"
            />
            <Box px={4} pt={1}>
                <Heading size="sm" bold>
                    ₦{data.price}
                </Heading>
                
                <Text fontSize={10} mt={1} isTruncated w="full">{data.name}</Text>
                <Rating value={data.rating} />   
            </Box>
          </Pressable>
        ))}
      </Flex>
    </ScrollView>
  );
}

export default HomeProducts;
