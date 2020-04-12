import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import MyAppText from "../MyAppText";
import FontelloIcon from "../FontelloIcon";
import Button from "../Button";
import PlayPauseButton from "./PlayPauseButton";
import { theme } from "../../globals/theme";
import { withTheme } from "../../globals/ThemeProvider";
import NextButton from "./NextButton";
import CurrentSong from "./CurrentSong";
import ViewGradient from "../ViewGradient";
import PopOuts from "./PopOuts";
import { connect } from "react-redux";
// import SongRow from "./SongRow";
import TrackPlayer from 'react-native-track-player';
import { updatePlayer } from "../../../actions/player";
import AsyncStorage from "@react-native-community/async-storage";



const styles = StyleSheet.create({
    parentGradientStyle: {
        zIndex: 2
    },
    parentViewStyle: {
        flexDirection: "row",
        height: 60,
        position: "relative",
        padding: 0,
        zIndex: 2
    },
    currentSongParent: {
        flexGrow: 1,
        zIndex: 2
    },
    controlsParent: {
        flexDirection: "row",
        height: "100%",
        zIndex: 2
    },
    controls: {
        height: "100%",
        // paddingHorizontal: 16,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
    },
})

class MiniPlayer extends React.Component {
    constructor(props) {
        super(props);
        // this._togglePlayPause = this._togglePlayPause.bind(this)
    }

    _togglePlayPause() {
        // (this.props.state == TrackPlayer.STATE_PAUSED) || (this.props.state == TrackPlayer.STATE_STOPPED)
        if ((this.props.state == TrackPlayer.STATE_PAUSED) || (this.props.state == TrackPlayer.STATE_STOPPED)) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
    }
    async _skipToNext() {
        // (this.props.state == TrackPlayer.STATE_PAUSED) || (this.props.state == TrackPlayer.STATE_STOPPED)
        await TrackPlayer.skipToNext();
    }
    render() {
        const { theme, currentTheme, navigation, songName, songArtist } = this.props
        // console.log("Miniplayer")
        return (
            <ViewGradient
                gradientStyle={styles.parentGradientStyle}
                viewStyle={styles.parentViewStyle}
                top
                onlyBorder
                borderWidth={1}
            >
                <View
                    style={styles.currentSongParent}
                >
                    <CurrentSong
                        onPress={() => navigation.navigate('Player')}
                        songName={this.props.track ? this.props.track.title : "Unknown Title"}
                        songAuthor={this.props.track ? this.props.track.artist : "Unknown Artist"}
                    />
                </View>

                <View
                    style={styles.controlsParent}
                >
                    <PlayPauseButton
                        style={styles.controls}
                        isPlaying={
                            !((this.props.state == TrackPlayer.STATE_PAUSED)
                                || (this.props.state == TrackPlayer.STATE_STOPPED))
                        }
                        onPress={this._togglePlayPause.bind(this)}
                    // color={theme.pallete.primary.light}
                    // color={currentTheme.text.primary}
                    />
                    <NextButton
                        style={styles.controls}
                        onPress={this._skipToNext.bind(this)}
                    // color={theme.pallete.secondary.light}
                    // color={currentTheme.text.primary}
                    />
                </View>
                <PopOuts />
            </ViewGradient>
        );
    }
}

function mapStateToProps(state) {

    let currentTrack = state.player.currentTrack;
    // await TrackPlayer.add(data.musicList);
    // const tracks = { ...state.library.tracks };
    return {
        state: state.player.state,
        track: currentTrack ? currentTrack : null
    };
}
export default connect(mapStateToProps)(withTheme(MiniPlayer));