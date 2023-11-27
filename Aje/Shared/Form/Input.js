import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../../color';

const Input = (props) => {
    return (
        <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        >
        </TextInput>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: 60,
        backgroundColor: Colors.white,
        margin: 10,
        borderRadius: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.main
    },
});

export default Input;