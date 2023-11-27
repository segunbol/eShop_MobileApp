import { Button, Center, HStack, Modal, Text, VStack } from "native-base";
import { useContext, useState } from "react";
import Colors from "../color";
import Buttone from "./Buttone";
import { useNavigation } from "@react-navigation/native";
import { Store } from "../Redux/store";
import AuthGlobal from "../Context/store/AuthGlobal";
import axios from "axios"; // Import Axios for making API requests
import baseURL from "../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlaceOrderModel = () => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation(); // Move useNavigation hook inside the component
  const [showModel, setShowModel] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems }
  } = state;
  const check = state.cart
  const {shippingAddress} = state.cart
  const paymentMethod = state.cart.paymentMethod
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

  const placeOrderHandler = async () => {
    const userId = context.stateUser.user.userId;
    const token = await AsyncStorage.getItem('jwt')
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    // console.log(`In PlaceorderMosdel ${JSON.stringify(state)}`);

    // Send a DELETE request to clear the cart on the backend
    try {
      await axios.post(`${baseURL}orders`, 
      {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: total,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: totalSum,
      }, {headers});
      console.log("Order Created");
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
    try {
      await axios.delete(`${baseURL}cartitems/${userId}`);
      console.log("Cart Item Cleared");
    } catch (error) {
      console.error("Error Clearing Cart:", error.message);
    }

    // Dispatch the "CART_CLEAR" action to clear the cart in the store
    ctxDispatch({
      type: "CART_CLEAR",
    });
    ctxDispatch({
      type: "ADD_TO_ORDERED",
      payload: { check },
    });
    navigation.navigate("Order");
    // setShowModel(false);
  };

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
              onPress={placeOrderHandler}
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
