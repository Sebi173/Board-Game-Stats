import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import AddGame from '../components/AddGame.js'

function AddNewGameScreen() {
    return (
        <ImageBackground style={styles.image_background} source={{uri: 'https://cdn.wallpapersafari.com/78/91/aPClZg.jpg'}}>
            <AddGame />  
        </ImageBackground> 
    );
    
};

export default AddNewGameScreen;

const styles = StyleSheet.create({
    image_background: {
        paddingTop: '25%',
        flex:1
    },
})
