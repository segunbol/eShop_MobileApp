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

function HomeScreen() {
  return (
    <Box flex={1} bg={"pink.100"}>
      <HomeSearch />
      <HomeProducts />
    </Box>
  );
}

export default HomeScreen;
