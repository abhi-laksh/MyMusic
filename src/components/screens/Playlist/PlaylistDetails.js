import React from "react";
import { View, StyleSheet } from "react-native";
import TrackPlayer from 'react-native-track-player';
import { connect } from "react-redux";

import TrackListModal from "./TrackListModal";
import MyAppText from "../../commons/MyAppText";
import Button from "../../commons/Button";
import FontelloIcon from "../../commons/FontelloIcon";
import { addMultipleToQueue } from "../../../actions/queue";
import { withTheme } from "../../globals/ThemeProvider";

const styles = StyleSheet.create({
    parent: {
        padding: 16,
        paddingBottom: 8,
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
        width: 100,
        height: 108,
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
        marginBottom: 2,
        paddingHorizontal: 0,
    },
    buttonGroups: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
    },
    eachButton: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor:"#666"
    },
});

class PlaylistDetails extends React.PureComponent {
    constructor(props) {
        super(props);

        this.setModalRef = this.setModalRef.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this._addPLToQueue = this._addPLToQueue.bind(this);
        this._addMoreSongs = this._addMoreSongs.bind(this);

        this.trackListModal = null;

    }

    setModalRef(ref) {
        this.trackListModal = ref
    }

    closeModal() {
        this.trackListModal.makeInVisible();
    }

    openModal() {
        this.trackListModal.makeVisible();
    }

    _addPLToQueue() {
        const { tracks } = this.props;
        this.props.addMultipleToQueue(tracks);
        TrackPlayer.play();
    }


    _addMoreSongs() {
        const { tracks } = this.props;

        this.props.addMultipleToQueue(tracks);
        TrackPlayer.play();
    }

    render() {
        const { theme, currentTheme, navigation, playlistId, name, tracks, createdOn } = this.props;

        const contrastValue = (currentTheme.name === "dark") ? 0.3 : -0.3;
        const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));
        const currentColor = currentTheme.text.primary;

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
                        <FontelloIcon name="playlist" size={48} color={contrast} />
                    </View>
                    <View
                        style={styles.detailsParent}
                    >
                        <MyAppText
                            size={16}
                            numberOfLines={2}
                            variant={"semiBold"}
                            style={styles.capitalize}
                            parentStyle={styles.textParentStyle}
                        >
                            {name}
                        </MyAppText>
                        <MyAppText
                            size={14}
                            numberOfLines={2}
                            parentStyle={styles.textParentStyle}
                        >
                            {tracks && tracks.length ? String(tracks.length) + ' Tracks' : '0 Tracks'}
                        </MyAppText>
                        <MyAppText
                            size={14}
                            numberOfLines={2}
                            style={styles.capitalize}
                            parentStyle={styles.textParentStyle}
                        >
                            {
                                "Created On: " + createdOn
                            }
                        </MyAppText>
                    </View>
                </View>

                <View
                    style={styles.buttonGroups}
                >
                    <Button
                        style={styles.eachButton}
                    >
                        <FontelloIcon name="shuffle" size={24} color={currentColor} />
                    </Button>
                    <Button
                        style={styles.eachButton}
                        onPress={this._addPLToQueue}
                    >
                        <FontelloIcon name="play-my" size={24} color={currentColor} />
                    </Button>
                    <Button
                        style={styles.eachButton}
                        onPress={this.openModal}
                    >
                        <FontelloIcon name="add-music" size={24} color={currentColor} />
                    </Button>
                </View>
                <TrackListModal
                    setModalRef={this.setModalRef}
                    onCancel={this.closeModal}
                    name={name}
                    navigation={navigation}
                    playlistId={playlistId}
                    initialTracks={tracks}
                />
            </View>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        addMultipleToQueue: (tracks) => dispatch(addMultipleToQueue(tracks))
    }
}


export default connect(null, mapDispatchToProps)(withTheme(PlaylistDetails));