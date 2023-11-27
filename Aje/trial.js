// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NativeBaseProvider, StatusBar } from "native-base";

// // Screen
// import OrderScreen from "./Screens/OrderScreen";
// import BottomNav from "./Navigations/BottomNav";
// import HomeScreen from "./Screens/HomeScreen";

// //Redux
// import { Provider } from "react-redux";
// // Context API
// import Auth from "./Context/store/Auth";
// import store, { StoreProvider } from "./Redux/store";
// import Login from "./Screens/User/Login";
// import Register from "./Screens/User/Register";
// import { useState } from "react";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <Auth>
//       <StoreProvider>
//         <NativeBaseProvider>
//           <NavigationContainer>
//             <StatusBar hidden={true} />
//             <Stack.Navigator
//               initialRouteName="Bottom"
//               screenOptions={{
//                 headerShown: false,
//               }}>
//                 <Stack.Screen name="Login" component={Login} />
//                 <Stack.Screen name="Register" component={Register} />
//                 <Stack.Screen name="Order" component={OrderScreen} />
//                 <Stack.Screen name="Bottom" component={BottomNav} />
//                 <Stack.Screen name="Sidebar" component={Sidebar} />
//               </Stack.Navigator>
//           </NavigationContainer>
//         </NativeBaseProvider>
//       </StoreProvider>

//     </Auth>

//   );
// }

// import React, { useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";

// import { NativeBaseProvider, StatusBar } from "native-base";
// import { Provider } from "react-redux";
// import Auth from "./Context/store/Auth";
// import store, { StoreProvider } from "./Redux/store";
// import { View } from "react-native";
// import Sidebar from "./Components/SideBar"; // Import the Sidebar component

// // Screen
// import OrderScreen from "./Screens/OrderScreen";
// import BottomNav from "./Navigations/BottomNav";
// import HomeScreen from "./Screens/HomeScreen";
// import Login from "./Screens/User/Login";
// import Register from "./Screens/User/Register";

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// export default function App() {
//   const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

//   return (
//     <Auth>
//       <StoreProvider>
//         <NativeBaseProvider>
//           <NavigationContainer>
//             <StatusBar hidden={true} />

//             {/* Main content */}
//             <Drawer.Navigator
//               initialRouteName="Main"
//               screenOptions={{
//                 headerShown: false,
//                 drawerStyle: {
//                   backgroundColor: "transparent", // Set the background color of the sidebar to be transparent
//                 },
//               }}
//               drawerContent={(props) => (
//                 <View style={{ flex: 1 }}>
//                   <Sidebar />
//                 </View>
//               )}
//             >
//               <Drawer.Screen name="Main" component={MainContent} />
//             </Drawer.Navigator>
//           </NavigationContainer>
//         </NativeBaseProvider>
//       </StoreProvider>
//     </Auth>
//   );
// }

// // Define your main content here (BottomNav in this case)
// function MainContent() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Bottom"
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Register" component={Register} />
//       <Stack.Screen name="Order" component={OrderScreen} />
//       <Stack.Screen name="Bottom" component={BottomNav} />
//     </Stack.Navigator>
//   );
// }

// import "react-native-gesture-handler";

// import * as React from "react";
// import { View, TouchableOpacity, Image } from "react-native";

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";

// import FirstPage from "./pages/FirstPage";
// import SecondPage from "./pages/SecondPage";
// import ThirdPage from "./pages/ThirdPage";

