import {
  Box,
  Button,
  Center,
  HStack,
  VStack,
  ScrollView,
  Image,
  Pressable,
  Text,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import Colors from "../color";
import CartEmpty from "../Components/CartEmpty";
import CartItems from "../Components/CartItems";
import Buttone from "../Components/Buttone";
import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import baseURL from "../assets/common/baseUrl";
import * as actions from "../Redux/Actions/cartActions";

const CartScreen = (props) => {
  const [productUpdate, setProductUpdate] = useState();
  const [totalPrice, setTotalPrice] = useState();
  useEffect(() => {
    getProducts();
    return () => {
      setProductUpdate();
      setTotalPrice();
    };
  }, [props]);
  // 643fa7fd9e96a4b3a9c6594c

  const getProducts = () => {
    var products = [];
    props.cartItems.forEach((cart) => {
      const id = cart.product.route.params.datas._id;
      console.log(id);
      axios
        .get(`${baseURL}products/${id}`)
        .then((data) => {
          products.push(data.data);
          setProductUpdate(products);
          var total = 0;
          products.forEach((product) => {
            const price = (total += product.price);
            setTotalPrice(price);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const navigation = useNavigation();
  return (
    <Box flex={1} bg={Colors.mainLight}>
      {/* Header */}
      <Center w="full" py={5}>
        <Text color={Colors.black} fontSize={30} bold>
          Cart
        </Text>
      </Center>
      {/* CART ITEMS*/}
      {/* IF CART IS EMPTY
       */}
      {productUpdate ? (
        <>
          <Box mr={6}>
            <SwipeListView
              rightOpenValue={-50}
              previewRowKey="0"
              previewOpenValue={-40}
              previewOpenDelay={3000}
              data={productUpdate}
              renderItem={renderItem}
              renderHiddenItem={(data) => (
                <Pressable
                  w={50}
                  roundedTopRight={10}
                  roundedBottomRight={10}
                  h={90}
                  ml="auto"
                  justifyContent="center"
                  bg={Colors.red}
                  onPress={() => {
                    props.removeFromCart(data.item);
                  }}
                >
                  <Center alignItems="center" space={2}>
                    <FontAwesome name="trash" size={24} color={Colors.white} />
                  </Center>
                </Pressable>
              )}
              showVerrticalScrollIndicator={false}
            />
          </Box>
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
        </>
      ) : (
        <CartEmpty />
      )}
    </Box>
  );
};

const renderItem = (data) => (
  <Pressable>
    <Box ml={6} mb={3}>
      <HStack
        alignItems="center"
        bg={Colors.white}
        shadow={1}
        rounded={10}
        overflow="hidden"
      >
        <Center w="25%" bg={Colors.grey}>
          <Image
            source={{
              uri: data.item.image
                ? data.item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            alt={
              "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
            }
            w="full"
            h={90}
            resizeMode="contain"
          />
        </Center>
        <VStack w="60%" px={2} space={3}>
          <Text isTruncated color={Colors.black} bold fontSize={11}>
            {data.item.name}
          </Text>
          <Text bold color={Colors.lightBlack}>
            ₦{data.item.price}
          </Text>
        </VStack>
        <Center>
          <Button
            bg={Colors.main}
            _pressed={{ bg: Colors.main }}
            _text={{ color: Colors.white }}
          >
            5
          </Button>
        </Center>
      </HStack>
    </Box>
  </Pressable>
);

// const hiddenItem =

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null)(CartScreen);
