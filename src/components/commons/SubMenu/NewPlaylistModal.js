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



class NewPlaylistModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ("NewPlaylist-" + (new Date().toJSON().replace(/[\ \.\:\-TZ]/g, ""))),
        };
    }

    _resetNewPLInput() {
        const defaultName = ("NewPlaylist-" + (new Date().toJSON().replace(/[\ \.\:\-TZ]/g, "")));
        this.setState(() => ({ value: defaultName }), () => {
            this.props.onCancel();
        })
    }

    _addToNewPlaylist() {
        const name = this.state.value;
        const { track } = this.props;

        this.props.dispatch(addNewPlaylist(name, [track]));

        this.props.onCancel();

        // console.log();
        // console.log(this.props.playlists);
        // console.log();

    }
    render() {
        const {
            theme,
            currentTheme,
            setRef,
        } = this.props;

        const color = currentTheme.text.primary;
        const bgContrast = theme.hexToRGB(color, 0.4);

        // console.log("NewPlaylistModal", songName.substring(0, 25));
        // console.log()
        // console.log("VALUE : ", this.state.value)
        // console.log()
        // console.log(this.props.playlists[1]);
        // console.log()

        return (
            <MyModal
                setRef={setRef}
            >
                <MyAppText
                    numberOfLines={1}
                    size={18}
                    parentStyle={styles.modalTitle}
                >
                    Add New Playlist
                </MyAppText>

                <Input
                    selectTextOnFocus
                    autoFocus={true}
                    placeholder={"Enter Playlist Name"}
                    value={this.state.value}
                    onChangeText={(val) => { this.setState(() => ({ value: val })) }}
                    returnKeyType={"done"}
                    onSubmitEditing={() => this._addToNewPlaylist()}
                />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 24,
                        marginBottom: 16,
                    }}
                >
                    <Button
                        // onPress={() => console.log("HIII")}
                        onPress={() => this._resetNewPLInput()}
                        style={{
                            paddingVertical: 12,
                            flex: 0.45,
                            borderRadius: 48,
                            borderWidth: 1,
                            borderColor: bgContrast,
                        }}
                    // underlayColor={"transparent"}
                    >
                        <View>
                            <MyAppText
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                Cancel
                            </MyAppText>
                        </View>
                    </Button>

                    <ViewGradient
                        gradientStyle={{
                            flex: 0.45,
                            borderRadius: 48,
                        }}
                        viewStyle={{
                            borderRadius: 48,
                            padding: 0,
                            overflow: "hidden",
                            flex: 1,
                        }}
                        // onlyBorder
                        borderWidth={0}
                    >
                        <Button
                            onPress={() => this._addToNewPlaylist()}
                            // onPress={() => this._resetNewPLInput()}
                            style={{
                            }}

                            underlayColor={"rgba(255,255,255,0.2)"}
                        >
                            <View
                                style={{
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <MyAppText
                                    style={{
                                        textAlign: "center",
                                    }}
                                    color={"#fff"}
                                >
                                    Save
                                </MyAppText>
                            </View>
                        </Button>
                    </ViewGradient>
                </View>
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

export default connect(mapStateToProps)(withTheme(NewPlaylistModal));