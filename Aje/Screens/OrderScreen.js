import { Box, Heading, ScrollView } from "native-base";
import OrderInfo from "../Components/OrderInfo";
import OrderItem from "../Components/OrderItems";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../color";
import OrderModel from "../Components/OrderModel";

function OrderScreen() {
  return (
    <Box bg={Colors.mainLight} flex={1} safeArea pt={6}>
      <Box>
        <ScrollView horizontal={true} showHorizontalScrollIndicator={false}>
          <OrderInfo
            title="SHIPPING INFO"
            success
            subTitle="Shipping Tanzania"
            text="Pay Method: Wallet"
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
            danger
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
        <OrderModel />
      </Box>
    </Box>
  );
}

export default OrderScreen;
