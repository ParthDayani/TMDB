import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../Screen/MainScreen';
import Search from '../Screen/Search';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#000', paddingTop: 10 },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'MainScreen') {
            iconName = focused
              ? require('../Assets/s_home.png')
              : require('../Assets/home.png');
          } else if (route.name === 'Search') {
            iconName = focused
              ? require('../Assets/s_search.png')
              : require('../Assets/search.png');
          }
          return <Image source={iconName} style={{ width: 25, height: 25 }} />;
        },
        tabBarActiveTintColor: '#f2c94c',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false, title: '', }} />
      <Tab.Screen name="Search" component={Search} options={{ headerShown: false, title: '', }} />
    </Tab.Navigator>
  );
}
