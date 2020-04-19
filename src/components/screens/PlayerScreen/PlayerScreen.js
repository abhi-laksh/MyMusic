import React from "react";
import { View, StyleSheet } from "react-native";
import { withTheme } from "../../globals/ThemeProvider";
import PlayerControl from "./PlayerControl";
import AlbumImage from "./AlbumImage";
import SongProgressBar from "./SongProgressBar";
import { connect } from "react-redux";
import TrackPlayer from 'react-native-track-player';

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 0,
        paddingBottom: 0,
    },
    childView: {
        // flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        // backgroundColor: "#ff0",
    }
})

class PlayerScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { theme, currentTheme } = this.props;
        // console.log("PlayerScreen");
        return (
            <View style={[
                styles.parent,
                { backgroundColor: currentTheme.background, },
                // { backgroundColor: "#10e" }
            ]}>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <AlbumImage />
                </View>
                {/* <AlbumImage /> */}
                <View
                    style={styles.childView}
                >
                    <SongProgressBar />
                    <PlayerControl />
                </View>
            </View >
        );
    }
}



export default withTheme(PlayerScreen);