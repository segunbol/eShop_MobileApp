import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, StatusBar } from "native-base";

// Screen
import LoginScreen from "./Screens/LoginScreen";
import OrderScreen from "./Screens/OrderScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import BottomNav from "./Navigations/BottomNav";
import HomeScreen from "./Screens/HomeScreen";

//Redux
import { Provider } from "react-redux";
// Context API
import Auth from "./Context/store/Auth";
import store from "./Redux/store";
import Login from "./Screens/User/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer>
            <StatusBar hidden={true} />
            <Stack.Navigator
              initialRouteName="Bottom"
              screenOptions={{
                headerShown: false,
              }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Order" component={OrderScreen} />
                <Stack.Screen name="Bottom" component={BottomNav} />
              </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
        
    </Auth>
    
  );
}
