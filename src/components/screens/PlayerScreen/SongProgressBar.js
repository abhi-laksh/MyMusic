import React from "react";
import { View, StyleSheet } from "react-native";
import MyAppText from "../../commons/MyAppText";
import SongRow from "../../commons/SongRow";
import MiniPlayer from "../../commons/MiniPlayer/MiniPlayer";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import ThemeToggler from "../../commons/ThemeToggler";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/Button";
import SharpBG from "../../commons/SharpBG";
import Thumbnail from "../../commons/Thumbnail";
import ActionButton from "./ActionButtons";
import PlayerControl from "./PlayerControl";
import AlbumImage from "./AlbumImage";
import Slider from '@react-native-community/slider';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { connect } from "react-redux";



const styles = StyleSheet.create({
    parent: {
        marginBottom: 16,
        width: "100%",
        // backgroundColor:"#666",
    },
    fullwidth: {
        width: "100%",
    },
    timerParent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    timerText: {
        flex: 0
    },
    fullwidth: {
        width: "100%",
    },
    fullwidth: {
        width: "100%",
    },
    fullwidth: {
        width: "100%",
    },
    fullwidth: {
        width: "100%",
    }
})


class SongProgressBar extends ProgressComponent {
    constructor(props) {
        super(props);
    }

    getDurMin($sec) {
        const formatTwoDigits = function (n) {
            return n < 10 ? ('0' + String(n)) : n;
        }

        const seconds = Number($sec);
        const ms = Math.floor(seconds) / 1000;
        const ss = Math.floor(ms / 60) % 60;
        const mm = Math.floor(ms / 60);

        return { min: formatTwoDigits(mm), sec: formatTwoDigits(ss) };
    }

    formatPostion($sec) {

        const formatTwoDigits = function (n) {
            return n < 10 ? ('0' + String(n)) : n;
        }

        const $second = Number($sec);

        const min = parseInt(($second / 60));
        const sec = parseInt($second % 60);
        const hour = parseInt($second / 3600);

        // if (hour > 0) {
        return { min: formatTwoDigits(min), sec: formatTwoDigits(sec) };
        // } else {
        // return { min: formatTwoDigits(min), sec: formatTwoDigits(sec) };
        // }
    }


    async _seekOnDrag(value) {
        const duration = this.state.duration;
        const toValue = (value * duration);

        const sec = parseInt(toValue % 60);

        await TrackPlayer.seekTo(toValue);
        TrackPlayer.play();
    }

    render() {
        const { track, currentTheme, theme } = this.props;
        const color = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.secondary.main

        const duration = this.formatPostion(this.state.duration);
        // const duration = this.getDurMin(track.duration);
        const progressTimer = this.formatPostion((this.state.position));
        const progress = this.getProgress();

        console.log("duration : ", this.state.duration, "| progressTimer :", this.state.position);

        return (
            <View
                style={styles.parent}
            >
                <View
                    style={styles.fullwidth}
                >
                    <Slider
                        style={[
                            styles.fullwidth,
                            {
                                height: 16,
                            }
                        ]}
                        minimumValue={0}
                        maximumValue={1}
                        value={progress}
                        onSlidingStart={() => TrackPlayer.pause()}
                        onSlidingComplete={(value) => this._seekOnDrag(value)}
                        // onValueChange={(value) => this._seekOnDrag(value)}
                        maximumTrackTintColor={color}
                        minimumTrackTintColor={color}
                        thumbTintColor={color}
                    />
                </View>
                <View
                    style={styles.timerParent}
                >
                    <MyAppText
                        style={styles.timerText}
                        size={12}
                        color={color}
                        variant="medium"
                    >
                        {
                            progressTimer
                                ? `${progressTimer.min}:${progressTimer.sec}`
                                : "00:00"
                        }
                    </MyAppText>
                    <MyAppText
                        style={styles.timerText}
                        size={12}
                    >
                        {
                            duration
                                ? `${duration.min}:${duration.sec}`
                                : "00:00"
                        }
                    </MyAppText>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state) {
    const currentTrack = state.player.currentTrack;

    return {
        track: currentTrack ? currentTrack : null
    };
}

export default connect(mapStateToProps)(withTheme(SongProgressBar));


/*


class SongProgressBar extends ProgressComponent {
    constructor(props) {
        super(props);
    }

    getDurMin($sec) {
        const formatTwoDigits = function (n) {
            return n < 10 ? ('0' + String(n)) : n;
        }

        const seconds = Number($sec);
        const ms = Math.floor(seconds) / 1000;
        const ss = Math.floor(ms / 60) % 60;
        const mm = Math.floor(ms / 60);

        return { min: formatTwoDigits(mm), sec: formatTwoDigits(ss) };
    }

    formatPostion($sec) {

        const formatTwoDigits = function (n) {
            return n < 10 ? ('0' + String(n)) : n;
        }

        const $second = Number($sec);

        const min = parseInt(($second / 60));
        const sec = parseInt($second % 60);
        const hour = parseInt($second / 3600);

        // if (hour > 0) {
        return { min: formatTwoDigits(min), sec: formatTwoDigits(sec) };
        // } else {
        // return { min: formatTwoDigits(min), sec: formatTwoDigits(sec) };
        // }
    }


    async _seekOnDrag(value) {
        const duration = this.state.duration;
        const toValue = (value * duration);

        const sec = parseInt(toValue % 60);

        await TrackPlayer.seekTo(toValue);
        TrackPlayer.play();
    }

    render() {
        const { track, currentTheme, theme } = this.props;
        const color = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.secondary.main

        const duration = this.formatPostion(this.state.duration);
        // const duration = this.getDurMin(track.duration);
        const progressTimer = this.formatPostion((this.state.position));
        const progress = this.getProgress();

        console.log("duration : ", this.state.duration, "| progressTimer :", this.state.position);

        return (
            <View
                style={styles.parent}
            >
                <View
                    style={styles.fullwidth}
                >
                    <Slider
                        style={[
                            styles.fullwidth,
                            {
                                height: 16,
                            }
                        ]}
                        minimumValue={0}
                        maximumValue={1}
                        value={progress}
                        onSlidingStart={() => TrackPlayer.pause()}
                        onSlidingComplete={(value) => this._seekOnDrag(value)}
                        // onValueChange={(value) => this._seekOnDrag(value)}
                        maximumTrackTintColor={color}
                        minimumTrackTintColor={color}
                        thumbTintColor={color}
                    />
                </View>
                <View
                    style={styles.timerParent}
                >
                    <MyAppText
                        style={styles.timerText}
                        size={12}
                        color={color}
                        variant="medium"
                    >
                        {
                            progressTimer
                                ? `${progressTimer.min}:${progressTimer.sec}`
                                : "00:00"
                        }
                    </MyAppText>
                    <MyAppText
                        style={styles.timerText}
                        size={12}
                    >
                        {
                            duration
                                ? `${duration.min}:${duration.sec}`
                                : "00:00"
                        }
                    </MyAppText>
                </View>
            </View>
        );
    }
}

*/