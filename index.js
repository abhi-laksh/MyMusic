import 'react-native-gesture-handler';
// const _ = require('lodash');
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import TrackPlayer from 'react-native-track-player';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './src/reducers';

import createEventHandler from './src/constants/event-handlers';
import { loadTracks, sortMusicList } from './src/constants/utils';
import { libraryStatus } from './src/actions/player';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundFetch from 'react-native-background-fetch';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
AppRegistry.registerComponent(appName, () => App(store));
TrackPlayer.registerPlaybackService(() => createEventHandler(store));