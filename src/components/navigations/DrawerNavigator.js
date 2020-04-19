import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/Home/HomeScreen';
import HomeScreenHeader from '../screens/Home/Header';
import PlayerScreen from '../screens/PlayerScreen/PlayerScreen';
import PlayerScreenHeader from '../screens/PlayerScreen/Header';
import { HomeStack, PlayerStack } from './StackNavigator';
import { withTheme } from '../globals/ThemeProvider';
import MyDrawerContent from './MyDrawerContent';

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
    const { theme, currentTheme } = props
    return (
        <Drawer.Navigator
            drawerContent={(props) => <MyDrawerContent {...props} />}
            drawerStyle={{
                // backgroundColor: currentTheme.background
                width: "85%",

                borderTopRightRadius: 96,
                borderBottomRightRadius: 96,
            }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeStack}
            />
            <Drawer.Screen
                name="Player"
                component={PlayerStack}
                options={{
                    // gestureEnabled: false,

                }}


            />
        </Drawer.Navigator>
    );
}

export default withTheme(MyDrawer);