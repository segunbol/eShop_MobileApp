import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://192.168.210.52:3000/api/v1/")
    : (baseURL = "http://localhost:5500/api/v1/");
}

export default baseURL;
//adb reverse tcp:5500 tcp:5500
// git init
// git add .
// git commit -m "Initial commit"
// git branch -M main
// git remote add origin https://github.com/segunbol/MyEduGang.git
// git push -u origin main
