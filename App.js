import React from 'react';
import {
  View,
  Text,
  StatusBar,
  NativeModules,
  AppState
} from 'react-native';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/components/screens/Home/HomeScreen';
import { ThemeContext, theme } from './src/components/globals/ThemeProvider';

import AsyncStorage from '@react-native-community/async-storage';
import DrawerNavigator from './src/components/navigations/DrawerNavigator';
import * as RNFS from 'react-native-fs';

import { request, PERMISSIONS } from 'react-native-permissions';
import { abs } from 'react-native-reanimated';

import GetMusicDetails from './src/components/commons/GetMusicDetails';
import { updatePlayer, initializePlayer } from './src/actions/player';

const musicLocations = {}
const musicList = [];
let count = 0;

async function scanDir(pathOfDirToScan, data = { musicLocations: [], musicList: [] }) {

  const readedFilesAndDir = await RNFS.readDir(pathOfDirToScan);
  const extensions = "mp3|wav|pcm|aiff|aac|ogg|wma";
  for (let i = 0; i < readedFilesAndDir.length; i++) {
    if (readedFilesAndDir[i].isDirectory()) {
      const directoryPath = pathOfDirToScan + '/' + readedFilesAndDir[i].name;
      data = await scanDir(directoryPath, data);
    } else {
      const name = readedFilesAndDir[i].name;
      const ext = name.split(".").pop();
      if (extensions.includes(ext) && ((readedFilesAndDir[i].size) / 1048576) >= 2) {
        const path = readedFilesAndDir[i].path
        const dir = path.substring(0, (path.lastIndexOf("/") + 1))

        if (data.musicLocations.indexOf(dir) === -1) {
          data.musicLocations.push(dir);
        }

        const { artist, album, cover, duration, title } = await GetMusicDetails.getMetadata(path)
        count += 1;

        const fileDetails = {
          id: String(count),
          title: title,
          url: String(`file://${path}`),
          size: readedFilesAndDir[i].size,
          mtime: readedFilesAndDir[i].mtime,
          dirPath: dir,
          album: album,
          artist: artist,
          duration: duration,
          // cover: cover,
        }
        data.musicList.push(fileDetails)
      }

    }
  }
  return data;
}


class App extends React.Component {

  static store = null;

  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      const newTheme = this.state.currentTheme.name === "light" ? theme.dark : theme.light;
      AsyncStorage.setItem('currentTheme', JSON.stringify(newTheme)).then(() => {
        this.setState({ currentTheme: newTheme });
      });
    }

    this.state = {
      currentTheme: theme.light,
      theme: theme,
      toggleTheme: this.toggleTheme,
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleStateChange);
  }

  _handleStateChange(appState) {
    if (appState == 'active') {
      App.store.dispatch(updatePlayer());
    }
  }

  async componentDidMount() {
    // await AsyncStorage.clear();

    AppState.addEventListener('change', this._handleStateChange)

    const [
      [keyTheme, curTheme],
      [keyMusic, music_items]
    ] = await AsyncStorage.multiGet(['currentTheme', 'musicData']);

    // if (!music_items) {

    //   console.log("no MusicItem")

    //   const musicData = await scanDir(RNFS.ExternalStorageDirectoryPath);

    //   AsyncStorage.setItem('musicData', JSON.stringify(musicData));
    // }

    if (!curTheme) {
      console.log("no curTheme");

      const newTheme = this.state.currentTheme;

      AsyncStorage.setItem(keyTheme, JSON.stringify(newTheme));
    } else {
      const value = JSON.parse(curTheme)
      if (value.name !== this.state.currentTheme.name)
        this.setState(() => ({
          currentTheme: value,
        }));
    }

  }

  render() {
    return (
      <Provider store={App.store}>
        <ThemeContext.Provider value={this.state} >
          <StatusBar backgroundColor={this.state.currentTheme.background} barStyle={this.state.currentTheme.name === "light" ? "dark-content" : "light-content"} />
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </ThemeContext.Provider>
      </Provider>
    );
  }
}


module.exports = function (store) {
  App.store = store;
  return App;
}

export default App;
