import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "./Button";
import FontelloIcon from "../FontelloIcon";
import { connect } from "react-redux";
import MyAppText from "../MyAppText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyModal from "../MyModal";
import { removeFromQueue, addToQueue } from "../../../actions/queue";
import { toggleFavourites } from "../../../actions/favourites";
import NewPlaylistModal from "./NewPlaylistModal";
import ExistingPlaylistModal from "./ExistingPlaylistModal";
import { NavigationContext } from '@react-navigation/native';
const styles = StyleSheet.create({
    modalButtons: {

        marginBottom: 16,
        paddingVertical: 8
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



class ModalHandler extends React.PureComponent {
    static contextType = NavigationContext;
    constructor(props) {
        super(props);
        this.mainModal;
        this.newPlaylistModal;
        this.existingPlaylistModal;

        this.state = {
            activeModal: "mainModal",
            // value: ("NewPlaylist-" + (new Date().toJSON().replace(/[\ \.\:\-TZ]/g, ""))),
        };

        this._toggleFav = this._toggleFav.bind(this);
        this._handleOnPressQueue = this._handleOnPressQueue.bind(this);
        this.openRequestedModal = this.openRequestedModal.bind(this);
        this.setThisRef = this.setThisRef.bind(this);
        this.setMainModalRef = this.setMainModalRef.bind(this);
        this.navigateToSongInfo = this.navigateToSongInfo.bind(this);
        this.navigateToSongInfoEdit = this.navigateToSongInfoEdit.bind(this);
    }

    setThisRef() {
        this.props.setRef(this)
    }
    setMainModalRef(ref) {
        this.mainModal = ref;
    }
    openMainModel() {
        this.mainModal.makeVisible()
    }

    setActiveModal(modalId) {
        this.setState(() => ({ activeModal: modalId }), () => {
            this.mainModal.makeInVisible();
        });
    }
    openRequestedModal() {
        // Will be in OnModalHde
        switch (this.state.activeModal) {
            case "newPlaylistModal":
                return this.newPlaylistModal.makeVisible();
            case "existingPlaylistModal":
                return this.existingPlaylistModal.makeVisible();
        }

    }

    _handleOnPressQueue = () => {
        this.mainModal.makeInVisible();

        const isInQueue = this.props.track && this.props.queue && this.props.queue.includes(this.props.track.id);

        if (isInQueue) {
            this.props.removeFromQueue((this.props.track.id));
        } else {
            this.props.addToQueue((this.props.track.id));
        }
    }

    _toggleFav() {
        let id = this.props.track && this.props.track.id;
        this.props.toggleFavourites((id));
        this.mainModal.makeInVisible();
    }

    closeMainModel() {
        this.mainModal.makeInVisible();
    }


    navigateToSongInfo() {
        const navigation = this.context;
        const { track } = this.props;
        this.closeMainModel();
        console.log(track)
        navigation.navigate("SongInfo", {
            screen: "SongInfoScreen",
            params: {
                track: track
            }
        });
    }

    navigateToSongInfoEdit() {
        const navigation = this.context;
        const { track } = this.props;
        this.closeMainModel();
        console.log(track)
        navigation.navigate("SongInfo", {
            screen: "SongInfoEditScreen",
            params: {
                track: track
            }
        });
    }



    render() {
        const {
            theme,
            currentTheme,
            songName = "Unknown Name",
            // setThisRef,
            track,
        } = this.props;

        const color = currentTheme.text.primary;
        const bgContrast = theme.hexToRGB(color, 0.4);

        const isInQueue = track && this.props.queue && this.props.queue.includes(track.id);
        const isFavourite = track && this.props.favourites && this.props.favourites.includes(track.id);
        /* 
            TODO : bug solve in add/remove queue,
        */
        return (
            <View
                ref={this.setThisRef}
            >
                <MyModal
                    setRef={this.setMainModalRef}
                    onModalHide={this.openRequestedModal}
                    // onModalWillHide={}
                    animationOutTiming={100}
                >
                    <MyAppText
                        numberOfLines={1}
                        parentStyle={styles.modalTitle}
                    >
                        {songName}
                    </MyAppText>

                    <Button
                        onPress={this._toggleFav}
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

                    {(this.props.playlists && this.props.playlists.allIds && this.props.playlists.allIds.length > 0) && (
                        <Button
                            onPress={this.setActiveModal.bind(this, "existingPlaylistModal")}
                            style={styles.modalButtons}
                        >
                            <View style={styles.buttonView}>
                                <FontelloIcon name={"playlist-plus"} color={color} size={24} />
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
                        onPress={this.setActiveModal.bind(this, "newPlaylistModal")}
                        // onPress={() => console.log("Add To New Playlist")}
                        style={styles.modalButtons}
                    >
                        <View style={styles.buttonView}>
                            <FontelloIcon name={"playlist"} color={color} size={18} />
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
                        onPress={this._handleOnPressQueue}
                        // onPress={() => console.log(isInQueue)}
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
                            <FontelloIcon name={"delete-outline"} color={color} size={20} />
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
                        onPress={this.navigateToSongInfo}
                        style={[
                            styles.modalButtons,
                            // { marginBottom: 0 }
                        ]}
                    >
                        <View style={styles.buttonView}>

                            <Icon name={"information-outline"} color={color} size={22} />
                            <MyAppText
                                parentStyle={styles.buttonTextParent}
                                style={styles.buttonText}
                                numberOfLines={1}
                            >
                                See Info
                            </MyAppText>
                        </View>
                    </Button>

                    <Button
                        onPress={this.navigateToSongInfoEdit}
                        style={[
                            styles.modalButtons,
                            // { marginBottom: 0 }
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
                    trackId={track && track.id}
                />

                <ExistingPlaylistModal
                    setRef={(ref) => { this.existingPlaylistModal = ref }}
                    track={track}
                    playlists={this.props.playlists}
                    onCancel={() => this.existingPlaylistModal.makeInVisible()}
                />
            </View >
        )

    }
}

function mapStateToProps(state) {
    let { library, playlists } = state;
    return {
        favourites: library && library.favourites,
        queue: library && library.queue,
        playlists: playlists
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToQueue: (trackId) => dispatch(addToQueue(trackId)),
        removeFromQueue: (trackId) => dispatch(removeFromQueue(trackId)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ModalHandler));


/*
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



class SubMenu extends React.PureComponent {

    constructor(props) {
        super(props);
        this.mainModal;
        this.newPlaylistModal;
        this.existingPlaylistModal;

        this.state = {
            activeModal: "mainModal",
            // value: ("NewPlaylist-" + (new Date().toJSON().replace(/[\ \.\:\-TZ]/g, ""))),
        };

        this._toggleFav = this._toggleFav.bind(this);
        this.closeMainModel = this.closeMainModel.bind(this);
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

    openRequestedModal() {
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

        const isInQueue = JSON.stringify(this.props.queue).includes(track.id);

        if (isInQueue) {
            this.props.dispatch(removeFromQueue(this.props.track.id));
        } else {
            this.props.dispatch(addToQueue(this.props.track));
        }

    }

    _toggleFav() {
        this.props.dispatch(toggleFavourites(this.props.track));
        this.mainModal.makeInVisible();
    }
    closeMainModel() {
        this.mainModal.makeInVisible();
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
        const isInQueue = JSON.stringify(this.props.queue).includes(track.id);
        const isFavourite = JSON.stringify(this.props.favourites).includes(track.id);

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
                    onModalHide={() => this.openRequestedModal()}

                    animationOutTiming={100}
                >
                    <MyAppText
                        numberOfLines={1}
                        parentStyle={styles.modalTitle}
                    >
                        {songName}
                    </MyAppText>

                    <Button
                        onPress={this._toggleFav}
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
                        onPress={this.closeMainModel}
                        // onPress={() => console.log(isInQueue)}
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
            </View >
        )

    }
}

function mapStateToProps(state) {
    const favourites = state.favourites.favourites;
    const queue = state.queue.queue;

    const currentTrack = state.player.currentTrack;

    // const isFav = (currentTrack && currentTrack.id && JSON.stringify(favourites).includes(currentTrack.id))
    // const isInQueue = (currentTrack && currentTrack.id && JSON.stringify(queue).includes(currentTrack.id))

    const playlists = state.playlists.playlists;


    return { currentTrack: currentTrack, favourites: favourites, queue: queue, playlists: playlists };
}

export default connect(mapStateToProps)(withTheme(SubMenu));
*/