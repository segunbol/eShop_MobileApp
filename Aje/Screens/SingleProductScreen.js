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
import { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { connect } from 'react-redux';
import { Path, Svg } from "react-native-svg";
import AuthGlobal from "../Context/store/AuthGlobal";
import * as actions from "../Redux/Actions/cartActions";


function SingleProductScreen(props) {
  const route = useRoute();
  const [datas, setDatas] = useState(route.params.datas);
  const context = useContext(AuthGlobal)


  
  const handleOnPress = () => {
    if (context.stateUser.isAuthenticated === true) {
      () => {props.addItemToCart(props)};
      
    } else {
      navigation.navigate("User Profile")
    }
  }
  
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
    } return () => {
      setDatas([])
    }
  }, []);


  // const route = useRoute()
  // const [datas, setData] = useState(route.params.data)
  // const { datas } = route.params;
  const [value, setValue] = useState(0);
  const navigation = useNavigation();
 
  const handleValueChange = (newValue) => {
    setValue(newValue);}
  // const data = route.params
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
              totalWidth={140}
              totalHeight={30}
              iconSize={25}
              step={1}
              onChange={handleValueChange}
              maxValue={8}
              minValue={0}
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
            {datas.description}
          </Text>
        </HStack>
        <Buttone
          onPress={ () => {props.addItemToCart(props)} }
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

const mapToDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product) => 
          dispatch(actions.addToCart({quantity: 1, product}))
  }
} 


export default connect(null, mapToDispatchToProps)(SingleProductScreen);