import jwt_decode from "jwt-decode"
import AsyncStorage  from "@react-native-async-storage/async-storage"
import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseUrl"

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const  loginUser = (user, dispatch) => {
    fetch(`${baseURL}users/signin`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then(async (data) => {
        if (data) {
            const token = data.token;
            // console.log(token)
            await AsyncStorage.setItem("jwt", token)
            console.log(token)
            const decoded = jwt_decode(token)
            console.log(decoded)
            dispatch(setCurrentUser(decoded, user))
        } else {
           logoutUser(dispatch)
        }
    })
    .catch((err) => {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please provide correct credentials",
            text2: ""
        });
        logoutUser(dispatch)
    });
};

export const getUserProfile = (_id, user) => {
    fetch(`${baseURL}users/${_id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    console.log(decoded)
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}