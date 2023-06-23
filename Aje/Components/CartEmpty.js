import { Box, Center, Text } from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Buttone from "./Buttone";
import Colors from "../color";

const CartEmpty = () => {
  return (
    <Box flex={1} px={2}>
      <Center h="90%">
        <Center w={200} h={200} bg={Colors.white} rounded="full">
          <FontAwesome name="shopping-basket" size={64} color={Colors.main} />
        </Center>
        <Text color={Colors.main} bold mt={5}>
          CART IS EMPTY
        </Text>
      </Center>
      <Buttone bg={Colors.black} color={Colors.white}>
        START SHOPPING
      </Buttone>
    </Box>
  );
}

export default CartEmpty;
