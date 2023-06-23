import React from "react"
// import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import UserProfile from '../Screens/User/UserProfile'
import ProfileScreen from '../Screens/ProflleScreen'
import LoginScreen from "../Screens/LoginScreen"

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Loginn"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
            name="Profiledd"
            component={ProfileScreen}
            options={{
                headerShown: false
            }}
            />
             <Stack.Screen 
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}