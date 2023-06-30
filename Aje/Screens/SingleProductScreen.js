import {
  Box,
  Heading,
  HStack,
  Image,
  ScrollView,
  Spacer,
  Text,
  useControllableState,
} from "native-base";
import Rating from "../Components/Rating";
import Buttone from "../Components/Buttone";
import NumericInput from "react-native-numeric-input";
import Colors from "../color";
import Reviews from "../Components/Reviews";
import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AuthGlobal from "../Context/store/AuthGlobal";
import { Store } from "../Redux/store";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";

function SingleProductScreen(props) {
  const route = useRoute();
  const [datas, setDatas] = useState(route.params.datas);
  const context = useContext(AuthGlobal);
  const product = datas;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const [value, setValue] = useState(0);
  const navigation = useNavigation();
  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (!datas) {
      // Fetch the data using the ID from the route params
      axios
        .get(`${baseURL}products/${route.params?.id}`)
        .then((res) => {
          setDatas(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return () => {
      setDatas([]);
    };
  }, []);

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product.id);
    const quantity = existItem ? existItem.quantity + value : value;
    const { data } = await axios.get(`${baseURL}products/${product.id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigation.navigate("Cart");
  };

  return (
    <Box safeArea flex={1} bg="white">
      <ScrollView px={5} showVerticalScrollIndicator={false}>
        <Image
          source={{ uri: datas.image }}
          alt="Image"
          w="full"
          h={300}
          resizeMode="contain"
        />

        <Heading bold fontSize={15} mb={2} lineHeight={22}>
          {datas.name}
        </Heading>
        <Rating value={datas.rating} text={`${datas.numReviews} reviews`} />
        <HStack space={2} alignItems="center" my={5}>
          {datas.countInStock > 0 ? (
            <NumericInput
              value={value}
              totalWidth={160}
              totalHeight={30}
              iconSize={25}
              step={1}
              onChange={handleValueChange}
              maxValue={datas.countInStock}
              minValue={1}
              borderColor={Colors.mainLight}
              rounded
              textColor={Colors.black}
              iconStyle={{ color: Colors.white }}
              rightButtonBackgroundColor={Colors.main}
              leftButtonBackgroundColor={Colors.main}
            />
          ) : (
            <Heading bold color={Colors.red} italic fontSize={12}>
              Out of Stock
            </Heading>
          )}

          <Spacer />
          <Heading bold color={Colors.black} fontSize={19}>
            ₦ {datas.price}
          </Heading>
        </HStack>

        <HStack>
          <Text lineHeight={24} fontSize={12}>
            Count in Stock {datas.countInStock}
          </Text>
        </HStack>
        <Buttone
          onPress={addToCartHandler}
          bg={Colors.main}
          color={Colors.white}
          mt={10}
        >
          ADD TO CART
        </Buttone>
        <Reviews />
      </ScrollView>
    </Box>
  );
}

export default SingleProductScreen;
