import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import PlayPauseButton from "./PlayPauseButton";
import NextButton from "./NextButton";
import CurrentSong from "./CurrentSong";
import ViewGradient from "../ViewGradient";
import PopOuts from "./PopOuts";
import TrackPlayer from 'react-native-track-player';
import { connect } from "react-redux";
import { addToQueue } from "../../../actions/queue";


const styles = StyleSheet.create({
    parentGradientStyle: {
        position: "relative",
    },
    parentViewStyle: {
        flexDirection: "row",
        height: 60,
        padding: 0,
    },
    currentSongParent: {
        flexGrow: 1,
    },
    controlsParent: {
        flexDirection: "row",
        height: "100%",
    },
    controls: {
        height: "100%",
        // paddingHorizontal: 16,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
})

class MiniPlayer extends React.Component {
    constructor(props) {
        super(props);
        this._togglePlayPause = this._togglePlayPause.bind(this)
        this._skipToNext = this._skipToNext.bind(this)
        this.playRandomTrack = this.playRandomTrack.bind(this)
    }

    async playRandomTrack() {
        let randomTrackId = this.props.queue
            && this.props.queue.length
            && this.props.queue[Math.floor(Math.random() * this.props.queue.length)];
        await TrackPlayer.skip(String(randomTrackId));
    }

    _togglePlayPause() {
        if (!this.props.isPlaying) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
    }
    async _skipToNext() {
        const isLast = ((this.props.queue && this.props.currentTrack && this.props.currentTrack.id)
            && this.props.queue.indexOf(this.props.currentTrack.id) === this.props.queue.length - 1)

        if (this.props.controlType === "shuffle") {
            await this.playRandomTrack();
        } else {
            if (!isLast) {
                await TrackPlayer.skipToNext();
            } else {
                if (
                    this.props.controlType === "loop-all"
                    && this.props.queue[0]
                ) {
                    await TrackPlayer.skip(this.props.queue[0]);
                }
            }
        }
    }

    render() {
        const { navigation } = this.props
        // console.log("Miniplayer", this.props.controlType);
        return (
            <ViewGradient
                gradientStyle={styles.parentGradientStyle}
                viewStyle={styles.parentViewStyle}
                top
                onlyBorder
                borderWidth={1}
            >
                <PopOuts navigation={navigation} />
                <View
                    style={styles.currentSongParent}
                >
                    <CurrentSong
                        onPress={() => navigation.navigate('Player')}
                        songName={this.props.currentTrack ? this.props.currentTrack.title : "Unknown Title"}
                        songAuthor={this.props.currentTrack ? this.props.currentTrack.artist : "Unknown Artist"}
                    />
                </View>

                <View
                    style={styles.controlsParent}
                >
                    <PlayPauseButton
                        style={styles.controls}
                        isPlaying={this.props.isPlaying}
                        onPress={this._togglePlayPause}
                        underlayColor={"transparent"}
                        disabled={!this.props.currentTrack}
                    />

                    <NextButton
                        style={styles.controls}
                        onPress={this._skipToNext}
                        underlayColor={"transparent"}
                        disabled={!this.props.currentTrack}
                    />
                </View>
            </ViewGradient>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrack: state.tracks.byId[state.player.currentTrack],
        queue: state.library.queue,
        playlists: state.playlists,
        controlType: state.player.controlType,
        isPlaying: state.player.state === TrackPlayer.STATE_PLAYING,
        tracks: state.tracks,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToQueue: (track) => dispatch(addToQueue(track)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer);

/*


class MiniPlayer extends React.PureComponent {
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
                        songName={this.props.currentTrack ? this.props.currentTrack.title : "Unknown Title"}
                        songAuthor={this.props.currentTrack ? this.props.currentTrack.artist : "Unknown Artist"}
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

*/