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
import { addNewPlaylist } from "../../../actions/playlists";
import NewPlaylistModal from "./NewPlaylistModal";
import ExistingPlaylistModal from "./ExistingPlaylistModal";

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



class SubMenu extends React.Component {

    constructor(props) {
        super(props);
        this.mainModal;
        this.newPlaylistModal;
        this.existingPlaylistModal;
        this.state = {
            activeModal: "mainModal",
            // value: ("NewPlaylist-" + (new Date().toJSON().replace(/[\ \.\:\-TZ]/g, ""))),
        };
    }

    openMainModel() {
        this.mainModal.makeVisible()
    }

    setActiveModal(modalId) {
        this.setState(() => ({ activeModal: modalId }), () => {
            this.mainModal.makeInVisible();
        });
    }

    // _resetNewPLInput() {
    //     const defaultName = ("NewPlaylist-" + (new Date().toJSON().replace(/[\ \.\:\-TZ]/g, "")));
    //     this.setState(() => ({ value: defaultName }), () => {
    //         this.newPlaylistModal.makeInVisible();
    //     })
    // }

    openModal() {
        // Will be in OnModalHde
        switch (this.state.activeModal) {
            case "newPlaylistModal":
                return this.newPlaylistModal.makeVisible();
            case "existingPlaylistModal":
                return this.existingPlaylistModal.makeVisible();
        }

    }

    _handleOnPressQueue = () => {
        // const { queue } = props.queue;

        const isInQueue = this.props.isInQueue;
        if (isInQueue) {
            this.props.dispatch(removeFromQueue(this.props.track.id));
        } else {
            this.props.dispatch(addToQueue(this.props.track));
        }

    }

    // _addToNewPlaylist() {
    //     const name = this.state.value;
    //     const { track } = this.props;

    //     this.props.dispatch(addNewPlaylist(name, [track]));
    //     console.log();
    //     console.log(this.props.playlists);
    //     console.log();

    // }

    render() {
        const {
            theme,
            currentTheme,
            songName = "Unknown Name",
            songAuthor = "Unknown Author",
            songImage,
            id,
            track,
            onPress
        } = this.props;

        const color = currentTheme.text.primary;
        const bgContrast = theme.hexToRGB(color, 0.4);
        const isInQueue = this.props.isInQueue
        const isFavourite = this.props.isFavourite

        // console.log("SubMenu", songName.substring(0, 25));
        // console.log()
        // console.log("VALUE : ", this.state.value)
        // console.log()
        // console.log("PLAYLIST::::> ", this.props.playlists);
        // console.log()

        return (
            <View>
                <Button
                    style={[
                        styles.fullHeight,
                        styles.modalToggler
                    ]}
                    onPress={() => this.openMainModel()}
                    underlayColor={"transparent"}
                >
                    <FontelloIcon name="menu-dots" color={currentTheme.text.primary} />
                </Button>

                <MyModal
                    setRef={(ref) => { this.mainModal = ref }}
                    onModalHide={() => this.openModal()}
                    animationOutTiming={100}
                >
                    <MyAppText
                        numberOfLines={1}
                        parentStyle={styles.modalTitle}
                    >
                        {songName}
                    </MyAppText> 

                    <Button
                        onPress={() => this.props.dispatch(toggleFavourites(track))}
                        style={[
                            styles.modalButtons,
                        ]}
                    >
                        <View style={styles.buttonView}>
                            <FontelloIcon name={"heart"} color={color} size={18} />
                            <MyAppText
                                parentStyle={styles.buttonTextParent}
                                style={styles.buttonText}
                                numberOfLines={1}
                            >
                                {`${!isFavourite ? "Add To" : "Remove From"} Favourites`}
                            </MyAppText>
                        </View>
                    </Button>

                    {(this.props.playlists.length > 0) && (
                        <Button
                            onPress={() => this.setActiveModal("existingPlaylistModal")}
                            style={styles.modalButtons}
                        >
                            <View style={styles.buttonView}>
                                <FontelloIcon name={"add-playlist"} color={color} size={18} />
                                <MyAppText
                                    parentStyle={styles.buttonTextParent}
                                    style={styles.buttonText}
                                    numberOfLines={1}
                                >
                                    Add To Existing Playlist
                            </MyAppText>
                            </View>
                        </Button>)
                    }

                    <Button
                        onPress={() => this.setActiveModal("newPlaylistModal")}
                        // onPress={() => console.log("Add To New Playlist")}
                        style={styles.modalButtons}
                    >
                        <View style={styles.buttonView}>
                            <FontelloIcon name={"add-playlist"} color={color} size={18} />
                            <MyAppText
                                parentStyle={styles.buttonTextParent}
                                style={styles.buttonText}

                                numberOfLines={1}
                            >
                                Add To New Playlist
                            </MyAppText>
                        </View>
                    </Button>

                    <Button
                        onPress={() => this._handleOnPressQueue()}
                        style={styles.modalButtons}
                    >
                        <View style={styles.buttonView}>
                            <FontelloIcon name={"add-queue"} color={color} size={18} />
                            <MyAppText
                                parentStyle={styles.buttonTextParent}
                                style={styles.buttonText}

                                numberOfLines={1}
                            >
                                {`${!isInQueue ? "Add To" : "Remove From"} Queue`}
                            </MyAppText>
                        </View>
                    </Button>

                    <Button
                        onPress={() => console.log("Delete")}
                        style={styles.modalButtons}
                    >
                        <View style={styles.buttonView}>
                            <FontelloIcon name={"delete"} color={color} size={20} />
                            <MyAppText
                                parentStyle={styles.buttonTextParent}
                                style={styles.buttonText}

                                numberOfLines={1}
                            >
                                Delete
                            </MyAppText>
                        </View>
                    </Button>

                    <Button
                        onPress={() => console.log("Edit Info")}
                        style={[
                            styles.modalButtons,
                            { marginBottom: 0 }
                        ]}
                    >
                        <View style={styles.buttonView}>

                            <Icon name={"square-edit-outline"} color={color} size={22} />
                            <MyAppText
                                parentStyle={styles.buttonTextParent}
                                style={styles.buttonText}
                                numberOfLines={1}
                            >
                                Edit Info
                            </MyAppText>
                        </View>
                    </Button>
                </MyModal>

                <NewPlaylistModal
                    setRef={(ref) => { this.newPlaylistModal = ref }}
                    onCancel={() => this.newPlaylistModal.makeInVisible()}
                    track={track}
                />

                <ExistingPlaylistModal
                    setRef={(ref) => { this.existingPlaylistModal = ref }}
                    track={track}
                />

            </View>
        )

    }
}

function mapStateToProps(state) {
    const favourites = state.favourites.favourites;
    const queue = state.queue.queue;

    const currentTrack = state.player.currentTrack;


    const isFav = (currentTrack && currentTrack.id && JSON.stringify(favourites).includes(currentTrack.id))
    const isInQueue = (currentTrack && currentTrack.id && JSON.stringify(queue).includes(currentTrack.id))

    const playlists = state.playlists.playlists;


    return { currentTrack: currentTrack, isFavourite: isFav, isInQueue: isInQueue, playlists: playlists };
}

export default connect(mapStateToProps)(withTheme(SubMenu));