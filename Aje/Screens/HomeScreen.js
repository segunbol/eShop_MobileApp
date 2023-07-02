import React from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Pressable,
  VStack,
} from "native-base";
import HomeSearch from "../Components/HomeSearch";
import HomeProducts from "../Components/HomeProducts";

import Categories from "./CategoryScreen.js";

function HomeScreen() {
  return (
    <Box flex={1} bg={"pink.100"}>
      <HomeSearch />
      <Categories />
      <HomeProducts />
    </Box>
  );
}

export default HomeScreen;
