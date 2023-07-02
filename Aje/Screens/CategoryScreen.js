import React from "react";
import { Box, Center, FlatList, Image, Pressable, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Colors from "../color";

// Sample data for categories
const categories = [
  {
    id: "1",
    name: "Electronics",
    image: require("../assets/images/Delta.png"),
  },
  {
    id: "2",
    name: "Clothing",
    image: require("../assets/images/Delta.png"),
  },
  // Add more categories here...
];

const CategoryScreen = () => {
  const navigation = useNavigation();

  const handleCategoryPress = (category) => {
    // Navigate to the product listing screen for the selected category
    navigation.navigate("ProductListing", { category });
  };

  const renderCategoryItem = ({ item }) => (
    <Pressable onPress={() => handleCategoryPress(item)}>
      <Box mb={4}>
        <Image
          source={item.image}
          alt={item.name}
          w="100%"
          h={200}
          resizeMode="cover"
          rounded="md"
        />
        <Center bg={Colors.white} p={3} mt={-2} rounded="md">
          <Text fontSize="lg" fontWeight="bold" color={Colors.main}>
            {item.name}
          </Text>
        </Center>
      </Box>
    </Pressable>
  );

  return (
    <Box flex={1} bg={Colors.mainLight} p={4}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default CategoryScreen;