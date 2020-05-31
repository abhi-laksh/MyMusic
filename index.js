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
import { store } from './src/store/configStore';

// const store = createStore(reducers, applyMiddleware(thunkMiddleware));
AppRegistry.registerComponent(appName, () => App(store));
TrackPlayer.registerPlaybackService(() => createEventHandler(store));