// // Import Custom Sidebar
// import CustomSidebarMenu from "./CustomSidebarMenu";

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const NavigationDrawerStructure = (props) => {

//   //Structure for the navigatin Drawer
//   const toggleDrawer = () => {
//     //Props to open/close the drawer
//     props.navigationProps.toggleDrawer();
//   };

//   return (
//     <View style={{ flexDirection: 'row' }}>
//       <TouchableOpacity onPress={toggleDrawer}>
//         {/*Donute Button Image */}
//         <Image
//           source={{
//             uri:
//               'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
//           }}
//           style={{ width: 25, height: 25, marginLeft: 5 }}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// function firstScreenStack({ navigation }) {
//   return (
//     <Stack.Navigator initialRouteName="FirstPage">
//       <Stack.Screen
//         name="FirstPage"
//         component={FirstPage}
//         options={{
//           title: 'First Page', //Set Header Title
//           headerLeft: () => (
//             <NavigationDrawerStructure navigationProps={navigation} />
//           ),
//           headerStyle: {
//             backgroundColor: '#f4511e', //Set Header color
//           },
//           headerTintColor: '#fff', //Set Header text color
//           headerTitleStyle: {
//             fontWeight: 'bold', //Set Header text style
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// function secondScreenStack({ navigation }) {
//   return (
//     <Stack.Navigator
//       initialRouteName="SecondPage"
//       screenOptions={{
//         headerLeft: () => (
//           <NavigationDrawerStructure navigationProps={navigation} />
//         ),
//         headerStyle: {
//           backgroundColor: '#f4511e', //Set Header color
//         },
//         headerTintColor: '#fff', //Set Header text color
//         headerTitleStyle: {
//           fontWeight: 'bold', //Set Header text style
//         },
//       }}>
//       <Stack.Screen
//         name="SecondPage"
//         component={SecondPage}
//         options={{
//           title: 'Second Page', //Set Header Title
//         }}
//       />
//       <Stack.Screen
//         name="ThirdPage"
//         component={ThirdPage}
//         options={{
//           title: 'Third Page', //Set Header Title
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         drawerContentOptions={{
//           activeTintColor: '#e91e63',
//           itemStyle: { marginVertical: 5 },
//         }}
//         drawerContent={(props) => <CustomSidebarMenu {...props} />}>
//         <Drawer.Screen
//           name="FirstPage"
//           options={{ drawerLabel: 'First page Option' }}
//           component={firstScreenStack}
//         />
//         <Drawer.Screen
//           name="SecondPage"
//           options={{ drawerLabel: 'Second page Option' }}
//           component={secondScreenStack}
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

// import React from "react";
// import { View, StyleSheet, Image, Text, Linking } from "react-native";
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from "@react-navigation/drawer";

// const CustomSidebarMenu = (props) => {
//   const BASE_PATH = "https://www.nicesnippets.com/image/nice-logo.png";

//   return (
//     <View style={styles.container}>
//       <View style={styles.profileIconContainer}>
//         <Image source={{ uri: BASE_PATH }} style={styles.sideMenuProfileIcon} />
//       </View>
//       <DrawerContentScrollView {...props}>
//         <DrawerItemList {...props} />
//         <DrawerItem
//           label="Visit Us"
//           onPress={() => Linking.openURL("https://www.nicesnippets.com/")}
//         />
//         <View style={styles.customItem}>
//           <Text
//             onPress={() => {
//               Linking.openURL("https://www.nicesnippets.com/");
//             }}
//           >
//             Rate Us
//           </Text>
//         </View>
//       </DrawerContentScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     backgroundColor: "#fff",
//   },
//   profileIconContainer: {
//     marginTop: 40,
//     alignItems: "center",
//   },
//   sideMenuProfileIcon: {
//     resizeMode: "contain",
//     width: "95%",
//     height: 60,
//   },
//   customItem: {
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//   },
// });

// export default CustomSidebarMenu;

import React, { useState, useEffect, useReducer } from 'react';
import { ScrollView, Pressable, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Flex, Box, Heading, Text } from 'native-base'; // Replace with your UI library components
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';
import Colors from '../color';
import Rating from '../Components/Rating'; // Make sure to import your Rating component

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route)
  const [isLoading, setIsLoading] = useState(false);
  const { category, query, price, rating, order, page } = route.params;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${baseURL}products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  return (
    <ScrollView>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        color={Colors.main}
        size={'large'}
        overlayStyle={{ backgroundColor: 'black', opacity: 0.5 }}
      />
      <Flex
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="space-between"
        paddingX={6}
      >
        {products.map((data) => (
          <Pressable
            onPress={() => navigation.navigate('Single', { data: data })}
            key={data._id}
            style={{
              width: '47%',
              backgroundColor: 'white',
              borderRadius: 8,
              shadowOpacity: 0.2,
              shadowRadius: 2,
              paddingTop: 0.3,
              marginTop: 3,
              paddingBottom: 2,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: data.image }}
              alt={data.name}
              style={{ width: '100%', height: 120 }}
              resizeMode="contain"
            />
            <Box paddingX={4} paddingTop={1}>
              <Heading size="sm" bold>
                ₦{data.price}
              </Heading>
              <Text fontSize={10} marginTop={1} numberOfLines={2}>
                {data.name}
              </Text>
              <Rating value={data.rating} />
            </Box>
          </Pressable>
        ))}
      </Flex>
    </ScrollView>
  );
};

export default SearchScreen;