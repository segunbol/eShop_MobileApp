import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, Center } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Colors from "../color";

import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProflleScreen";
import StackNav from "./StackNav";
import UserNavigator from "./UserNavigator";
import Dashboard from "../Screens/DashBoardScreen";
// import { Tab } from "react-native-tab-view";

const Tab = createBottomTabNavigator();
const CustomTab = ({ children, onPress }) => (
  <Pressable
    onPress={onPress}
    h={70}
    w={70}
    rounded="full"
    bg={Colors.main}
    top={-30}
    shadow={2}
  >
    {children}
  </Pressable>
);

const BottomNav = () => {
  return (
    <Tab.Navigator
      backBehavior="main"
      initialRouteName="Main"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.tab },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Main"
        component={StackNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Entypo name="home" size={24} color={Colors.main} />
              ) : (
                <AntDesign name="home" size={24} color={Colors.black} />
              )}
            </Center>
          ),
        }}
      />
      {/* Cart */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome5
                  name="shopping-basket"
                  size={24}
                  color={Colors.main}
                />
              ) : (
                <MaterialCommunityIcons
                  name="shopping-outline"
                  size={24}
                  color={Colors.black}
                />
              )}
            </Center>
          ),
        }}
      />
      {/* Profile */}
      <Tab.Screen
        name="User Profile"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome name="user" size={24} color={Colors.main} />
              ) : (
                <AntDesign name="user" size={24} color={Colors.black} />
              )}
            </Center>
          ),
        }}
      />
      <Tab.Screen
        name="DashBoard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <MaterialCommunityIcons
                  name="monitor-dashboard"
                  size={24}
                  color={Colors.main}
                />
              ) : (
                <MaterialCommunityIcons
                  name="tablet-dashboard"
                  size={24}
                  color={Colors.black}
                />
              )}
            </Center>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profiled"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome name="user" size={24} color={Colors.main} />
              ) : (
                <AntDesign name="user" size={24} color={Colors.black} />
              )}
            </Center>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    elevation: 0,
    backgroundColor: Colors.white,
    height: 60,
  },
});

export default BottomNav;
