import { Box, Heading, ScrollView } from "native-base";
import OrderInfo from "../Components/OrderInfo";
import OrderItem from "../Components/OrderItems";
import PlaceOrderModel from "../Components/PlaceOrderModel";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../color";

function PlaceOrderScreen() {
  return (
    <Box bg={Colors.mainLight} flex={1} safeArea pt={6}>
      <Box>
        <ScrollView horizontal={true} showHorizontalScrollIndicator={false}>
          <OrderInfo
            title="CUSTOMER"
            subTitle="ExtraMortal"
            text="extramortal@ajeh.com"
            icon={<FontAwesome name="user" size={30} color={Colors.white} />}
          />
          <OrderInfo
            title="SHIPPING INFO"
            subTitle="Shipping Tanzania"
            text="Pay Method: PayPal"
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
            text="No 44 Dallimore Strt"
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
