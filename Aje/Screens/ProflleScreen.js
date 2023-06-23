import { Center, Heading, Image, Text } from "native-base";
import Colors from "../color";
import Tabs from "../Components/Profile/Tabs";
import AuthGlobal from "../Context/store/AuthGlobal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native"
import axios from "axios";
import baseURL from "../assets/common/baseUrl"
import { useCallback, useContext, useState } from "react";
import { getUserProfile } from "../Context/Actions/Auth.actions";

function ProflleScreen(props) {
  const navigation = useNavigation()
  const context = useContext(AuthGlobal)
  const [userProfile, setUserProfile] = useState()
  // console.log(JSON.stringify(context.stateUser.user))

  
  // useFocusEffect(
  //     useCallback(() => {
      
  //     // 644dac31ebb51d9c0518d150 context.stateUser.user.sub
  //     AsyncStorage.getItem("jwt")
  //         .then((res) => {
  //             axios
  //                 .get(`${baseURL}users/${context.stateUser.user.userId}`, {
  //                     headers: { Authorization: `Bearer ${res}` },
  //                 })
  //                 .then((user) => setUserProfile(user.data))
  //         })
  //         .catch((error) => console.log(error))
          
      
  //     return () => {
  //         setUserProfile();
  //     }

  // }, [context.stateUser.isAuthenticated]))
  
  return (
    <>
      <Center bg={Colors.main} pt={10} pb={6}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/zpune/image/upload/v1645429478/random/user_u3itjd.png",
          }}
          alt="profile"
          w={24}
          h={24}
          resizeMode="cover"
        />
        <Heading bold fontSize={15} isTruncated my={2} color={Colors.white}>
         {context.stateUser.user.name}
        </Heading>
        <Text italic fontSize={10} color={Colors.white}>
        {context.stateUser.user.userId}
        </Text>
      </Center>
      {/* Tabs */}
      <Tabs />
    </>
  );
}

export default ProflleScreen;

