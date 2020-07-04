import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    HomeStack,
    PlayerStack,
    PlaylistStack,
    FavouriteStack,
    LyricsStack,
    SongInfoStack,
    SearchStack
} from './StackNavigator';
import { withTheme } from '../globals/ThemeProvider';
import MyDrawerContent from './MyDrawerContent';
import FontelloIcon from '../commons/FontelloIcon';

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
                    gestureEnabled: false,
                }}
            />
            <Drawer.Screen
                name="Lyrics"
                component={LyricsStack}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Drawer.Screen
                name="SongInfo"
                component={SongInfoStack}
                options={{
                    gestureEnabled: false,
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
        </Drawer.Navigator>
    );
}

export default withTheme(MyDrawer);