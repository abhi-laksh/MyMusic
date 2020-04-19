import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "./Button";
import FontelloIcon from "../FontelloIcon";
import Swipeable from "react-native-gesture-handler/Swipeable";
import TrackPlayer from "react-native-track-player";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import MyAppText from "../MyAppText";
import ViewGradient from "../ViewGradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyModal from "../MyModal";
import { removeFromQueue, addToQueue } from "../../../actions/queue";
import { toggleFavourites } from "../../../actions/favourites";
import Input from "../Input";
import { addNewPlaylist, addTracksToPlaylist } from "../../../actions/playlists";

const styles = StyleSheet.create({
    parent: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        marginBottom: 16,
    },
    fullHeight: {
        height: "100%",
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0
    },
    modalToggler: {
        justifyContent: "center",
        width: 32,
        alignItems: "center",
        // backgroundColor: "#666"

    },
    modalButtons: {

        marginBottom: 16,
        paddingVertical: 8
    },
    modalGradient: {
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },



    buttonView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonTextParent: {
        paddingHorizontal: 0,
        flex: 0,
        marginLeft: 16,
        width: "70%"
    },
    buttonText: {
        flex: 0,
    },
    modalTitle: {
        marginBottom: 16
    },
})



class ExistingPlaylistModal extends React.Component {

    constructor(props) {
        super(props);

    }

    _addToPlaylist(name) {
        this.props.dispatch(addTracksToPlaylist(name, this.props.track))
    }

    render() {
        const {
            theme,
            currentTheme,
            setRef,
        } = this.props;

        const color = currentTheme.text.primary;
        const bgContrast = theme.hexToRGB(color, 0.4);

        // console.log("ExistingPlaylistModal", songName.substring(0, 25));
        // console.log()
        // console.log()
        // console.log(this.props.playlists[0]);
        // console.log()

        return (
            <MyModal
                setRef={setRef}
            >

                <MyAppText
                    numberOfLines={1}
                    parentStyle={styles.modalTitle}
                    size={18}
                >
                    Choose Playlist
                </MyAppText>

                {
                    this.props.playlists.length > -1
                        ? this.props.playlists.map((each, index) => {
                            return (
                                <Button
                                    key={each.name || index}
                                    onPress={() => this._addToPlaylist(each.name)}
                                    style={styles.modalButtons}
                                >
                                    <View style={styles.buttonView}>
                                        <FontelloIcon name={"playlist"} color={color} size={18} />
                                        <MyAppText
                                            parentStyle={styles.buttonTextParent}
                                            style={styles.buttonText}

                                            numberOfLines={1}
                                        >
                                            {each.name}
                                        </MyAppText>
                                    </View>
                                </Button>
                            )
                        })
                        : null
                }


            </MyModal>
        )

    }
}

function mapStateToProps(state) {
    const currentTrack = state.player.currentTrack;
    const favourites = state.favourites.favourites;
    const queue = state.queue.queue;
    const playlists = state.playlists.playlists;
    return { currentTrack: currentTrack, favourites: favourites, queue: queue, playlists: playlists };
}

export default connect(mapStateToProps)(withTheme(ExistingPlaylistModal));