import { Box, HStack, Input, Pressable, Text } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function HomeSearch() {
  const navigation = useNavigation()
  return (
    <HStack
      space={3}
      w="full"
      px={6}
      bg={"pink.50"}
      py={4}
      alignItems="center"
      safeAreaTop
    >
      <Input
        placeholder="Food, Sanitory, Addidas ......"
        w="85%"
        bg={"white"}
        type="search"
        h={12}
        borderWidth={0}
        _focus={{ bg: "amber.100" }}
        variant="filled"
      />
      <Pressable ml={3} onPress={() => navigation.navigate("Cart")}>
        <FontAwesome5 name="shopping-basket" size={24} color={"black"} />
        <Box
          px={1}
          rounded="full"
          position="absolute"
          top={-13}
          left={2}
          bg={"red"}
          _text={{
            color: "red",
            fontSize: "11px",
          }}
        >
          {" "}
          5
        </Box>
      </Pressable>
    </HStack>
  );
}

export default HomeSearch;
