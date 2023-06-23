import {
  Box,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React from "react";
import Colors from "../color";
import Buttone from "../Components/Buttone";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PaymentMethods = [
  {
    image: require("../assets/images/Visa2.png"),
    alt: "Visa",
    icon: "FontAwesome",
  },
  {
    image: require("../assets/images/wallet.png"),
    alt: "wallet",
    icon: "Ionicons",
  },
  {
    image: require("../assets/images/masterCard.png"),
    alt: "MasetrCard",
    icon: "FontAwesome",
  },
];
function PaymentScreen() {
  const navigation = useNavigation();
  return (
    <Box flex={1} safeArea bg={Colors.main} py={5}>
      {/*Header*/}
      <Center pb={15}>
        <Text color={Colors.mainLight} fontSize={14} bold>
          PAYMENT METHOD
        </Text>
      </Center>
      {/* SELECTION */}
      <Box h="full" bg={Colors.mainLight} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {PaymentMethods.map((i, index) => (
              <HStack
                key={index}
                alignItems="center"
                bg={Colors.white}
                px={3}
                py={1}
                justifyContent="space-between"
                rounded={10}
              >
                <Box>
                  <Image source={i.image} alt={i.alt} w={60} h={50} />
                </Box>
                {i.icon === "Ionicons" ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={30}
                    color={Colors.main}
                  />
                ) : (
                  <FontAwesome
                    name="circle-thin"
                    size={30}
                    color={Colors.main}
                  />
                )}
              </HStack>
            ))}
            <Buttone
              onPress={() => navigation.navigate("PlaceOrder")}
              bg={Colors.main}
              color={Colors.mainLight}
            >
              CONTINUE
            </Buttone>
            <Text italic textAlign="center">
              Payment Method is <Text bold>"In-App Wallet"</Text> by default{" "}
            </Text>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default PaymentScreen;
