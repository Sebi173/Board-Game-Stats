import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import AddPlayer from '../components/functionality/AddPlayer.js'

const AddNewPlayerScreen = (props) => {
    return (
        <ImageBackground style={styles.image_background} source={{uri: 'https://cdn.wallpapersafari.com/78/91/aPClZg.jpg'}}>
            <AddPlayer />   
        </ImageBackground>
    );
    
};

export default AddNewPlayerScreen;

const styles = StyleSheet.create({
    image_background: {
        paddingTop: '25%',
        flex:1
    },
})
