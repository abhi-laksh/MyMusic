import React from "react";
import { View, StyleSheet, Text } from "react-native";
import TrackPlayer from 'react-native-track-player';
import { connect } from "react-redux";

import MyAppText from "../../commons/MyAppText";
import Button from "../../commons/Button";
import FontelloIcon from "../../commons/FontelloIcon";
import { addMultipleToQueue } from "../../../actions/queue";
import { withTheme } from "../../globals/ThemeProvider";
import GradientText from "../../commons/GradientText";
import ViewGradient from "../../commons/ViewGradient";
import { deleteLyrics } from "../../../actions/lyrics";

const styles = StyleSheet.create({
    parent: {
        padding: 16,
        // paddingBottom: 8,
        // marginTop: 16,
        marginBottom: 8,
        borderBottomWidth: 2,
    },
    subParent: {
        flexDirection: "row",
        // paddingTop: 24,
        // paddingBottom: 8,
        marginBottom: 8,
        alignItems: "center",
    },
    thumbnial: {
        width: 80,
        height: 80,
        marginRight: 16,
        alignItems: "center",
        borderWidth: 2,
        justifyContent: "center",
        borderRadius: 8,
    },
    capitalize: {
        textTransform: "capitalize"
    },
    detailsParent: {
        flex: 1,
    },
    textParentStyle: {
        marginBottom: 4,
        paddingHorizontal: 0,
    },
    buttonGroups: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
    },
    eachButton: {
        flex: 1,
        flexGrow: 1,
        // width: 36,
        height: 36,
        // alignItems: "center",
        // justifyContent: "center",
        // backgroundColor:"#666"
    },
});

class SongDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.removeLyrics = this.removeLyrics.bind(this);
        this.navigateToEdit = this.navigateToEdit.bind(this);
    }

    removeLyrics() {
        let lyricsId = this.props.trackLyrics && this.props.trackLyrics.id;
        let trackId = this.props.currentTrack && this.props.currentTrack.id;
        this.props.deleteLyrics(trackId, lyricsId);
    }

    navigateToEdit() {
        this.props.navigation.navigate("LyricsEditScreen");
    }

    render() {
        const { theme, currentTheme, navigation, name = "Unknown Title", artist = "Unknown Artist", createdOn } = this.props;
        const disableColor = currentTheme.text.disabled;
        const contrastValue = (currentTheme.name === "dark") ? 0.3 : -0.3;

        const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));

        const currentColor = currentTheme.text.primary;

        const themeColor = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.secondary.main;

        const disabled = !(this.props.trackLyrics && this.props.trackLyrics.id);

        return (
            <View
                style={[
                    styles.parent,
                    {
                        backgroundColor: currentTheme.background,
                        borderBottomColor: contrast,
                    }
                ]}
            >
                <View
                    style={styles.subParent}
                >
                    <View
                        style={[
                            styles.thumbnial,
                            { borderColor: contrast, }
                        ]}
                    >
                        <GradientText
                            maskedStyle={{
                                width: 32,
                                height: 32,
                            }}
                            gradientStyle={{
                                width: 32,
                                height: 32,
                            }}
                            angle={50}
                        >
                            <FontelloIcon name="lyrics" size={32} color={contrast} />
                        </GradientText>
                    </View>
                    <View
                        style={styles.detailsParent}
                    >
                        <MyAppText
                            size={14}
                            numberOfLines={3}
                            variant={"semiBold"}
                            style={styles.capitalize}
                            parentStyle={styles.textParentStyle}
                            color={themeColor}
                            numberOfLines={2}
                        >
                            <Text style={{ color: currentColor, fontSize: 14 }}>Title: </Text>
                            {this.props.currentTrack && this.props.currentTrack.title}
                        </MyAppText>
                        <MyAppText
                            size={13}
                            numberOfLines={2}
                            parentStyle={styles.textParentStyle}
                        >
                            <Text style={{ color: currentColor, fontSize: 14 }}>Artist: </Text>
                            {this.props.currentTrack && this.props.currentTrack.artist}
                        </MyAppText>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 8,
                        justifyContent: "space-between",
                    }}
                >
                    <ViewGradient
                        gradientStyle={{
                            borderRadius: 6,
                            flex: 0.48,
                            opacity: disabled ? 0.9 : 1,
                        }}
                        viewStyle={{
                            padding: 0,
                            borderRadius: 6,
                            overflow: "hidden",
                            // flex: 1,
                        }}
                        onlyBorder
                        borderWidth={1}
                    >
                        <Button
                            onPress={this.navigateToEdit}
                            activeOpacity={0.7}
                            disabled={disabled}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // paddingHorizontal: 12,
                                    // height: "100%",
                                    // flex: 1,
                                }}
                            >
                                <FontelloIcon name="pencil-box-multiple-outline" size={18} color={disabled ? disableColor : currentColor} />
                                <MyAppText
                                    size={14}
                                    parentStyle={{
                                        // backgroundColor: "#666",
                                        // flex: 0,
                                        // flexGrow: 0,
                                        paddingHorizontal: 0,
                                        marginLeft: 8,
                                        padding: 8,
                                    }}
                                    variant="semiBold"
                                    style={{
                                        // backgroundColor: "#66a",
                                        flex: 0,
                                    }}
                                    color={disabled ? disableColor : currentColor}
                                >
                                    Edit
                                </MyAppText>
                            </View>
                        </Button>
                    </ViewGradient>
                    <ViewGradient
                        gradientStyle={{
                            borderRadius: 6,
                            flex: 0.48,
                        }}
                        viewStyle={{
                            padding: 0,
                            borderRadius: 6,
                            overflow: "hidden",
                            // flex: 1,
                        }}
                        onlyBorder
                        borderWidth={1}
                    >
                        <Button
                            onPress={this.removeLyrics}
                            activeOpacity={0.7}
                            disabled={disabled}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // paddingHorizontal: 12,
                                    // height: "100%",
                                    // flex: 1,
                                }}
                            >
                                <FontelloIcon name="delete" size={18} color={disabled ? disableColor : currentColor} />
                                <MyAppText
                                    size={14}
                                    parentStyle={{
                                        // backgroundColor: "#666",
                                        // flex: 0,
                                        // flexGrow: 0,
                                        paddingHorizontal: 0,
                                        marginLeft: 8,
                                        padding: 8,
                                    }}
                                    variant="semiBold"
                                    style={{
                                        // backgroundColor: "#66a",
                                        flex: 0,
                                    }}
                                    color={disabled ? disableColor : currentColor}
                                // color={"#fff"}
                                >
                                    Delete
                                </MyAppText>
                            </View>
                        </Button>
                    </ViewGradient>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state) {
    const currentTrack = state.tracks.byId[state.player.currentTrack];
    const lyricsId = currentTrack && currentTrack.lyricsId;
    return {
        currentTrack,
        trackLyrics: lyricsId && state.lyrics.byId[lyricsId],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteLyrics: (trackId, lyricsId) => dispatch(deleteLyrics(trackId, lyricsId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SongDetails));

/*

                    <Button
                        onPress={() => { }}
                        style={{
                            // flex: 1,
                            // backgroundColor: "#66c",
                            borderRadius: 4,
                            padding: 4,
                            paddingHorizontal: 12,
                            borderWidth: 2,
                            borderColor: themeColor,
                        }}
                    >
                        <View
                            style={{
                                // flex: 1,
                                // height: 36,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <FontelloIcon name="delete" size={20} color={themeColor} />
                            <MyAppText
                                style={{
                                    // backgroundColor: "#66c",
                                    flex: 0,
                                }}
                                parentStyle={{
                                    // backgroundColor: "#666"
                                    paddingHorizontal: 0,
                                    marginLeft: 8,
                                }}
                                size={14}
                            >
                                Delete
                            </MyAppText>
                        </View>
                    </Button>
                    =====================

                <View
                    style={{
                        flexDirection: "row",

                    }}
                >
                    <Button
                        style={styles.eachButton}
                        onPress={() => { }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row"
                            }}
                        >
                            <FontelloIcon name="pencil-box-multiple-outline" size={24} color={currentColor} />
                            <MyAppText>
                                Edit
                            </MyAppText>
                        </View>
                    </Button>

                    <Button
                        style={styles.eachButton}
                        onPress={() => { }}
                    >
                     <View
                         style={{
                             flex: 1,
                         }}
                     >
                         <FontelloIcon name="delete" size={24} color={currentColor} />
                         <MyAppText
                             parentStyle={{
                                 // flex: 1,
                             }}
                             style={{
                                 flex: 0,
                             }}
                         >
                             Edit
                         </MyAppText>
                     </View>
                 </Button>
             </View>
*/