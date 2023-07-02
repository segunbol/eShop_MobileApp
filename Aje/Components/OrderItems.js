import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useContext } from "react";
import Colors from "../color";
import { Store } from "../Redux/store";

const OrderItem = () => {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <FlatList
      showVerticalScreenIndicator={false}
      data={cartItems}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Pressable>
          <Box mb={3}>
            <HStack
              alignItems="center"
              bg={Colors.white}
              shadow={1}
              rounded={10}
              overflow="hidden"
            >
              <Center w="25%" bg={Colors.grey}>
                <Image
                  source={{ uri: item.image }}
                  alt={item.name}
                  w="full"
                  h={24}
                  resizeMode="contain"
                />
              </Center>
              <VStack w="60%" px={2}>
                <Text isTruncated bold fontSize={14}>
                  {item.name}
                </Text>
                <Text isTruncated mt={2} bold>
                  ${item.price}
                </Text>
              </VStack>
              <Center>
                <Button
                  bg={Colors.main}
                  _pressed={{ bg: Colors.orange }}
                  _text={{ color: Colors.white }}
                >
                  {item.quantity}
                </Button>
              </Center>
            </HStack>
          </Box>
        </Pressable>
      )}
    />
  );
};

export default OrderItem;
