import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://192.168.0.124:3300/api/v1/")
    : (baseURL = "http://localhost:3300/api/v1/");
}

export default baseURL;
//adb reverse tcp:5500 tcp:5500
// git init
// git add .
// git commit -m "Initial commit"
// git branch -M main
// git remote add origin https://github.com/segunbol/MyEduGang.git
// git push -u origin main


// TODO
// Include Toastify in the app
// On purchase/place order, clear the cart and post the request to Order Model
// Unifyy the Login Screen by adjust navigation
// Post cartItems to cartItems Model, and Get cartItems on clicking cart icon