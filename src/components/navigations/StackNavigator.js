import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home/HomeScreen';
import HomeScreenHeader from '../screens/Home/Header';

import PlayerScreen from '../screens/Player/PlayerScreen';
import PlayerScreenHeader from '../screens/Player/Header';

import FavouritesScreen from '../screens/Favourites/FavouritesScreen';
import FavouritesScreenHeader from '../screens/Favourites/Header';

import PlaylistScreen from '../screens/Playlist/PlaylistScreen';
import PlaylistTracksScreen from '../screens/Playlist/PlaylistTracksScreen';
import PlaylistScreenHeader from '../screens/Playlist/Header';
import PlaylistEditScreen from '../screens/Playlist/PlaylistEditScreen';

import LyricsScreen from '../screens/Lyrics/LyricsScreen'; 
import LyricsEditScreen from '../screens/Lyrics/LyricsEditScreen';
import LyricsAddScreen from '../screens/Lyrics/LyricsAddScreen';


import SearchScreen from '../screens/Search/SearchScreen';
import SearchScreenHeader from '../screens/Search/Header';

import SongInfoScreen from '../screens/SongInfo/SongInfoScreen';
import SongInfoEditScreen from '../screens/SongInfo/SongInfoEditScreen';
import SongInfoScreenHeader from '../screens/SongInfo/Header';

const Stack = createStackNavigator();
export const HomeStack = () => (
    <Stack.Navigator
    >
        <Stack.Screen options={
            {
                header: (props) => <HomeScreenHeader {...props} />
            }
        }
            name="HomeScreen"
            component={HomeScreen}
        />
    </Stack.Navigator>
)

export const PlaylistStack = () => (
    <Stack.Navigator
    >
        <Stack.Screen options={
            {
                header: ({ navigation, ...props }) => <PlaylistScreenHeader navigation={navigation} {...props} />
            }
        }
            name="PlaylistScreen"
            component={PlaylistScreen}
        />
        <Stack.Screen options={
            {
                header: ({ navigation, ...props }) => <PlaylistScreenHeader navigation={navigation} {...props} />
            }
        }
            name="PlaylistTracksScreen"
            component={PlaylistTracksScreen}
        />
        <Stack.Screen options={
            {
                header: ({ navigation, ...props }) => <PlaylistScreenHeader navigation={navigation} {...props} />
            }
        }
            name="PlaylistEditScreen"
            component={PlaylistEditScreen}
        />
    </Stack.Navigator>
)



export const FavouriteStack = () => (
    <Stack.Navigator
    >
        <Stack.Screen options={
            {
                header: ({ navigation, ...props }) => <FavouritesScreenHeader navigation={navigation} {...props} />
            }
        }
            name="FavouritesScreen"
            component={FavouritesScreen}
        />
    </Stack.Navigator>
)

export const PlayerStack = () => (
    <Stack.Navigator
    >
        <Stack.Screen options={
            {
                header: ({ navigation, scene }) => (<PlayerScreenHeader navigation={navigation} songName="labore et dolore labore et dolore labore et dolore labore et dolore labore et dolore labore et dolore " />),
            }
        }
            name="PlayerScreen"
            component={PlayerScreen}
        />
    </Stack.Navigator>
)

export const LyricsStack = () => (
    <Stack.Navigator
    >
        <Stack.Screen options={
            {
                header: ({ navigation, scene }) => (<PlayerScreenHeader navigation={navigation} songName="labore et dolore labore et dolore labore et dolore labore et dolore labore et dolore labore et dolore " />),
            }
        }
            name="LyricsScreen"
            component={LyricsScreen}
        />
        <Stack.Screen options={
            {
                header: ({ navigation, scene }) => (<PlayerScreenHeader navigation={navigation} songName="labore et dolore labore et dolore labore et dolore labore et dolore labore et dolore labore et dolore " />),
            }
        }
            name="LyricsEditScreen"
            component={LyricsEditScreen}
        />
        <Stack.Screen options={
            {
                header: ({ navigation, scene }) => (<PlayerScreenHeader navigation={navigation} songName="labore et dolore labore et dolore labore et dolore labore et dolore labore et dolore labore et dolore " />),
            }
        }
            name="LyricsAddScreen"
            component={LyricsAddScreen}
        />
    </Stack.Navigator>
)


export const SongInfoStack = () => (
    <Stack.Navigator
    >
        <Stack.Screen options={
            {
                header: (props) => (<SongInfoScreenHeader {...props} />),
                title: "Song Info",
            }
        }
            name="SongInfoScreen"
            component={SongInfoScreen}
        />
        <Stack.Screen options={
            {
                title: "Edit Song Info",
                header: (props) => (<SongInfoScreenHeader {...props} />),
            }
        }
            name="SongInfoEditScreen"
            component={SongInfoEditScreen}
        />
    </Stack.Navigator>
)


export const SearchStack = () => (
    <Stack.Navigator
    >
        <Stack.Screen options={
            {
                header: () => (null),
            }
        }
            name="SearchScreen"
            component={SearchScreen}
        />
    </Stack.Navigator>
)
