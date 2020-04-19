import React from 'react';
import {
	StatusBar,
	AppState,
	View,
	Text
} from 'react-native';

import { Provider } from 'react-redux';

import { NavigationContainer, } from '@react-navigation/native';

import { ThemeContext, theme } from './src/components/globals/ThemeProvider';

import AsyncStorage from '@react-native-community/async-storage';
import DrawerNavigator from './src/components/navigations/DrawerNavigator';
import * as RNFS from 'react-native-fs';
import * as Animatable from 'react-native-animatable';

import { request, PERMISSIONS } from 'react-native-permissions';

import { updatePlayer, initializePlayer, libraryStatus, UPDATE_LIBRARY, updateLibrary, playerTrack, } from './src/actions/player';
import BackgroundFetch from 'react-native-background-fetch';
import { loadTracks, sortMusicList } from './src/constants/utils';
import { updateFavourites } from './src/actions/favourites';
import { updateQueue, addToQueue } from './src/actions/queue';
import { updatePlaylists } from './src/actions/playlists';

class App extends React.Component {

	static store = null;

	constructor(props) {
		super(props);

		this.toggleTheme = this.toggleTheme.bind(this);
		this.fetchSavedTheme = this.fetchSavedTheme.bind(this);

		this.state = {
			currentTheme: theme.light,
			theme: theme,
			toggleTheme: this.toggleTheme,
			fetchingTheme: true,
			alreadyCheckedFS: false,
		}

	}
	toggleTheme() {
		const newTheme = this.state.currentTheme.name === "light" ? theme.dark : theme.light;
		AsyncStorage.setItem('currentTheme', JSON.stringify(newTheme)).then(() => {
			this.setState(() => ({ currentTheme: newTheme }));
		});
	}

	_handleStateChange(appState) {
		if (appState == 'active') {
			App.store.dispatch(updatePlayer());
		}
	}


	async _syncFromLocalStorage() {
		let data;
		try {

			data = await loadTracks();

			sortMusicList(data.musicList);

			App.store.dispatch({
				type: UPDATE_LIBRARY,
				tracks: data.musicList
			});

			await AsyncStorage.setItem('musicData', JSON.stringify(data));

			return data;

		} catch (e) {
			App.store.dispatch(libraryStatus(false, e));
		};
	}


	logInConsole(desc, msg = "") {
		console.log(`\n\n${desc.toUpperCase()}:::::::::::::::\n\n${JSON.stringify(msg)}\n\n`);
	}

