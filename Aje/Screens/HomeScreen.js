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

import Categories from "../Components/CategoryScreen.js";
import Colors from "../color";

function HomeScreen() {
  return (
    <Box flex={1} bg={Colors.mainLight}>
      <HomeSearch />
      <Box flex={0.40}>
        <Categories />
      </Box>
      <Box flex={0.60}>
        <HomeProducts />
      </Box>
    </Box>
  );
}


export default HomeScreen;
