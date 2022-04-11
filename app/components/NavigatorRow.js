import React from 'react'
import { Image, StyleSheet,  Text, TouchableOpacity, FlatList, View } from 'react-native';


const NavigatorRow = ({navigation, data}) => {    
    return (
        <FlatList 
            data={data}
            horizontal
            ItemSeparatorComponent={
                () => <View style={{ width: 16}}/>
            }
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <TouchableOpacity 
                    onPress={() => navigation.navigate(item.screen)}
                    style={styles.opacity}>
                    <View style={styles.opacity_inside}>
                        <View>
                            <Image
                                source={{uri: item.image}}
                                style={{width:130, height: 130, resizeMode: 'contain'}}
                            />
                        </View>
                        <View style={{paddingTop: 20}}>
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}       
        />
    );
    
}

export default NavigatorRow

const styles = StyleSheet.create({
    opacity: {
        alignItems: 'center',
        //backgroundColor: '#bdb76b',
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        opacity: 0.7,
        padding: 15,
    },
    opacity_inside: {
        alignItems:'center', 
        justifyContent: 'center'
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});

