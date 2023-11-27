// import {
//   Box,
//   Button,
//   Center,
//   FlatList,
//   HStack,
//   Image,
//   Pressable,
//   Text,
//   VStack,
// } from "native-base";
// import React, { useContext, useEffect, useState } from "react";
// import Colors from "../color";
// import { Store } from "../Redux/store";
// import axios from "axios";
// import AuthGlobal from "../Context/store/AuthGlobal";
// import baseURL from "../assets/common/baseUrl";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const OrderItem = () => {
//   const context = useContext(AuthGlobal)
//   const { state } = useContext(Store);
//   const {
//     cart: { cartItems },
//   } = state;
//   const [orderItems, setOrderItems] = useState()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await AsyncStorage.getItem("jwt"); // Wait for the token
//         if (token) {
//           const { data } = await axios.get(`${baseURL}orders/mine`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setOrderItems(data);
//         }
//       } catch (err) {
//         dispatch({
//           type: "FETCH_FAIL",
//           payload: getError(err),
//         });
//       }
//     };

//   });
//   // axios
//   //       .get(`${baseURL}orders/mine`, {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       })
//   //       .then((x) => {
//   //           const data = x.data;
//   //           console.log(x.data)
//   //           const userOrders = data.filter(
//   //               (order) => order.user === context.stateUser.user.useId
//   //           );
//   //           console.log(userOrders)
//   //           setState(userOrders);
//   //       })
//   //       .catch((error) => console.log(error))
//   return (
//     <FlatList
//       showVerticalScreenIndicator={false}
//       data={orderItems}
//       keyExtractor={(item) => item._id}
//       renderItem={({ item }) => (
//         <Pressable>
//           <Box mb={3}>
//             <HStack
//               alignItems="center"
//               bg={Colors.white}
//               shadow={1}
//               rounded={10}
//               overflow="hidden"
//             >
//               <Center w="25%" bg={Colors.grey}>
//                 <Image
//                   source={{ uri: item.image }}
//                   alt={item.name}
//                   w="full"
//                   h={24}
//                   resizeMode="contain"
//                 />
//               </Center>
//               <VStack w="60%" px={2}>
//                 <Text isTruncated bold fontSize={14}>
//                   {item.name}
//                 </Text>
//                 <Text isTruncated mt={2} bold>
//                   ${item.price}
//                 </Text>
//               </VStack>
//               <Center>
//                 <Button
//                   bg={Colors.main}
//                   _pressed={{ bg: Colors.orange }}
//                   _text={{ color: Colors.white }}
//                 >
//                   {item.quantity}
//                 </Button>
//               </Center>
//             </HStack>
//           </Box>
//         </Pressable>
//       )}
//     />
//   );
// };

// export default OrderItem;

import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import Colors from "../color";
import { Store } from "../Redux/store";
import axios from "axios";
import AuthGlobal from "../Context/store/AuthGlobal";
import baseURL from "../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderItem = () => {
  const context = useContext(AuthGlobal);
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const {
    ordered: { orderedItems },
  } = state;
  const [orderItems, setOrderItems] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        if (!cartItems || cartItems.length === 0) {
          await setOrderItems(orderedItems.check.cartItems);
        } else {
          setOrderItems(cartItems);
        }
      } catch (err) {
        console.error("Error fetching order items:", err);
      }
    };

    fetchData();
  }, [cartItems]);

  return (
    <FlatList
      showVerticalScreenIndicator={false}
      data={orderItems}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Pressable>
          <Box mb={3}>
            <HStack
              alignItems="center"
              bg={Colors.white}
              shadow={1}
              rounded={10}
              overflow="hidden"
            >
              <Center w="25%" bg={Colors.grey}>
                <Image
                  source={{ uri: item.image }}
                  alt="uuuuuuu"
                  w="full"
                  h={24}
                  resizeMode="contain"
                />
              </Center>
              <VStack w="60%" px={2}>
                <Text isTruncated bold fontSize={14}>
                  {item.name}
                </Text>
                <Text isTruncated mt={2} bold>
                  ${item.price}
                </Text>
              </VStack>
              <Center>
                <Button
                  bg={Colors.main}
                  _pressed={{ bg: Colors.orange }}
                  _text={{ color: Colors.white }}
                >
                  {item.quantity}
                </Button>
              </Center>
            </HStack>
          </Box>
        </Pressable>
      )}
    />
  );
};

export default OrderItem;
