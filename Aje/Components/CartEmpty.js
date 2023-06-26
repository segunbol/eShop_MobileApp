import { Box, Center, Text } from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Buttone from "./Buttone";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";

const CartEmpty = () => {
  const navigation = useNavigation()
  return (
    <Box flex={1} px={2}>
      <Center h="90%">
        <Center w={200} h={200} bg={Colors.white} rounded="full">
          <FontAwesome name="shopping-basket" size={64} color={Colors.main} />
        </Center>
        <Text color={Colors.main} bold mt={5}>
          CART IS EMPTY
        </Text>
        <Buttone mt={10} bg={Colors.black} color={Colors.white}>
        START SHOPPING
        </Buttone>
      </Center>
      
    </Box>
  );
}

export default CartEmpty;
