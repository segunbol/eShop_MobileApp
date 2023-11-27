import {
  Box,
  Flex,
  Heading,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import React, { useEffect, useReducer, useState } from "react";
import Rating from "../Components/Rating";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../color";
import Spinner from "react-native-loading-spinner-overlay";
import { getError } from "../assets/utils";
import HomeSearch from "../Components/HomeSearch";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const { category, query, price, rating, order, page } = route.params;
  const [product, setProduct] = useState([]);
  const [
    { loading, error, products = [], pages, countProducts },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" }); // Added fetch request action
        const apiUrl = `${baseURL}products/search?${query}`;
        const response = await axios.get(apiUrl);
        setProduct(response.data.products);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: response.data,
        }); // Passed response.data instead of undefined "data"
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [category, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/categories`);
  //       setCategories(data);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  //   fetchCategories();
  // }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <>
      <HomeSearch />
      <ScrollView flex={1} bg={Colors.mainLight}>
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
          {product.map((data) => (
            <Pressable
              onPress={() => navigation.navigate("Single", { data: data })}
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

export default SearchScreen;
