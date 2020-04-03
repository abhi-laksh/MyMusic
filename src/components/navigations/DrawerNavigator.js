import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/Home/HomeScreen';
import HomeScreenHeader from '../screens/Home/Header';
import PlayerScreen from '../screens/PlayerScreen/PlayerScreen';
import PlayerScreenHeader from '../screens/PlayerScreen/Header';
import { HomeStack, PlayerStack } from './StackNavigator';

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
    const { theme } = props
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Home"
                component={HomeStack}
            />
            <Drawer.Screen
                name="Player"
                component={PlayerStack}
                options={{
                    gestureEnabled: false,
                }}
            />
        </Drawer.Navigator>
    );
}

export default MyDrawer;