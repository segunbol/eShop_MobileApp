import { Button, Center, HStack, Modal, Text, VStack } from "native-base";
import React, { useContext, useState } from "react";
import Colors from "../color";
import Buttone from "./Buttone";
import { useNavigation } from "@react-navigation/native";
import { Store } from "../Redux/store";

const PlaceOrderModel = () => {
  const navigation = useNavigation();
  const [showModel, setShowModel] = useState(false);
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const total = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const tax = 0.12 * total;
  const shipping = 1500;
  const totalSum = total + tax + shipping;
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
        bg={Colors.black}
        color={Colors.white}
        mt={5}
      >
        SHOW TOTAL
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
            <Button
              flex={1}
              bg={Colors.main}
              h={45}
              _text={{
                color: Colors.white,
              }}
              onPress={() => {
                navigation.navigate("Order");
                setShowModel(false);
              }}
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

export default PlaceOrderModel;
