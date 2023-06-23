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
import React, { useState } from "react";
import { Pressable } from "react-native";
import Colors from "../color";
import Buttone from "./Buttone";
import { useNavigation } from "@react-navigation/native";

const OrdersInfo = [
  {
    title: "Products",
    price: 125.43,
    color: "black",
  },
  {
    title: "Shipping",
    price: 34.54,
    color: "black",
  },
  {
    title: "Tax",
    price: 10.32,
    color: "black",
  },
  {
    title: "Total Amount",
    price: 543.12,
    color: "main",
  },
];

const OrderModel = () => {
  const navigation = useNavigation()
  const [showModel, setShowModel] = useState(false);
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
                    $ {i.price}
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
              PLACE ORDER
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default OrderModel;
