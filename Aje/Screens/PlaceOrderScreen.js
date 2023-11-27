import { Box, Heading, ScrollView } from "native-base";
import OrderInfo from "../Components/OrderInfo";
import OrderItem from "../Components/OrderItems";
import PlaceOrderModel from "../Components/PlaceOrderModel";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../color";
import { useContext } from "react";
import { Store } from "../Redux/store";
import AuthGlobal from "../Context/store/AuthGlobal";

function PlaceOrderScreen() {
  const { state } = useContext(Store);
  const context = useContext(AuthGlobal);
  const shipping = state.cart.shippingAddress;
  const payment = state.cart.paymentMethod;
  
  return (
    <Box bg={Colors.mainLight} flex={1} safeArea pt={6}>
      <Box>
        <ScrollView horizontal={true} showHorizontalScrollIndicator={false}>
          <OrderInfo
            title="CUSTOMER"
            subTitle={
              context.stateUser.user.name
                ? context.stateUser.user.name
                : "Login"
            }
            text={
              context.stateUser.user.email ? context.stateUser.user.email : " "
            }
            icon={<FontAwesome name="user" size={30} color={Colors.white} />}
          />
          <OrderInfo
            title="SHIPPING INFO"
            subTitle={shipping ? shipping.town : " "}
            text={`Payment Method: ${payment}`}
            icon={
              <FontAwesome5
                name="shipping-fast"
                size={30}
                color={Colors.white}
              />
            }
          />
          <OrderInfo
            title="DELIVER TO"
            subTitle="Address"
            text={shipping ? shipping.address : " siasia"}
            icon={<Ionicons name="location" size={30} color={Colors.white} />}
          />
        </ScrollView>
      </Box>
      {/* Order Item */}
      <Box px={6} flex={1} pb={3}>
        <Heading bold fontSize={15} isTruncated my={4}>
          PRODUCTS
        </Heading>
        <OrderItem />
        {/* Total */}
        <PlaceOrderModel />
      </Box>
    </Box>
  );
}

export default PlaceOrderScreen;