	makeEverythingReady = async () => {
		try {
			// await AsyncStorage.clear();

			this.logInConsole("Getting Ready.");

			let [
				[$music_data, musicData],
				[$last_played, lastPlayed],
				[$queue, queue],
				[$favourites, favourites],
				[$playlists, playlists],
			] = await AsyncStorage.multiGet([
				'musicData',
				'lastPlayed',
				'queue',
				'favourites',
				'playlists',
			]);

			musicData = JSON.parse(musicData);
			queue = JSON.parse(queue);
			favourites = JSON.parse(favourites);
			playlists = JSON.parse(playlists);

			if (musicData) {
				// this.logInConsole("scanFile", await RNFS.scanFile(musicData.musicList[0].url))

				App.store.dispatch(updateLibrary(musicData.musicList));

				this.logInConsole("lastPlayed", lastPlayed);

				if (lastPlayed) {

					lastPlayed = JSON.parse(lastPlayed);

					if (await RNFS.exists(lastPlayed.url)) {
						App.store.dispatch(playerTrack(lastPlayed));
						App.store.dispatch(addToQueue(lastPlayed));
					} else {
						App.store.dispatch(playerTrack(musicData.musicList[0]));
						App.store.dispatch(addToQueue(musicData.musicList[0]));
					}
				}
				else {
					App.store.dispatch(addToQueue(musicData.musicList[0]));
				}

				if (queue) {

					let syncedQueue = queue.filter(async (e) => {
						return (await RNFS.exists(e.url));
					})

					App.store.dispatch(updateQueue(queue));

					this.logInConsole("syncedQueue", syncedQueue)
				}

				if (favourites) {

					let syncedFavourites = favourites.filter(async (e) => {
						return (await RNFS.exists(e.url));
					});

					App.store.dispatch(updateFavourites(syncedFavourites));
					this.logInConsole("syncedFavourites", syncedFavourites)
				}

				if (playlists) {
					let syncedPlaylists = playlists.map((eachPL) => {
						return {
							name: eachPL.name,
							tracks: (
								(eachPL.tracks.length > 0)
									? eachPL.tracks.filter(async (e) => {
										return (await RNFS.exists(e.url));
									})
									: []
							)
						}
					});
					this.logInConsole("syncedPlaylists", syncedPlaylists);
					App.store.dispatch(updatePlaylists(playlists));
				}

				this.logInConsole("lastPlayed", lastPlayed);
				this.logInConsole("favourites", favourites);
				this.logInConsole("queue", queue);
				this.logInConsole("playlists", playlists);
			}

			// Check Redux
			let { ...reduxState } = App.store.getState();

			let reduxLibrary = reduxState.library,
				reduxPlayer = reduxState.player,
				reduxFavourites = reduxState.favourites,
				reduxPlaylists = reduxState.playlists,
				reduxQueue = reduxState.queue;
			this.logInConsole("currentTrack", reduxPlayer.currentTrack);
			if (this.state.alreadyCheckedFS) {
				try {
					const firstLaunch = reduxLibrary.tracks.length <= 0;
					this.logInConsole("Fetching from Device Storage ---APP.");
					if (firstLaunch) {
						App.store.dispatch(libraryStatus(true));
					}
					let data = await this._syncFromLocalStorage();

					App.store.dispatch(updateLibrary(data.musicList));
					if (!reduxPlayer.currentTrack && firstLaunch) {
						App.store.dispatch(playerTrack(data.musicList[0]));
					}
					this.setState(() => ({ alreadyCheckedFS: true }))
				} catch (e) {
					console.log("APP JSS INNER TRY CATCH", e);
				}
			}
			// App.store.dispatch(initializePlayer());
			// App.store.dispatch(fetchLibrary());
			// App.store.dispatch(updatePlayer());

			console.log("================ END ===============");

		} catch (e) {
			console.log("APP JS :", e);
		}
	}

	fetchSavedTheme = async () => {
		const curTheme = await AsyncStorage.getItem('currentTheme');

		if (!curTheme) {
			console.log("no curTheme");

			const newTheme = this.state.currentTheme;

			AsyncStorage.setItem('currentTheme', JSON.stringify(newTheme));

			this.setState(
				() => ({
					fetchingTheme: false
				}),
				() => {
					App.store.dispatch(initializePlayer());
					App.store.dispatch(updatePlayer());
					this.makeEverythingReady();
				}
			)
		} else {
			const value = JSON.parse(curTheme)
			this.setState(
				() => ({
					fetchingTheme: false,
					currentTheme: value,
				}),
				() => {
					App.store.dispatch(initializePlayer());
					App.store.dispatch(updatePlayer());
					this.makeEverythingReady();
				}
			);
		}
	}

	componentDidMount() {
		AppState.addEventListener('change', this._handleStateChange);
		
		this.fetchSavedTheme()
		// .then(() => {
		// 	App.store.dispatch(initializePlayer());
		// 	App.store.dispatch(updatePlayer());
		// 	this.makeEverythingReady()
		// });

	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleStateChange);
	}

	render() {
		this.logInConsole("APPP JSS LOADS")
		return (
			<Provider store={App.store}>
				<ThemeContext.Provider value={this.state} >
					<StatusBar backgroundColor={this.state.currentTheme.background} barStyle={this.state.currentTheme.name === "light" ? "dark-content" : "light-content"} />
					{this.state.fetchingTheme
						? (
							<Animatable.View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
								}}
								animation={'fadeInUp'}
							// duration={1000}

							>
								<Text
									style={{
										fontSize: 24
									}}
								>
									Loading
							</Text>
							</Animatable.View>
						)
						: (
							<NavigationContainer>
								<DrawerNavigator />
							</NavigationContainer>
						)}
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