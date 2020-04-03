import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import HomeScreenHeader from '../screens/Home/Header';
import PlayerScreen from '../screens/PlayerScreen/PlayerScreen';
import PlayerScreenHeader from '../screens/PlayerScreen/Header';

const Stack = createStackNavigator();

export const HomeStack = () => (
    <Stack.Navigator
        screenOptions={{
            gestureEnabled: false
        }}
    >
        <Stack.Screen options={
            {
                cardStyle: {
                    // backgroundColor: theme.background
                },
                header: ({ navigation }) => <HomeScreenHeader navigation={navigation} />
            }
        }
            name="HomeScreen"
            component={HomeScreen}
        />
    </Stack.Navigator>
)

export const PlayerStack = () => (
    <Stack.Navigator
    >
        <Stack.Screen options={
            {
                cardStyle: {
                    // backgroundColor: theme.background
                },
                header: ({ navigation, scene }) => (<PlayerScreenHeader navigation={navigation} songName="labore et dolore labore et dolore labore et dolore labore et dolore labore et dolore labore et dolore " />),
            }
        }
            name="PlayerScreen"
            component={PlayerScreen}
        />
    </Stack.Navigator>
)