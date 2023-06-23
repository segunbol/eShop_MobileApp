import { Box, Button, HStack, Pressable, ScrollView, Text, VStack, View } from "native-base";
import React, { useCallback, useContext, useState } from "react";
import Colors from "../../color";
import AuthGlobal from "../../Context/store/AuthGlobal";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { AsyncStorage, Dimensions, StyleSheet } from "react-native"
import baseURL from "../../assets/common/baseUrl"
import OrderCard from "../../Shared/OrderCard";

var { width } = Dimensions.get("window")

const Orders = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    const [orders, setOrders] = useState()
    console.log(JSON.stringify(context.stateUser.user.sub))
    useFocusEffect(
        useCallback(() => {
        if (
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }
        // 644dac31ebb51d9c0518d150 context.stateUser.user.sub
        AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((user) => setUserProfile(user.data))
            })
            .catch((error) => console.log(error))
            
        axios
        .get(`${baseURL}orders`)
        .then((x) => {
            const data = x.data;
            // console.log(data)
            const userOrders = data.filter(
                (order) => order.user._id === context.stateUser.user.sub
            );
            setOrders(userOrders);
        })
        .catch((error) => console.log(error))

        return () => {
            setUserProfile();
            setOrders();
        }

    }, [context.stateUser.isAuthenticated]))



    return (
        <Box h="full" bg={Colors.white} pt={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable>
                <Box style={styles.order}>
                   <VStack >
                       {orders ? (
                           orders.map((x) => {
                               return <OrderCard key={x.id} {...x} />;
                           })
                       ) : (
                           <View style={styles.order}>
                               <Text>You have no orders</Text>
                           </View>
                       )}
                   </VStack>
               </Box>
            </Pressable>   
        </ScrollView>
        </Box>
    );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            width: width
        },
        subContainer: {
            alignItems: "center",
            marginTop: 60
        },
        order: {
            marginTop: 20,
            alignItems: "center",
            marginBottom: 60
        }
    })
export default Orders;


