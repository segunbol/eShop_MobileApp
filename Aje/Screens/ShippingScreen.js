import {
  Box,
  Center,
  FormControl,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useState } from "react";
import Colors from "../color";
import Buttone from "../Components/Buttone";
import { useNavigation } from "@react-navigation/native";
import { Store } from "../Redux/store";

const ShippingInputs = [
  {
    label: "ENTER COUNTRY",
    type: "text",
    key: "country", // Add a key property to identify the input field
  },
  {
    label: "ENTER STATE",
    type: "text",
    key: "state",
  },
  {
    label: "ENTER TOWN",
    type: "text",
    key: "town",
  },
  {
    label: "ENTER ADDRESS",
    type: "text",
    key: "address",
  },
];

function ShippingScreen() {
  const navigation = useNavigation();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [shippingAddress, setShippingAddress] = useState({
    country: "",
    state: "",
    town: "",
    address: "",
  });

  const handleChange = (key, value) => {
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [key]: value,
    }));
  };

  const shippingHandler = () => {
    ctxDispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: shippingAddress });
    navigation.navigate("PaymentScreen");
  };

  return (
    <Box flex={1} safeArea bg={Colors.main} py={5}>
      {/*Header*/}
      <Center pb={15}>
        <Text color={Colors.mainLight} fontSize={14} bold>
          DELIVERY ADDRESS
        </Text>
      </Center>
      {/* INPUTS */}
      <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {ShippingInputs.map((input, index) => (
              <FormControl key={index}>
                <FormControl.Label
                  _text={{ fontSize: "12px", fontWeight: "bold" }}
                >
                  {input.label}
                </FormControl.Label>
                <Input
                  borderWidth={1}
                  borderColor={Colors.main}
                  type={input.type}
                  py={4}
                  bg={Colors.mainLight}
                  color={Colors.grey}
                  _focus={{
                    bg: Colors.greyLight,
                    color: Colors.black,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
                  // Store the input value in the state when changed
                  onChangeText={(value) => handleChange(input.key, value)}
                  // Set the input value from the state
                  value={shippingAddress[input.key]}
                />
              </FormControl>
            ))}
            <Buttone
              onPress={shippingHandler}
              bg={Colors.main}
              color={Colors.mainLight}
            >
              CONTINUE
            </Buttone>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default ShippingScreen;
