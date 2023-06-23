import { Box, Button, Center, Image, Text, VStack } from 'native-base'
import React from 'react'
import Buttone from '../Components/Buttone'


function NotVerifyScreen() {
  return (
    <Box flex={1} bg={"pink.100"} safeAreaTop>
        <Center w="full" h={250}>
          <Image
            source={require("../assets/favicon.png")}
            alt="Logo"
            size="lg"
            />
        </Center>
        <VStack space={6} px={5} alignItems="center">
          <Buttone bg={"black"} color={"white"}>REGISTER</Buttone>
          <Buttone bg={"white"} color={"black"}>LOGIN</Buttone>
        </VStack>
    </Box>
      
  )
}

export default NotVerifyScreen
