import React from 'react';
import {
  StatusBar,
  AppState
} from 'react-native';
import { Provider } from 'react-redux';

import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/components/screens/Home/HomeScreen';
import { ThemeContext, theme } from './src/components/globals/ThemeProvider';

import AsyncStorage from '@react-native-community/async-storage';
import DrawerNavigator from './src/components/navigations/DrawerNavigator';
import * as RNFS from 'react-native-fs';

import { request, PERMISSIONS } from 'react-native-permissions';
import { abs } from 'react-native-reanimated';

import GetMusicDetails from './src/components/commons/GetMusicDetails';
import { updatePlayer, initializePlayer, libraryStatus, UPDATE_LIBRARY } from './src/actions/player';
import BackgroundFetch from 'react-native-background-fetch';
import { loadTracks, sortMusicList } from './src/constants/utils';
import { updateFavourites } from './src/actions/favourites';

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


    BackgroundFetch.configure({
      minimumFetchInterval: 15,
      enableHeadless: true

    }, (taskId) => {
      console.log("BF, ", taskId)
    }, (err) => console.log(err));

    const curTheme = await AsyncStorage.getItem('currentTheme');


    if (!curTheme) {
      console.log("no curTheme");

      const newTheme = this.state.currentTheme;

      AsyncStorage.setItem('currentTheme', JSON.stringify(newTheme));

    } else {
      const value = JSON.parse(curTheme)
      if (value.name !== this.state.currentTheme.name)
        this.setState(() => ({
          currentTheme: value,
        }));
    }

    let favList = await AsyncStorage.getItem('favourites');

    if (favList) {

      favList = JSON.parse(favList); 

      // let updatedFavList = data.musicList.filter((e) => JSON.stringify(favList).includes(e.url));

      // console.log("favList", favList);

      if (favList.length >= 0) {

        App.store.dispatch(updateFavourites(favList));

      }
    }

    let data;

    try {
      console.log("Fetching from Device Storage APP.");

      data = await loadTracks();
      console.log("ERRROr")
      sortMusicList(data.musicList);
      console.log("NOOOOOOO")

      App.store.dispatch({
        type: UPDATE_LIBRARY,
        tracks: data.musicList
      });

      await AsyncStorage.setItem('musicData', JSON.stringify(data));

    } catch (e) {
      App.store.dispatch(libraryStatus(false, e));
    };


    if (favList && data && data.musicList) {

      let updatedFavList = data.musicList.filter((e) => JSON.stringify(favList).includes(e.url));

      if (updatedFavList && JSON.stringify(updateFavourites) === JSON.stringify(favList)) {
        console.log("updatedFavList", updatedFavList);
        App.store.dispatch(updateFavourites(updatedFavList));
      }

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


/*


      <Provider store={App.store}>
        <ThemeContext.Provider value={this.state} >
          <StatusBar backgroundColor={this.state.currentTheme.background} barStyle={this.state.currentTheme.name === "light" ? "dark-content" : "light-content"} />
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </ThemeContext.Provider>
      </Provider>
*/