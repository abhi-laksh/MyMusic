import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MyAppText from "./MyAppText";
import ViewGradient from "./ViewGradient";
import Thumbnail from "./Thumbnail";
import { withTheme, theme } from "../globals/ThemeProvider";
import Button from "./Button";
import FontelloIcon from "./FontelloIcon";
import Swipeable from "react-native-gesture-handler/Swipeable";
import TrackPlayer from "react-native-track-player";
import { connect } from "react-redux";
import SubMenu from "./SubMenu";
import { addToQueue } from "../../actions/queue";


const styles = StyleSheet.create({
    parent: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        marginBottom: 16,
    },
    rowSongParent: {
        flexGrow: 1,
    },
    fullHeight: {
        height: "100%",
    },
    songNameButtonView: {
        flexDirection: "row",
        alignItems: "center",
    },
    songNameView: {
        justifyContent: "center",
        flexGrow: 1,
    },
    menuButton: {
        justifyContent: "center",
        width: 32,
        alignItems: "center",
    }
})


class SongRow extends React.Component {

    constructor(props) {
        super(props);
    }

    _handleOnPress = async function (id) {
        // await TrackPlayer.skip(String(id));

        // const currentQueue = await TrackPlayer.getQueue();
        const [...currentQueue] = await TrackPlayer.getQueue();
       
        await this.props.dispatch(addToQueue(this.props.track));
        await TrackPlayer.skip(String(id));

        TrackPlayer.play();

        // console.log()
        // console.log("currentQueue", this.props.queue.length)
        // console.log()
        // const found = currentQueue.find((e) => e.id === id);
        // // console.log(currentQueue);

        // if (found) {
        //     await TrackPlayer.skip(String(id));
        //     TrackPlayer.play();
        // } else {
        //     await TrackPlayer.add(this.props.track);
        //     await TrackPlayer.skip(String(id));
        //     TrackPlayer.play();
        // }

    }
    render() {
        const {
            currentTheme,
            songName = "Unknown Name",
            songAuthor = "Unknown Author",
            songImage,
            id,
            track,
            onPress
        } = this.props;

        const color = currentTheme.name === "dark"
        return (
            <View
                style={styles.parent}
            >
                <View
                    style={styles.rowSongParent}
                >
                    <Button
                        style={styles.fullHeight}
                        onPress={() => this._handleOnPress(id)}
                    >
                        <View
                            style={[
                                styles.fullHeight,
                                styles.songNameButtonView
                            ]}
                        >
                            <Thumbnail size={50} scale={"50%"} source={songImage} />
                            <View
                                style={[
                                    styles.fullHeight,
                                    styles.songNameView
                                ]}
                            >
                                <MyAppText
                                    size={14}
                                    variant="medium"
                                    numberOfLines={1}
                                    ellipsizeMode={"tail"}
                                    style={{
                                        color: this.props.currentTrack
                                            ? this.props.currentTrack.id === id
                                                ? theme.pallete.primary.main
                                                : currentTheme.text.primary
                                            : currentTheme.text.primary
                                    }}
                                >
                                    {songName}
                                </MyAppText>
                                <MyAppText
                                    fontName="bellota"
                                    size={13}
                                    variant="bold"
                                    numberOfLines={1}
                                    ellipsizeMode={"tail"}
                                    style={{
                                        color: this.props.currentTrack
                                            ? this.props.currentTrack.id === id
                                                ? theme.pallete.secondary.main
                                                : currentTheme.text.primary
                                            : currentTheme.text.primary
                                    }}
                                >
                                    {songAuthor}
                                </MyAppText>
                            </View>
                        </View>
                    </Button>
                </View>
                <View>
                    <SubMenu songName={songName} track={track} />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) { 
    const currentTrack = state.player.currentTrack;
    const queue = state.queue.queue;
    return { currentTrack: currentTrack, queue: queue };
}

export default connect(mapStateToProps)(withTheme(SongRow));

/*

const SongRow = (props) => {
    const {
        currentTheme,
        songName = "Unknown Name",
        songAuthor = "Unknown Author",
        songImage,
        id,
        track,
        onPress
    } = props

    // console.log("SongRow", songName.substring(0, 10));

    const _handleOnPress = async function (id) {
        // await TrackPlayer.skip(String(id));
        const currentQueue = await TrackPlayer.getQueue();
        const found = currentQueue.find((e) => e.id === id);
        console.log(currentQueue);
        if (found) {
            await TrackPlayer.skip(String(id));
            TrackPlayer.play();
        } else {
            await TrackPlayer.add(track);
            await TrackPlayer.skip(String(id));
            TrackPlayer.play();
        }
    }
    return (
        <View
            style={styles.parent}
        >
            <View
                style={styles.rowSongParent}
            >
                <Button
                    style={styles.fullHeight}
                    onPress={() => _handleOnPress(id)}
                >
                    <View
                        style={[
                            styles.fullHeight,
                            styles.songNameButtonView
                        ]}
                    >
                        <Thumbnail size={50} scale={"50%"} source={songImage} />
                        <View
                            style={[
                                styles.fullHeight,
                                styles.songNameView
                            ]}
                        >
                            <MyAppText
                                size={14}
                                variant="medium"
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                                style={{
                                    color: props.currentTrack
                                        ? props.currentTrack.id == id
                                            ? theme.pallete.primary.main
                                            : currentTheme.text.primary
                                        : currentTheme.text.primary
                                }}
                            >
                                {songName}
                            </MyAppText>
                            <MyAppText
                                fontName="bellota"
                                size={13}
                                variant="bold"
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                                style={{
                                    color: props.currentTrack
                                        ? props.currentTrack.id == id
                                            ? theme.pallete.secondary.main
                                            : currentTheme.text.primary
                                        : currentTheme.text.primary
                                }}
                            >
                                {songAuthor}
                            </MyAppText>
                        </View>
                    </View>
                </Button>
            </View>
            <View>
                <SubMenu songName={songName} />
            </View>
        </View>
    )
}





                <View
                    style={
                        {
                            backgroundColor: "#eee",
                            height: "100%",
                            width: 50,
                            padding: 16
                        }
                    }
                >
                    <Thumbnail />
                </View>
*/