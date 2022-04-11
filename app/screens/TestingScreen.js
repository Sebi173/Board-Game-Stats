import React from 'react';
import { AspectRatio, Body, Box, Button, NativeBaseProvider, Text, Title } from 'native-base';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import firestore from '../../firebase';


const TestingScreen = () => {

    return (
        <NativeBaseProvider>
            <Box
                px="3"
                py="2"
                mb={["4","5"]}
                bg="primary.400"
                rounded="lg">
                <Text fontWeight="medium" color="white" fontSize="sm" onPress={() => console.log('Supp')}>
                Hey There!
                </Text>
            </Box>
        </NativeBaseProvider>
      );
}


export default TestingScreen;

