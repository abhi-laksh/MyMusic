import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/Home/HomeScreen';
import HomeScreenHeader from '../screens/Home/Header';
import PlayerScreen from '../screens/Player/PlayerScreen';
import PlayerScreenHeader from '../screens/Player/Header';
import {
    HomeStack,
    PlayerStack,
    PlaylistStack,
    FavouriteStack,
    LyricsStack,
    SettingStack,
    SongInfoStack,
    SearchStack
} from './StackNavigator';
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
                name="SongInfo"
                component={SongInfoStack}
                options={{
                    // gestureEnabled: false,
                }}
            />
            <Drawer.Screen
                name="Lyrics"
                component={LyricsStack}
                options={{
                    // gestureEnabled: false,
                }}
            />
            <Drawer.Screen
                name="Search"
                component={SearchStack}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Drawer.Screen
                name="Setting"
                component={SettingStack}
                options={{
                    // gestureEnabled: false,
                }}
            />
            <Drawer.Screen
                name="Playlist"
                component={PlaylistStack}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Drawer.Screen
                name="Favourites"
                component={FavouriteStack}
                options={{
                    gestureEnabled: false,
                }}
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

export default withTheme(MyDrawer);