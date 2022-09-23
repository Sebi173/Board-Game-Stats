import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import DropdownGames from '../components/functionality/DropdownGames';

function AddResultScreen() {
    return (
        <ImageBackground style={styles.image_background} source={{uri: 'https://cdn.wallpapersafari.com/78/91/aPClZg.jpg'}}>
            <DropdownGames />
        </ImageBackground>
    );
};

export default AddResultScreen;

const styles = StyleSheet.create({
    image_background: {
        paddingTop: '25%',
        flex:1
    },
})
