import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from '../Screen/MainScreen';
import TabNavigator from './TabNavigator'
import Search from '../Screen/Search';
import Details from '../Screen/Details';

const Stack = createNativeStackNavigator();


const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTitleStyle: {
                    color: 'white',
                },
                headerTintColor: 'white',
            }}>
                <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="MainScreen" component={MainScreen} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Details" component={Details} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation