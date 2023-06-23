import { Box, Button, Center, HStack, ScrollView, Text } from "native-base";
import CartEmpty from "../Components/CartEmpty";
import CartItems from "../Components/CartItems";
import Buttone from "../Components/Buttone";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";




function CartScreen() {
  const navigation = useNavigation();
  return (
    <Box flex={1} bg={Colors.mainLight}>
      {/* Header */}
      <Center w="full" py={5}>
        <Text color={Colors.black} fontSize={30} bold>
          Cart
        </Text>
      </Center>
      {/* IF CART IS EMPTY 
            <CartEmpty /> */}
      {/* CART ITEMS*/}
      <ScrollView showVerticalScrollIndicator={false}>
        <CartItems />
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
            <Text>Total</Text>
            <Button
              px={10}
              h={45}
              rounded={50}
              bg={Colors.main}
              _text={{ color: Colors.white, fontWeight: "semibold" }}
              _pressed={{ bg: Colors.mainLight }}
            >
              ₦350
            </Button>
          </HStack>
        </Center>
        <Center mx={5}>
          <Buttone
            onPress={() => navigation.navigate("Shipping")}
            bg={Colors.black}
            color={Colors.white}
            mt={10}
          >
            CHECKOUT
          </Buttone>
        </Center>
      </ScrollView>
    </Box>
  );
}

export default CartScreen;
