import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddNewGameScreen from './app/screens/AddNewGameScreen';
import StatsScreen from './app/screens/StatsScreen';
import AddResultScreen from './app/screens/AddResultScreen';
import AddNewPlayerScreen from './app/screens/AddNewPlayerScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import TestingScreen from './app/screens/TestingScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={WelcomeScreen}
          options={{ headerShown: false, title: 'Board Games Stats' }}
        />
        <Stack.Screen name="AddNewGameScreen" component={AddNewGameScreen} options={{ headerTitleAlign: 'center', headerTransparent: true, title: 'Add Game' }}/>
        <Stack.Screen name="AddResultScreen" component={AddResultScreen} options={{ headerTitleAlign: 'center', headerTransparent: true, title: 'Add Result'}}/>
        <Stack.Screen name="AddNewPlayerScreen" component={AddNewPlayerScreen} options={{ headerTitleAlign: 'center', headerTransparent: true, title: 'Add Player' }}/>
        <Stack.Screen name="StatsScreen" component={StatsScreen} options={{ headerTitleAlign: 'center', headerTransparent: true, title: 'Under Construction' }}/>
        <Stack.Screen name="TestingScreen" component={TestingScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack