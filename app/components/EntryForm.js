import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const EntryForm = ( props ) => ( 
    <TextInput style = {styles.input}
        underlineColorAndroid = "transparent"
        placeholder = {props.placeholder}
        placeholderTextColor = "#001f3f"
        autoCapitalize = "words"
        onChangeText = {props.onChangeText}
    />
);

export default EntryForm;

const styles = StyleSheet.create({
    input: {
       margin: 15,
       height: 40,
       borderColor: '#001f3f',
       borderWidth: 1,
       textAlign: 'center'
    },
 });