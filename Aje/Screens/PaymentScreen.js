import { useState, useContext } from "react";
import { Store } from "../Redux/store";
import {
  Box,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../color";
import Buttone from "../Components/Buttone";

const PaymentMethods = [
  {
    image: require("../assets/images/Visa2.png"),
    alt: "Visa",
    icon: "FontAwesome",
  },
  {
    image: require("../assets/images/wallet.png"),
    alt: "App Wallet",
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
  const { state, dispatch } = useContext(Store);
  const { paymentMethod } = state;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethod || null
  );

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleContinue = () => {
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    console.log(state);
    navigation.navigate("PlaceOrder");
  };

  return (
    <Box flex={1} safeArea bg={Colors.main} py={5}>
      <Center pb={15}>
        <Text color={Colors.mainLight} fontSize={14} bold>
          PAYMENT METHOD
        </Text>
      </Center>
      <Box h="full" bg={Colors.mainLight} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {PaymentMethods.map((method, index) => (
              <Pressable
                key={index}
                onPress={() => handlePaymentMethodSelect(method.alt)}
              >
                <HStack
                  alignItems="center"
                  bg={Colors.white}
                  px={3}
                  py={1}
                  justifyContent="space-between"
                  rounded={10}
                >
                  <Box>
                    <Image
                      source={method.image}
                      alt={method.alt}
                      w={60}
                      h={50}
                    />
                  </Box>
                  {selectedPaymentMethod === method.alt ? (
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
              </Pressable>
            ))}
            <Buttone
              onPress={handleContinue}
              bg={Colors.main}
              color={Colors.mainLight}
            >
              CONTINUE
            </Buttone>
            <Text italic textAlign="center">
              Payment Method is <Text bold>"In-App Wallet"</Text> by default
            </Text>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default PaymentScreen;
