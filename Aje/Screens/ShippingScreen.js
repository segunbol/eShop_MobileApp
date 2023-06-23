import {
  Box,
  Center,
  FormControl,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React from "react";
import Colors from "../color";
import Buttone from "../Components/Buttone";
import { useNavigation } from "@react-navigation/native";

const ShippingInputs = [
  {
    label: "ENTER COUNTRY",
    type: "text",
  },
  {
    label: "ENTER STATE",
    type: "text",
  },
  {
    label: "ENTER TOWN",
    type: "text",
  },
  {
    label: "ENTER ADDRESS",
    type: "text",
  },
];

function ShippingScreen() {
  const navigation = useNavigation();
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
            {ShippingInputs.map((i, index) => (
              <FormControl key={index}>
                <FormControl.Label
                  _text={{ fontSize: "12px", fontWeight: "bold" }}
                >
                  {i.label}
                </FormControl.Label>
                <Input
                  borderWidth={1}
                  borderColor={Colors.main}
                  type={i.type}
                  py={4}
                  bg={Colors.grey}
                  color={Colors.mainLight}
                  _focus={{
                    bg: Colors.greyLight,
                    color: Colors.black,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
                />
              </FormControl>
            ))}
            <Buttone
              onPress={() => navigation.navigate("PaymentScreen")}
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
