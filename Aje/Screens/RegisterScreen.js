import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Pressable,
  VStack,
} from "native-base";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";

function RegisterScreen() {
  const navigation = useNavigation()
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
        <Heading>SIGN UP</Heading>
        <VStack space={8} pt="6">
          {/* USERNAME */}
          <Input
            InputLeftElement={
              <FontAwesome name="user" size={24} color="black" />
            }
            variant="underlined"
            placeholder="Username"
            type="text"
            w="70%"
            color="pink"
            borderBottomColor="orange"
          />
          {/* FIRSTNAME */}
          <Input
            InputLeftElement={
              <FontAwesome name="user" size={24} color="black" />
            }
            variant="underlined"
            placeholder="First Name"
            type="text"
            w="70%"
            color="pink"
            borderBottomColor="orange"
          />
          {/* LASTNAME */}
          <Input
            InputLeftElement={
              <FontAwesome name="user" size={24} color="black" />
            }
            variant="underlined"
            placeholder="Last Name"
            type="text"
            w="70%"
            color="pink"
            borderBottomColor="orange"
          />
          {/* EMAIL */}
          <Input
            InputLeftElement={
              <MaterialIcons name="email" size={24} color="black" />
            }
            variant="underlined"
            placeholder="user@gmail.com"
            w="70%"
            color="pink"
            borderBottomColor="orange"
          />
          {/* PASSWORD */}
          <Input
            InputLeftElement={
              <FontAwesome name="eye" size={24} color="black" />
            }
            variant="underlined"
            type="password"
            placeholder="Enter Password"
            w="70%"
            color="pink"
            borderBottomColor="orange"/>
          {/* REENTER PASSWORD */}
          <Input
            InputLeftElement={
              <FontAwesome name="eye" size={24} color="black" />
            }
            variant="underlined"
            type="password"
            placeholder="Reenter Password"
            w="70%"
            color="pink"
            borderBottomColor="orange"
          />
        </VStack>
        <Button
          _pressed={{
            bg: "white",
          }}
          my={30}
          w="40%"
          rounded={50}
          bg={Colors.main}
          onPress={() => navigation.navigate("Bottom")}
        >
          SIGN UP
        </Button>
        <Pressable mt={4} onPress={() => navigation.navigate("Login")}>
          <Text color="black" size="sm">
            LOGIN
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
}

export default RegisterScreen;
