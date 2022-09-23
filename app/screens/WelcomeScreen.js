import * as React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import NavigatorRow from '../components/NavigatorRow.js';

// data is used for the 4 options shown on the Welcome Screen
const data = [{
    id: 1,
    title: 'Report Result',
    image: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/452/external-first-place-online-education-flaticons-lineal-color-flat-icons.png',
    screen: 'AddResultScreen'
},
{
    id: 2,
    title: 'See Stats',
    image: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/452/external-stats-business-flaticons-lineal-color-flat-icons-2.png',
    screen: 'StatsScreen'
},
{
    id: 3,
    title: 'Add Game',
    image: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/452/external-board-game-game-design-flaticons-lineal-color-flat-icons.png',
    screen: 'AddNewGameScreen'
},
{
    id: 4,
    title: 'Add Player',
    image: 'https://img.icons8.com/external-flaticons-flat-flat-icons/452/external-adventurer-archaeology-flaticons-flat-flat-icons-2.png',
    screen: 'AddNewPlayerScreen'
},
]

const WelcomeScreen = ({ navigation }) => {

    return (
        <ImageBackground style={styles.container} source={{ uri: 'https://cdn.wallpapersafari.com/78/91/aPClZg.jpg' }}>
            <View style={styles.navigator_top}>
                <NavigatorRow
                    data={data.slice(0, 2)}
                    navigation={navigation}
                />
            </View>
            <View style={styles.navigator_buttom}>
                <NavigatorRow
                    data={data.slice(2, 4)}
                    navigation={navigation}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        flex: 1,
        paddingTop: 60
    },
    navigator_top: {
        height: '33%',
        paddingTop: '5%',
        paddingRight: '7%',
    },
    navigator_buttom: {
        height: '33%',
        paddingTop: '5%',
        paddingRight: '7%',
    },
    opacity: {
        alignItems: 'center',
        backgroundColor: '#bdb76b',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 10,
        width: 150
    }
})

export default WelcomeScreen;