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
        marginHorizontal: 8,
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

    async _handleOnPress(trackId) {
        await this.props.addToQueue(trackId);
        await TrackPlayer.skip(String(trackId));
        TrackPlayer.play();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {
            songName,
            songAuthor,
            currentTrackId,
            id,
            RightSideComponent
        } = this.props;

        return (
            (songName != nextProps.songName)
            || (songAuthor != nextProps.songAuthor)
            || ((id != nextProps.id))
            || (currentTrackId != nextProps.currentTrackId)
            || ((typeof RightSideComponent != 'undefined') && (RightSideComponent != nextProps.RightSideComponent))
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
            RightSideComponent = null
            // isActive,
        } = this.props;

        const isActive = (this.props.currentTrackId === id);
        const activeColor = currentTheme.name === "dark"
            ? theme.pallete.primary.light : theme.pallete.secondary.main;
        const color = currentTheme.text.primary;
        // .replace(/[\*\-_\(\)\[\]\{\}\&\,\ ]/g," ")
        return (
            <View
                style={styles.parent}
            >
                <View
                    style={styles.rowSongParent}
                >
                    <Button
                        style={styles.fullHeight}
                        onPress={this._handleOnPress.bind(this, id)}
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

function mapDispatchToProps(dispatch) {
    return {
        addToQueue: (trackId) => dispatch(addToQueue(trackId))
    }
}

export default connect(null, mapDispatchToProps)(withTheme(SongRow));