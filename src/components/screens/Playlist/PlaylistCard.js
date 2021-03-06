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