import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Linking,
} from 'react-native';
import {
    SafeAreaView,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

const Sidebar = (props) => {
    const BASE_PATH =
        'https://www.nicesnippets.com/image/nice-logo.png';

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ marginTop: 40, }}>
                <Image
                    source={{ uri: BASE_PATH }}
                    style={styles.sideMenuProfileIcon}
                />
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}  />
                <DrawerItem
                    label="Visit Us"
                    onPress={() => Linking.openURL('https://www.nicesnippets.com/')}
                />
                <View style={styles.customItem}>
                    <Text
                        onPress={() => {
                            Linking.openURL('https://www.nicesnippets.com/');
                        }}
                    >
                        Rate Us
                    </Text>
                </View>
            </DrawerContentScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'contain',
        width: '95%',
        height: 60,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Sidebar;

// import React from "react";
// import { View, StyleSheet, Image, Text, Linking } from "react-native";
// import {
//   SafeAreaView,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
//   createDrawerNavigator,
// } from "@react-navigation/drawer";
// import Colors from "../color";
// import BottomNav from "./BottomNav";

// const Drawer = createDrawerNavigator();

// const Sidebar = (props) => {
//   return (
//     <View style={{ flex: 1, backgroundColour: Colors.mainLight }}>
//       <Drawer.Navigator
//       drawerType="slide"
//       overlayColor="transparent"
//       drawerStyle={{
//         flex:1,
//         width: '40%',
//         paddingRight: 20,
//         backgroundColour: "transparent"
//       }}
//       sceneContainerStyle={{
//         backgroundColour: "transparent"
//       }}
//       initialRouteName="Bottom"
//       >
//         <Drawer.Screen name="Bottom">
//             {props => <BottomNav {...props}/>}
//         </Drawer.Screen>
//       </Drawer.Navigator>
      
//     </View>
//   );
// };
