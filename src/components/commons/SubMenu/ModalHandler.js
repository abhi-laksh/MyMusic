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
        navigation.navigate("SongInfo", {
            screen: "SongInfoScreen",
            params: {
                track: track
            }
        });
        // navigation.navigate("SongInfoScreen", {
        //     track: track
        // });
    }

    navigateToSongInfoEdit() {
        const navigation = this.context;
        const { track } = this.props;
        this.closeMainModel();
        navigation.navigate("SongInfo", {
            screen: "SongInfoEditScreen",
            params: {
                track: track
            }
        });
        
        // navigation.navigate("SongInfoEditScreen", {
        //     track: track
        // });
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
                        style={styles.modalButtons}
                        disabled={(isInQueue && this.props.queue && this.props.queue.length <= 1)}
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
        toggleFavourites: (trackId) => dispatch(toggleFavourites(trackId)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ModalHandler));