import {
  Box,
  FormControl,
  Heading,
  Select,
  TextArea,
  VStack,
  Text,
  CheckIcon
} from "native-base";
import React, { useState } from "react";
import Colors from "../color";
import Buttone from "./Buttone";
import Message from "./Message";
import Rating from "./Rating";

export default function Reviews() {
  const [ratings, setRatings] = useState("");
  return (
    <Box my={9}>
      <Heading bold fontSize={15} mb={2}>
        REVIEW
      </Heading>
      {/* IF THERE IS NO REVIEW */}
      <Message
        color={Colors.main}
        bg={Colors.mainLight}
        size={10}
        bold
        children={"No Reviews"}
      />
      {/*  REVIEW */}
      <Box p={3} bg={Colors.mainLight} mt={5} rounded={5}>
        <Heading fontSize={15} color={Colors.black}>
          User Doe
        </Heading>
        <Rating value={4} />
        <Text my={2} fontSize={11}>
          Jan 12 2022
        </Text>
        <Message
          color={Colors.black}
          bg={Colors.white}
          size={10}
          children={
            "He That is down needs fear no fall ... he that is low no pride"
          }
        />
      </Box>
      {/* WRITE REVIEW */}
      <Box mt={6}>
        <Heading fontSize={15} bold mb={4}>
          REVIEW THIS PRODUCT
        </Heading>
        <VStack space={6}>
          <FormControl>
            <FormControl.Label 
            _text={{ fontSize: "12px", fontWeight: "bold"
             }}> Rating
            </FormControl.Label>
            <Select
              bg={Colors.mainLight}
              borderWidth={0}
              rounded={5}
              py={3}
              placeholder="Choose Rate"
              _selectedItem={{
                bg: Colors.main,
                endIcon: <CheckIcon size={3} /> 
              }}
              value={ratings}
              onValueChange={(e) => setRatings(e)}
            >
              <Select.Item label="1 - Poor" value="1" />
              <Select.Item label="2 - Fair" value="2" />
              <Select.Item label="3 - Good" value="3" />
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label _text={{ fontSize: "12px", fontWeight: "bold" }}>
              Comment
            </FormControl.Label>
            <TextArea
              h={24}
              w="full"
              placeholder="Write a comment"
              borderWidth={0}
              bg={"green"}
              py={2}
              _focus={{ bg: Colors.mainLight }}
            />
          </FormControl>
          <Buttone bg={Colors.main} color={Colors.white} onPress={() => navigation.navigate("Login")}>
            SUBMIT
          </Buttone>
            
          <Message
            onPress={() => navigation.navigate("Login")}
            bg={Colors.black}
            color={Colors.white}
            children={"Please, 'Login' to review"}
          />
        </VStack>
      </Box>
    </Box>
  );
}
