import React from "react";
import { View, StyleSheet } from "react-native";
import TrackPlayer from 'react-native-track-player';
import { connect } from "react-redux";

import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/SubMenu/Button";
import MyAppText from "../../commons/MyAppText";
import { addMultipleToQueue } from "../../../actions/queue";

const styles = StyleSheet.create({
    parent: {
        flex: 0.48,
        borderRadius: 8,
        overflow: "hidden",
        marginVertical: 8,
        height: 180,
    },
    parentView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    gradient: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    gradientView: {
        padding: 8,
        width: "100%",
        height: "100%",
        borderRadius: 6,
        justifyContent: "flex-end",
    },
    PLIcon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    PLInfoParent: {
        flexDirection: "row",
        alignItems: "center",
    },
    PLName: {
        flexGrow: 1,
        paddingHorizontal: 0,
        alignItems: "center",
        marginLeft: 8,
    },
    playButton: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center"
    },
    textParentCommon: {
        paddingHorizontal: 0,
        marginLeft: 8,
    },
    fullFlex: {
        flex: 1
    },
})

class PlaylistCard extends React.PureComponent {
    constructor(props) {
        super(props);
        this._navigateToPLTracks = this._navigateToPLTracks.bind(this);
        this._addPLToQueue = this._addPLToQueue.bind(this);
    }

    _navigateToPLTracks() {

        const { id } = this.props

        this.props.navigation.navigate('PlaylistTracksScreen', {
            playlistId: id,
        });

    }

    async _addPLToQueue() {
        const { tracks } = this.props;
        await this.props.addMultipleToQueue(tracks);
        TrackPlayer.play();
    }

    render() {
        const {
            theme,
            currentTheme,
            name,
            tracks,
        } = this.props;

        const contrastValue = (currentTheme.name === "dark") ? 0.3 : -0.3;
        const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));
        const currentColor = currentTheme.text.primary;

        console.log("PLAYLIST CARD:::", tracks);

        return (
            <Button
                onPress={this._navigateToPLTracks}
                style={styles.parent}
                activeOpacity={0.9}
            >
                <View
                    style={styles.parentView}
                >
                    <ViewGradient
                        gradientStyle={styles.gradient}
                        viewStyle={styles.gradientView}
                        angle={10}
                        onlyBorder
                    >
                        <View style={styles.PLIcon}>
                            <FontelloIcon name="playlist" size={56} color={contrast} />
                        </View>
                        <View style={styles.PLInfoParent}>
                            <View
                                style={styles.fullFlex}
                            >
                                <MyAppText
                                    parentStyle={styles.PLName}
                                    size={15}
                                    variant={"semiBold"}
                                    numberOfLines={1}
                                >
                                    {name}
                                </MyAppText>

                                <MyAppText
                                    parentStyle={styles.textParentCommon}
                                    size={12}
                                    variant={"semiBold"}
                                    numberOfLines={1}
                                >
                                    {tracks ? `${tracks.length} Tracks` : `0 Tracks`}
                                </MyAppText>
                            </View>
                            <Button
                                style={styles.playButton}
                                onPress={this._addPLToQueue}
                                underlayColor={"transparent"}
                                activeOpacity={0.5}
                            >
                                <FontelloIcon color={currentColor} size={24} name={"play"} />
                            </Button>
                        </View>
                    </ViewGradient>
                </View>
            </Button>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        addMultipleToQueue: (tracks) => dispatch(addMultipleToQueue(tracks))
    }
}


export default connect(null, mapDispatchToProps)(withTheme(PlaylistCard));

/*

<Button
            onPress={() => console.log("Hii")}
            style={{
                // backgroundColor: "#000",
                flex: 1,
                flexGrow: 1,
                // marginVertical: 8,
                margin: 8,
                height: 148,
                borderRadius: 8,
                overflow: "hidden",
            }}
        >
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    overflow: "hidden",
                }}
            >
                <ImageBackground
                    style={{
                        width: "100%",
                        height: "100%",
                        flex: 1,
                    }}
                    source={img}
                >
                    <ViewGradient
                        gColors={[
                            "rgba(0,0,0,.5)",
                            theme.hexToRGB(themeColorSecondary, 0.15),
                            theme.hexToRGB(themeColorPrimary, 0.5),
                        ]}
                        gradientStyle={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "flex-end",
                        }}
                        viewStyle={{
                            padding: 0,
                            flexDirection: "row",
                        }}
                        angle={10}
                        locations={[
                            0.2,
                            0.6,
                            0.9
                        ]}
                        borderWidth={0}
                    >
                        <MyAppText
                            color={"#fff"}
                            parentStyle={{
                                flexGrow: 1,
                                // backgroundColor: "#888",
                                paddingHorizontal: 0,
                                alignItems: "center",
                                marginLeft: 8,
                            }}
                            style={{
                                // backgroundColor: "#f0e",
                                // textAlign:"center",
                            }}
                            size={13}
                            variant={"semiBold"}
                            numberOfLines={1}
                        >
                            PlaylistCardPlaylistCardPlaylistCard
                    </MyAppText>

                        <Button
                            style={{
                                // backgroundColor: "#666",
                                width: 30,
                                height: 30,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            onPress={() => console.log("PLAY")}
                        >
                            <FontelloIcon color={"#fff"} size={16} name={"play"} />
                        </Button>
                    </ViewGradient>
                </ImageBackground>
            </View>
        </Button>

*/