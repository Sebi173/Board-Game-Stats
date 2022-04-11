import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const AppButton = (props) => ( 
        <TouchableOpacity
            style = {{
                //backgroundColor: '#333366',
                backgroundColor: 'rgba(105, 86, 195, 0.6)',
                padding: 10,
                height: 40,
                width: props.width,
                alignItems: 'center'
             }}
            onPress = {props.onPress}>
            <Text 
                style = {{
                    color: 'black'
                }}>
                {props.text} 
            </Text>
        </TouchableOpacity>
    );

export default AppButton;