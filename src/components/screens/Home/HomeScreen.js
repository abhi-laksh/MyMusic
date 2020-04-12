import React from "react";
import { View, ScrollView, FlatList } from "react-native";
import MyAppText from "../../commons/MyAppText";
import SongRow from "../../commons/SongRow";
import MiniPlayer from "../../commons/MiniPlayer/MiniPlayer";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import ThemeToggler from "../../commons/ThemeToggler";
import { withTheme } from "../../globals/ThemeProvider";
import AsyncStorage from "@react-native-community/async-storage";
import TrackPlayer from 'react-native-track-player';
import { connect } from "react-redux";
import { fetchLibrary, initializePlayer, updatePlayer } from "../../../actions/player";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        // this._handleSongPress = this._handleSongPress.bind(this)
        this.state = {
            musicList: []
        }
    }
    async componentDidMount() {
        // AsyncStorage.clear();
        this.props.dispatch(initializePlayer())
        this.props.dispatch(fetchLibrary());
        this.props.dispatch(updatePlayer());
    }
    async _handleSongPress(id) {
        await TrackPlayer.skip(String(id));
        TrackPlayer.play();
    }
    _renderItem({ item }) {
        return (
            <SongRow
                songName={item.title}
                songAuthor={item.artist}
                id={item.id}
                track={item}
            // onPress={() => this._handleSongPress.bind(this, item.id)}
            />
        )
    }

    render() {
        const { theme, currentTheme, navigation } = this.props;
        console.log("HomeScreen");
        return (
            <View style={{ flex: 1, backgroundColor: currentTheme.background }}>
                <FlatList
                    contentContainerStyle={{
                        padding: 16
                    }}
                    data={this.props.tracks}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.id}
                />
                <ThemeToggler />
                <MiniPlayer navigation={navigation} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        lastPlayedTrack: state.player.currentTrack,
        tracks: state.library.tracks,
        fetching: state.library.fetching,
        error: state.library.error
    };
}
export default connect(mapStateToProps)(withTheme(HomeScreen));

/*

                <ScrollView
                    contentContainerStyle={{
                        padding: 16
                    }}
                >
                    {
                        this.state.musicList
                            ? (
                                this.state.musicList.slice(0, 5).map((each) => (
                                    <SongRow
                                        key={each.id}
                                        songName={each.title}
                                        songAuthor={each.artist}
                                        onPress={() => TrackPlayer.play()}
                                    />
                                ))
                            )
                            : null
                    }
                    <ThemeToggler />
                </ScrollView>



    async componentDidMount() {
        let musicData = await AsyncStorage.getItem('musicData');

        console.log("Started ")
        await TrackPlayer.setupPlayer({});
        console.log("setup done ")

        console.log("option updating");

        TrackPlayer.updateOptions({
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PLAY_FROM_ID,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP,
                TrackPlayer.CAPABILITY_JUMP_FORWARD,
                TrackPlayer.CAPABILITY_JUMP_BACKWARD,
                TrackPlayer.CAPABILITY_SEEK_TO,
                TrackPlayer.CAPABILITY_SKIP,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP,
            ],
        });

        console.log("option updated")
        musicData = JSON.parse(musicData)
        this.setState({ musicList: musicData.musicList })
        console.log("musicList", musicData.musicList[0]);
        console.log("adding")
        await TrackPlayer.add(this.state.musicList[54]);
        console.log("added")
    }
*/