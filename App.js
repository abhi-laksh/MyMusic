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
import * as RNFS from 'react-native-fs';
import * as Animatable from 'react-native-animatable';

import { request, PERMISSIONS } from 'react-native-permissions';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './src/reducers';
import Root from './src/Root';
import { updatePlayer, initializePlayer } from './src/actions/player';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './src/store/configStore';


// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

class App extends React.Component {

	static store = null;

	constructor(props) {
		super(props);
		this.toggleTheme = this.toggleTheme.bind(this);
		this.makeAppReady = this.makeAppReady.bind(this);
		this.state = {
			currentTheme: theme.light,
			theme: theme,
			toggleTheme: this.toggleTheme,
			isReady: false,
		}
	}

	toggleTheme() {
		const newTheme = this.state.currentTheme.name === "light" ? theme.dark : theme.light;
		AsyncStorage.setItem('@APP:theme', JSON.stringify(newTheme)).then(() => {
			this.setState(() => ({ currentTheme: newTheme }));
		});
	}

	_handleStateChange(appState) {
		if (appState == 'active') {
			App.store.dispatch(updatePlayer());
		}
	}

	makeAppReady = async () => {
		const curTheme = await AsyncStorage.getItem('@APP:theme');
		if (
			(!curTheme || !curTheme.length)
		) {
			console.log("no curTheme");
			const newTheme = this.state.currentTheme;
			AsyncStorage.setItem('@APP:theme', JSON.stringify(newTheme));
			// AsyncStorage.setItem('@APP:state', JSON.stringify(App.store.getState()));
			this.setState(
				() => ({
					isReady: true
				}),
				() => {
					App.store.dispatch(initializePlayer());
					App.store.dispatch(updatePlayer());
				}
			)
		} else {
			const getTheme = JSON.parse(curTheme);
			let tracks = App.store && App.store.getState() && App.store.getState().library && App.store.getState().library.queue;
			// console.log("APP::::", tracks);
			this.setState(
				() => ({
					isReady: true,
					currentTheme: getTheme,
				}),
				() => {
					App.store.dispatch(initializePlayer());
					App.store.dispatch(updatePlayer());
				}
			);

		}
	}
	flush =async () => {
		await persistor.purge();
	}
	componentDidMount() {
		// this.flush();
		AppState.addEventListener('change', this._handleStateChange);
		request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
			if (result == "granted") {
				this.makeAppReady();
			}
		})
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleStateChange);
	}

	render() {
		const { isReady, tracks, ...others } = this.state;
		return (
			<Provider store={App.store}>
				<PersistGate loading={(
					<Animatable.View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
						animation={'fadeInUp'}
					>
						<Text
							style={{
								fontSize: 24
							}}
						>
							Loading
								</Text>
					</Animatable.View>
				)} persistor={persistor}>
					<ThemeContext.Provider value={others} >
						<StatusBar backgroundColor={this.state.currentTheme.background} barStyle={this.state.currentTheme.name === "light" ? "dark-content" : "light-content"} />
						{
							!isReady
								? (
									<Animatable.View
										style={{
											flex: 1,
											justifyContent: "center",
											alignItems: "center",
										}}
										animation={'fadeInUp'}
									>
										<Text
											style={{
												fontSize: 24
											}}
										>
											Loading
										</Text>
									</Animatable.View>
								) : (
									<Root />
								)
						}
					</ThemeContext.Provider>
				</PersistGate>
			</Provider>
		);
	}
}
module.exports = function (store) {
	App.store = store;
	return App;
}

// export default App;


/*
<NavigationContainer>
								<DrawerNavigator />
							</NavigationContainer>



			<Provider store={App.store}>
				<ThemeContext.Provider value={this.state} >
					<StatusBar backgroundColor={this.state.currentTheme.background} barStyle={this.state.currentTheme.name === "light" ? "dark-content" : "light-content"} />
					<NavigationContainer>
						<DrawerNavigator />
					</NavigationContainer>
				</ThemeContext.Provider>
			</Provider>
*/