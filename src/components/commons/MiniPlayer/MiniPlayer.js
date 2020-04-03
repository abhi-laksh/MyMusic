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
// import SongRow from "./SongRow";



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
    }
    render() {
        const { theme, currentTheme, navigation } = this.props
        console.log("Miniplayer")
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
                    <CurrentSong onPress={() => navigation.navigate('Player')} songName={"A Song NameA Song NameA Song NameA Song Name"} songAuthor="Author Name" />
                </View>

                <View
                    style={styles.controlsParent}
                >
                    <PlayPauseButton
                        style={styles.controls}
                    // color={theme.pallete.primary.light}
                    // color={currentTheme.text.primary}
                    />
                    <NextButton
                        style={styles.controls}
                    // color={theme.pallete.secondary.light}
                    // color={currentTheme.text.primary}
                    />
                </View>
                <PopOuts />
            </ViewGradient>
        );
    }
}
export default withTheme(MiniPlayer);