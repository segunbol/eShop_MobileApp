import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Colors from "../../color";
// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/Actions/Auth.actions";
import { Store } from "../../Redux/store";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);

  useEffect(() => {
    const userId = context.stateUser.user.userId;
    // console.log(context.stateUser.user)
    if (context.stateUser.isAuthenticated === true) {
      axios
        .get(`${baseURL}cartitems/${userId}`)
        .then((res) => {
          // console.log(`Coming from Login ${JSON.stringify(res.data)}`)
          ctxDispatch({
            type: "RETRIEVE_CART_ITEMS",
            payload: res.data,
          });
        })
        .catch((error) => {
          console.error("Error getting cart items:", error);
        });
      
      props.navigation.navigate("Bottom");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      // console.log(JSON.stringify(context.stateUser))
      // console.log(user)
      loginUser(user, context.dispatch);
    }
  };

  return (
    <FormContainer title={"Login"}>
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: "white" }}>Login</Text>
        </EasyButton>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <EasyButton
          large
          secondary
          onPress={() => props.navigation.navigate("Register")}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </EasyButton>
        <EasyButton
          large
          secondary
          onPress={() => props.navigation.navigate("Bottom")}
        >
          <Text style={{ color: "white" }}>Profile</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default Login;
