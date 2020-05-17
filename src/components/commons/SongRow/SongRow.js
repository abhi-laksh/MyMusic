import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Thumbnail from "../Thumbnail";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../Button";
import TrackPlayer from "react-native-track-player";
import { connect } from "react-redux";
import SubMenu from "../SubMenu";
import { addToQueue } from "../../../actions/queue";
import SongInfo from "./SongInfo";


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
})


class SongRow extends React.Component {

    constructor(props) {
        super(props);
        // this._handleOnPress = this._handleOnPress.bind(this);
    }

    async _handleOnPress(track) {
        await this.props.addToQueue(track);
        await TrackPlayer.skip(String(track.id));
        TrackPlayer.play();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {
            songName,
            songAuthor,
            track,
        } = this.props;


        return (
            (songName != nextProps.songName)
            || (songAuthor != nextProps.songAuthor)
            || ((track) && (track.id != nextProps.track.id))
            || (this.props.currentTrack != nextProps.currentTrack)
            || ((this.props.currentTrack) && (this.props.currentTrack.id != nextProps.currentTrack.id))
            || ((typeof this.props.RightSideComponent != 'undefined') && (this.props.RightSideComponent != nextProps.RightSideComponent))
        )
    }

    componentWillUnmount() {
        // console.log("SONG ROW ", this.props.songName.substring(0, 50))
    }

    render() {
        const {
            theme,
            songName = "Unknown Name",
            songAuthor = "Unknown Author",
            songImage,
            id,
            track,
            currentTheme,
            RightSideComponent = null
            // isActive,
        } = this.props;

        const isActive = ((this.props.currentTrack) && (this.props.currentTrack === id));
        const activeColor = currentTheme.name === "dark" ? theme.pallete.primary.light : theme.pallete.secondary.main;
        const color = currentTheme.text.primary;


        return (
            <View
                style={styles.parent} 
            >
                <View
                    style={styles.rowSongParent}
                >
                    <Button
                        style={styles.fullHeight}
                        onPress={this._handleOnPress.bind(this, track)}
                    // onPress={this.props.onPressPlay}
                    // onPress={() => this._handleOnPress(id)}
                    >
                        <View
                            style={[
                                styles.fullHeight,
                                styles.songNameButtonView
                            ]}
                        >
                            <Thumbnail size={50} scale={"50%"} source={songImage} />
                            <SongInfo
                                songName={songName}
                                songAuthor={songAuthor}
                                isActive={isActive}
                                activeColor={activeColor}
                            />
                        </View>
                    </Button>
                </View>
                {
                    (!RightSideComponent)
                        ? <SubMenu songName={songName} color={color} track={track} />
                        : (RightSideComponent(this.props))
                }
            </View>
        )
    }
}

// function mapStateToProps(state) {
//     const currentTrack = state.player.currentTrack;
//     const queue = state.queue.queue;
//     return { currentTrack: currentTrack, queue: queue };
// }

function mapDispatchToProps(dispatch) {
    return {
        addToQueue: (track) => dispatch(addToQueue(track))
    }
}

export default connect(null, mapDispatchToProps)(withTheme(SongRow));

/*

class SongRow extends React.Component {

    constructor(props) {
        super(props);
        // this._handleOnPress = this._handleOnPress.bind(this);
    }

    async _handleOnPress(id) {
        await this.props.dispatch(addToQueue(this.props.track));
        await TrackPlayer.skip(String(id));
        TrackPlayer.play();
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {
            songName,
            songAuthor,
            track,
        } = this.props;

        return (
            (songName != nextProps.songName)
            || (track.id != nextProps.track.id)
            || (songAuthor != nextProps.songAuthor)
            || (this.props.currentTrack && (this.props.currentTrack.id != nextProps.currentTrack.id))
        )
    }

    render() {
        const {
            theme,
            songName = "Unknown Name",
            songAuthor = "Unknown Author",
            songImage,
            id,
            track,
            currentTheme,
        } = this.props;

        const isActive = ((this.props.currentTrack) && (this.props.currentTrack.id === id));
        const activeColor = theme.pallete.primary.main;
        const color = currentTheme.text.primary;

        console.log("SONG ROW:::::::::::", songName.substring(0, 50));

        return (
            <View
                style={styles.parent}
            >
                <View
                    style={styles.rowSongParent}
                >
                    <Button
                        style={styles.fullHeight}
                        // onPress={this._handleOnPress}
                        onPress={() => this._handleOnPress(id)}
                    >
                        <View
                            style={[
                                styles.fullHeight,
                                styles.songNameButtonView
                            ]}
                        >
                            <Thumbnail size={50} scale={"50%"} source={songImage} />
                            <SongInfo
                                songName={songName}
                                songAuthor={songAuthor}
                                isActive={isActive}
                                activeColor={activeColor}
                            />
                        </View>
                    </Button>
                </View>
                <SubMenu songName={songName} color={color} track={track} />
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
*/