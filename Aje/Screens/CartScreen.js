import {
  Box,
  Button,
  Center,
  HStack,
  VStack,
  ScrollView,
  Image,
  Pressable,
  Text,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import Colors from "../color";
import CartEmpty from "../Components/CartEmpty";
import CartItems from "../Components/CartItems";
import Buttone from "../Components/Buttone";
import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import baseURL from "../assets/common/baseUrl";

import { Store } from "../Redux/store";
import AuthGlobal from "../Context/store/AuthGlobal";

const CartScreen = (props) => {
  const navigation = useNavigation();
  const context = useContext(AuthGlobal);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const handleCheckout = () => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login");
    } else {
      props.navigation.navigate("Shipping");
    }
  };

  const removeItemHandler = (data) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: data });
  };
  const hiddenItem = ({ item }) => (
    <Pressable
      w={50}
      roundedTopRight={10}
      roundedBottomRight={10}
      h={90}
      ml="auto"
      justifyContent="center"
      bg={Colors.red}
      onPress={() => removeItemHandler(item)}
    >
      <Center alignItems="center" space={2}>
        <FontAwesome name="trash" size={24} color={Colors.white} />
      </Center>
    </Pressable>
  );

  return (
    <Box flex={1} bg={Colors.mainLight}>
      {/* Header */}
      <Center w="full" py={5}>
        <Text color={Colors.black} fontSize={30} bold>
          Cart
        </Text>
      </Center>
      {/* CART ITEMS*/}
      {/* IF CART IS EMPTY
       */}
      {cartItems.length ? (
        <>
          <Box mr={6}>
            <SwipeListView
              rightOpenValue={-50}
              previewRowKey="0"
              previewOpenValue={-40}
              previewOpenDelay={3000}
              data={cartItems}
              renderItem={renderItem}
              renderHiddenItem={hiddenItem}
              showVerrticalScrollIndicator={false}
            />
          </Box>
          <Center mt={5}>
            <HStack
              rounded={50}
              justifyContent="space-between"
              bg={Colors.white}
              shadow={2}
              w="90%"
              pl={5}
              h={45}
              alignItems="center"
            >
              <Text>Sub-Total</Text>
              <Button
                px={10}
                h={45}
                rounded={30}
                bg={Colors.main}
                _text={{ color: Colors.white, fontWeight: "semibold" }}
                _pressed={{ bg: Colors.mainLight }}
              >
                ₦{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </Button>
            </HStack>
          </Center>
          <Center mx={5}>
            <Buttone
              onPress={handleCheckout}
              bg={Colors.black}
              color={Colors.white}
              mt={10}
            >
              CHECKOUT
            </Buttone>
          </Center>
        </>
      ) : (
        <CartEmpty />
      )}
    </Box>
  );
};

const renderItem = ({ item }) => (
  <Pressable>
    <Box ml={6} mb={3}>
      <HStack
        alignItems="center"
        bg={Colors.white}
        shadow={1}
        rounded={10}
        overflow="hidden"
      >
        <Center w="25%" bg={Colors.grey}>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            alt={
              "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
            }
            w="full"
            h={90}
            resizeMode="contain"
          />
        </Center>
        <VStack w="60%" px={2} space={3}>
          <Text isTruncated color={Colors.black} bold fontSize={11}>
            {item.name}
          </Text>
          <Text bold color={Colors.lightBlack}>
            ₦{item.price}
          </Text>
        </VStack>
        <Center>
          <Button
            bg={Colors.main}
            _pressed={{ bg: Colors.main }}
            _text={{ color: Colors.white }}
          >
            {item.quantity}
          </Button>
        </Center>
      </HStack>
    </Box>
  </Pressable>
);

export default CartScreen;
