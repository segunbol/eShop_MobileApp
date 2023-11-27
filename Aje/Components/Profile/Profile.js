import axios from 'axios';
import React, { useCallback, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthGlobal from '../../Context/store/AuthGlobal';
import  AsyncStorage  from "@react-native-async-storage/async-storage"
import { logoutUser } from "../../Context/Actions/Auth.actions"
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import baseURL from '../../assets/common/baseUrl';
import { Button } from 'native-base';
import Buttone from '../Buttone';
import Colors from '../../color';

const Profile = (props) => {
  const navigation = useNavigation()
  const context = useContext(AuthGlobal)
  const [userProfile, setUserProfile] = useState()

  // useFocusEffect(
  //     useCallback(() => {
  //     if (
  //         context.stateUser.isAuthenticated === false || 
  //         context.stateUser.isAuthenticated === null
  //     ) {
  //         navigation.navigate("Login")
  //     }else {
  //       navigation.navigate("Profiledd")
  //     }
 

  // }, [context.stateUser.isAuthenticated]))

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.value}>{context.stateUser.user.email}</Text>
        <Text style={styles.title}>Phone:</Text>
        <Text style={styles.value}> {context.stateUser.user.phone}</Text>
        <Text style={styles.title}>City:</Text>
        <Text style={styles.value}> {context.stateUser.user.city}</Text>
        <Text style={styles.title}>Country:</Text>
        <Text style={styles.value}> {context.stateUser.user.country}</Text>
      </View>
      <View style={styles.buttonContainer} >
                  <Button 
                  justifyContent= {"center"}
                  bg={Colors.main}
                  _pressed={{ bg: Colors.orange }}
                  _text={{ color: Colors.white }}
                  title={"Sign Out"} onPress={() => [
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)]}
                >
                  Log Out
                </Button>
               </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  header: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    alignSelf: 'stretch',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 80,
    alignItems: 'center',
    width: 150,
  },
});

export default Profile;
