import {
  Button,
  Center,
  HStack,
  Image,
  Modal,
  Text,
  View,
  VStack,
} from "native-base";
import React, { useContext, useState } from "react";
import { Pressable } from "react-native";
import Colors from "../color";
import Buttone from "./Buttone";
import { useNavigation } from "@react-navigation/native";
import { Store } from "../Redux/store";

const OrderModel = () => {
  const navigation = useNavigation()
  const [showModel, setShowModel] = useState(false);
  const { state } = useContext(Store);
  const {cart: { cartItems },} = state;
  const total = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  const tax = 0.12 * total
  const shipping = 1500
  const totalSum = total + tax + shipping
  const OrdersInfo = [
    {
      title: "Products",
      price: total,
      color: "black",
    },
    {
      title: "Shipping",
      price: shipping,
      color: "black",
    },
    {
      title: "Tax",
      price: tax,
      color: "black",
    },
    {
      title: "Total Amount",
      price: totalSum,
      color: "main",
    },
  ];
  return (
    <Center>
      <Buttone
        onPress={() => setShowModel(true)}
        bg={Colors.main}
        color={Colors.white}
        mt={5}
      >
        SHOW PAYMENT & TOTAL
      </Buttone>
      <Modal isOpen={showModel} onClose={() => setShowModel(false)} size="lg">
        <Modal.Content maxWidth={350}>
          <Modal.CloseButton />
          <Modal.Header>Order</Modal.Header>
          <Modal.Body>
            <VStack space={7}>
              {OrdersInfo.map((i, index) => (
                <HStack
                  key={index}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text fontWeight="medium">{i.title}</Text>
                  <Text
                    color={i.color === "main" ? Colors.black : Colors.black}
                    bold
                  >
                    ₦ {i.price}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Pressable
              w="full"
              justifyContent="center"
              bg={Colors.greyLight}
              h={45}
              rounded={10}
              overflow="hidden"
              onPress={() => setShowModel(false)}
            >
              <Image
                source={require("../assets/images/wallet.png")}
                alt="wallet"
                resizeMode="contain"
                h={34}
              />
            </Pressable>
            <Button
              w="full"
              mt={2}
              bg={Colors.main}
              h={45}
              _text={{
                color: Colors.white,
              }}
              onPress={() => {
                navigation.navigate("Home")
                setShowModel(false)}}
              _pressed={{
                bg: Colors.main,
              }}
            >
               ORDER PAYMENT DETAILS
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default OrderModel;
