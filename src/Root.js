import React from 'react';
import {
	StatusBar,
	AppState,
	View,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { loadTracks, sortMusicList } from './constants/utils';
import { libraryStatus } from './actions/library';
import { syncTracksInState, getTrack } from './actions/tracks';
import ThemeToggler from './components/commons/ThemeToggler';
import { withTheme } from './components/globals/ThemeProvider';
import HomeScreen from './components/screens/Home/HomeScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { addMultipleToQueue } from './actions/queue';
import FavouritesScreen from './components/screens/Favourites/FavouritesScreen';
import SearchScreen from './components/screens/Search/SearchScreen';
import PlayerScreen from './components/screens/Player/PlayerScreen';
import TrackPlayer from 'react-native-track-player';

import DrawerNavigator from "./components/navigations/DrawerNavigator";
import Loading from './components/commons/Loading';
class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alreadySynced: false,
		}
	}

	_syncFromLocalStorage = async () => {
		try {
			let data;
			data = await loadTracks();
			sortMusicList(data.musicList);
			return data;
		} catch (e) {
			if (this.props.newLoad) {
				this.props.libraryStatus(true, false, e);
			} else {
				this.props.libraryStatus(false, false, e);
			}
			console.warn("updateTracksInStore::: ", error);
		};
	}
	updateTracksInStore = async () => {
		try {
			await this.props.addMultipleInQueue(this.props.queue);
			this.props.libraryStatus(this.props.newLoad, true, null);
			let data = await this._syncFromLocalStorage();
			if (data && data.musicList) {
				await this.props.syncTracksInState(data.musicList);
				this.setState(
					() => ({
						alreadySynced: true,
					}),
					() => {
						this.props.libraryStatus(false, false, null);
					}
				)
			}
		} catch (error) {
			if (this.props.newLoad) {
				this.props.libraryStatus(true, false, e);
			} else {
				this.props.libraryStatus(false, false, e);
			}
			this.props.libraryStatus(false, error);
			console.warn("updateTracksInStore::: ", error);
		}
	}

	componentDidMount() {
		if (!this.state.alreadySynced) {
			this.updateTracksInStore();
		}
	}
	render() {
		// console.log("ROOT:::", this.props.tracks)
		return (
			<NavigationContainer >
				<DrawerNavigator />
			</NavigationContainer >
		);
	}
}


function mapStateToProps(state) {
	return {
		tracks: state.tracks,
		queue: state.library && state.library.queue,
		fetching: state.library && state.library.fetching,
		error: state.library.error,
		newLoad: state.library.newLoad,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		libraryStatus: (newLoad, fetching, error) => dispatch(libraryStatus(newLoad, fetching, error)),
		syncTracksInState: (tracks) => dispatch(syncTracksInState(tracks)),
		addMultipleInQueue: (tracks) => dispatch(addMultipleToQueue(tracks)),
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Root));
