import React from "react"
// import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import ProfileScreen from '../Screens/ProflleScreen'


const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen 
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            /> */}
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