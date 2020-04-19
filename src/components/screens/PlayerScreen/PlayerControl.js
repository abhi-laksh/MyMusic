import React from "react";
import { View, StyleSheet } from "react-native";
import MyAppText from "../../commons/MyAppText";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/Button";
import SharpBG from "../../commons/SharpBG";
import GradientText from "../../commons/GradientText";

import { connect } from "react-redux";
import TrackPlayer from 'react-native-track-player';
import BottomButtons from "./BottomButtons";

const styles = StyleSheet.create({
    parent: {
        width: "100%",
        alignItems: "center",
        // backgroundColor: "#f00",
        // paddingHorizontal: 16,
        // marginTop: 24,
    },
    controlsParent: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginVertical: 36,
    },
    iconsParent: {
        // backgroundColor: "#666",
        // backgroundColor: "transparent",
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",

    },
    lyricDrawerButtonGradient: {
        width: 100,
        height: 40,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        alignSelf: "center"
    },
    lyricDrawerButtonGradientView: {
        padding: 0,
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    lyricDrawerButtonSharpBG: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    lyricDrawerButton: {
        height: "100%",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    lyricDrawerGradient: {
        width: "100%",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    lyricDrawerGradientView: {
        width: "100%",
        // padding: 8,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    lyricText: {
        color: "#000",
        height: "100%",
    },
    lyricTextParent: {
        paddingHorizontal: 0,
        backgroundColor: "transparent",
    },
    lyricDrawerButtonSharpBG: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    drawerButtonList: {
        // backgroundColor: "#666",
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
})

class PlayerControl extends React.Component {
    constructor(props) {
        super(props);
    }


    _playPause() {
        if (this.props.state == TrackPlayer.STATE_PLAYING) {
            TrackPlayer.pause();
        }
        else {
            TrackPlayer.play();
        }
    }

    async _skipToPrev() {
        await TrackPlayer.skipToPrevious();
    }

    async _skipToNext() {
        await TrackPlayer.skipToNext();
    }

    async _jumpBackward() {
        let pos = await TrackPlayer.getPosition();
        await TrackPlayer.seekTo((pos - 10));
    }

    async _jumpForward() {
        let pos = await TrackPlayer.getPosition();
        await TrackPlayer.seekTo((pos + 10));
    }

    render() {
        const { theme, currentTheme } = this.props;

        const iconColor = (currentTheme.text.primary)
        const color = currentTheme.name === "dark"
            ? theme.pallete.primary.main
            : theme.pallete.secondary.main;
        const isPlaying = (this.props.state == TrackPlayer.STATE_PLAYING);

        return (
            <View
                style={styles.parent}
            >
                <View
                    style={styles.controlsParent}
                >
                    <Button
                        onPress={this._skipToPrev.bind(this)}
                        activeOpacity={0.5}
                        style={styles.iconsParent}
                        underlayColor={"transparent"}
                    >
                        <FontelloIcon name="prev" size={20} color={iconColor} />
                    </Button>

                    <Button
                        onPress={this._jumpBackward.bind(this)}
                        activeOpacity={0.5}
                        style={styles.iconsParent}
                        underlayColor={"transparent"}
                    >
                        <FontelloIcon name="backward-10" size={28} color={iconColor} />
                    </Button>

                    {/* PLAY */}

                    <Button
                        onPress={this._playPause.bind(this)}
                        activeOpacity={0.5}
                        style={styles.iconsParent}
                        underlayColor={"transparent"}
                    >
                        <FontelloIcon
                            name={isPlaying ? "pause" : "play"}
                            size={36}
                            color={color}
                        />
                    </Button>

                    <Button
                        onPress={this._jumpForward.bind(this)}
                        activeOpacity={0.5}
                        style={styles.iconsParent}
                        underlayColor={"transparent"}
                    >
                        <FontelloIcon name="forward-10" size={28} color={iconColor} />
                    </Button>

                    <Button
                        onPress={this._skipToNext.bind(this)}
                        activeOpacity={0.5}
                        style={styles.iconsParent}
                        underlayColor={"transparent"}
                    >
                        <FontelloIcon name="next" size={20} color={iconColor} />
                    </Button>
                </View>

                {/* Lyrics Drower */}
                <View
                    style={{
                        width: "100%"
                    }}
                >
                    <BottomButtons />
                </View>
            </View >
        )
    }
}


function mapStateToProps(state) {
    const currentTrack = state.player.currentTrack;
    return {
        state: state.player.state,
        track: currentTrack ? currentTrack : null,
    };
}

export default connect(mapStateToProps)(withTheme(PlayerControl));

/*
<View
                    style={{
                        width: "100%"
                    }}
                >
                    <ViewGradient
                        gradientStyle={
                            styles.lyricDrawerButtonGradient
                        }
                        viewStyle={styles.lyricDrawerButtonGradientView}
                        onlyBorder
                        top
                        left
                        right
                    >
                        <SharpBG
                            style={styles.lyricDrawerButtonSharpBG}
                            angle={45}
                        />
                        <Button
                            style={styles.lyricDrawerButton}
                            onPress={() => console.log("Playlist")}
                        >
                            <FontelloIcon name="lyrics" size={24} color={iconColor} />
                        </Button>
                    </ViewGradient>
                    <ViewGradient
                        gradientStyle={styles.lyricDrawerGradient}
                        viewStyle={styles.lyricDrawerGradientView}
                        onlyBorder
                        // borderWidth={1}
                        top
                        left
                        right
                    >
                        <GradientText>
                            <MyAppText
                                style={styles.lyricText}
                                parentStyle={styles.lyricTextParent}
                                size={15}
                                numberOfLines={1}
                                variant="bold"
                            >
                                Current Line of lyrics of song which is bring currently played.
                                Current Line of lyrics of song which is bring currently played.
                            </MyAppText>
                        </GradientText>
                    </ViewGradient>
                </View>
            </View >
*/