// import {
//   Box,
//   Button,
//   Heading,
//   Image,
//   Input,
//   Pressable,
//   VStack,
// } from "native-base";
// import React, { useContext, useEffect, useState } from "react";
// import { Text, View } from "react-native";
// import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
// import Colors from "../color";
// import { useNavigation } from "@react-navigation/native";
// import AuthGlobal from "../Context/store/AuthGlobal";
// import { loginUser } from "../Context/Actions/Auth.actions";
// import Error from "../Shared/Error"
// import baseURL from "../assets/common/baseUrl";

// function LoginScreen() {
//   const navigation = useNavigation()
//   // const { context } = useContext(AuthGlobal);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(`${baseURL}users/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email,
//           password
//         })
//       });
//       const data = await response.json();
//       navigation.navigate("Profile")
//       // handle successful login
//     } catch (error) {
//       console.log(error);
//       // handle login error
//     }
//   }

  
//   return (
//     <Box flex={1} bg={"#800000"}>
//       <Image
//         flex={1}
//         alt="Logo"
//         resizMode="favicon"
//         size="lg"
//         w="full"
//         source={require("../../Aje/assets/cover4.png")}
//       />
//       <Box
//         w="full"
//         h="full"
//         position="absolute"
//         top="0"
//         px="6"
//         justifyContent="center"
//         bg="pink"
//       >
//         <Heading>LOGIN</Heading>
//         <VStack space={8} pt="6">
//           <Input
//             InputLeftElement={
//               <MaterialIcons name="email" size={24} color="black" />
//             }
//             variant="underlined"
//             placeholder="Enter Email"
//             name={"email"}
//             id={"email"}
//             value ={email}
//             w="70%"
//             color="pink"
//             borderBottomColor="orange"
//             onChangeText={(text) => setEmail(text)}
//           />
//           <Input
//             InputLeftElement={
//               <FontAwesome name="eye" size={24} color="black" />
//             }
//             variant="underlined"
//             type="password"
//             placeholder="*********"
//             w="70%"
//             color="pink"
//             borderBottomColor="orange"
//             value={password}
//             onChangeText={(text) => setPassword(text)}
//           />
//         </VStack>
//         <Button
//           _pressed={{
//             bg: Colors.main,
//           }}
//           my={30}
//           w="40%"
//           rounded={50}
//           bg={Colors.main}
//           onPress={() => handleLogin()}
//         >
//           LOGIN
//         </Button>
//         <Pressable bg={Colors.greyLight} mt={4} onPress={() => navigation.navigate("Register")}>
//           <Text color={Colors.black} size="sm">
//             SIGN UP
//           </Text>
//         </Pressable>
//       </Box>
//     </Box>
//   );
// }

// export default LoginScreen;

import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Pressable,
  VStack,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import AuthGlobal from "../Context/store/AuthGlobal";
import { loginUser } from "../Context/Actions/Auth.actions";
import Error from "../Shared/Error"

const LoginScreen= (props)=> {
  const navigation = useNavigation()
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate("ProfileScreen");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <Box flex={1} bg={"#800000"}>
      <Image
        flex={1}
        alt="Logo"
        resizMode="favicon"
        size="lg"
        w="full"
        source={require("../../Aje/assets/cover4.png")}
      />
      <Box
        w="full"
        h="full"
        position="absolute"
        top="0"
        px="6"
        justifyContent="center"
        bg="pink"
      >
        <Heading>LOGIN</Heading>
        <VStack space={8} pt="6">
          <Input
            InputLeftElement={
              <MaterialIcons name="email" size={24} color="black" />
            }
            variant="underlined"
            placeholder="Enter Email"
            name={"email"}
            id={"email"}
            value ={email}
            w="70%"
            color="pink"
            borderBottomColor="orange"
            onChangeText={(text) => setEmail(text.toLowerCase())}
          />
          <Input
            InputLeftElement={
              <FontAwesome name="eye" size={24} color="black" />
            }
            variant="underlined"
            type="password"
            placeholder="*********"
            w="70%"
            color="pink"
            borderBottomColor="orange"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </VStack>
        <Button
          _pressed={{
            bg: Colors.main,
          }}
          my={30}
          w="40%"
          rounded={50}
          bg={Colors.main}
          onPress={() => handleSubmit()}
        >
          LOGIN
        </Button>
        <Pressable bg={Colors.greyLight} mt={4} onPress={() => navigation.navigate("Register")}>
          <Text color={Colors.black} size="sm">
            SIGN UP
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
}

export default LoginScreen;


// import {
//   Box,
//   Button,
//   Heading,
//   Image,
//   Input,
//   Pressable,
//   VStack,
// } from "native-base";
// import React from "react";
// import { Text, View } from "react-native";
// import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
// import Colors from "../color";

// function LoginScreen(navigation) {
//   return (
//     <Box flex={1} bg={"#800000"}>
//       <Image
//         flex={1}
//         alt="Logo"
//         resizMode="favicon"
//         size="lg"
//         w="full"
//         source={require("../../Aje/assets/cover4.png")}
//       />
//       <Box
//         w="full"
//         h="full"
//         position="absolute"
//         top="0"
//         px="6"
//         justifyContent="center"
//         bg="pink"
//       >
//         <Heading>LOGIN</Heading>
//         <VStack space={8} pt="6">
//           <Input
//             InputLeftElement={
//               <MaterialIcons name="email" size={24} color="black" />
//             }
//             variant="underlined"
//             placeholder="user@gmail.com"
//             w="70%"
//             color="pink"
//             borderBottomColor="orange"
//           />
//           <Input
//             InputLeftElement={
//               <FontAwesome name="eye" size={24} color="black" />
//             }
//             variant="underlined"
//             type="password"
//             placeholder="*********"
//             w="70%"
//             color="pink"
//             borderBottomColor="orange"
//           />
//         </VStack>
//         <Button
//           _pressed={{
//             bg: Colors.main,
//           }}
//           my={30}
//           w="40%"
//           rounded={50}
//           bg={Colors.main}
//           onPress={() => navigation.navigate("Bottom")}
//         >
//           LOGIN
//         </Button>
//         <Pressable mt={4} onPress={() => navigation.navigate("Register")}>
//           <Text color={Colors.black} size="sm">
//             SIGN UP
//           </Text>
//         </Pressable>
//       </Box>
//     </Box>
//   );
// }

// export default LoginScreen;
