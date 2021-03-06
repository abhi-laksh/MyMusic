import React from "react";
import { View, StyleSheet } from "react-native";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "./Button";
import FontelloIcon from "../FontelloIcon";
import { connect } from "react-redux";
import MyAppText from "../MyAppText";
import MyModal from "../MyModal";
import { addTracksToPlaylist } from "../../../actions/playlists";

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



class ExistingPlaylistModal extends React.PureComponent {

    constructor(props) {
        super(props);
        this._renderPlaylistRows = this._renderPlaylistRows.bind(this);
    }

    _addToPlaylist(playlistId) {
        let trackId = this.props.track && this.props.track.id;
        this.props.onCancel();
        this.props.addTracksToPlaylist(playlistId, trackId);
    }

    _renderPlaylistRows(each, index) {
        const color = this.props.currentTheme.text.primary;
        const eachPL = this.props.playlists.byId[each]
        return (
            <Button
                key={each}
                onPress={() => this._addToPlaylist(each)}
                style={styles.modalButtons}
            >
                <View style={styles.buttonView}>
                    <FontelloIcon name={"playlist"} color={color} size={18} />
                    <MyAppText
                        parentStyle={styles.buttonTextParent}
                        style={styles.buttonText}

                        numberOfLines={1}
                    >
                        {eachPL && eachPL.name}
                    </MyAppText>
                </View>
            </Button>
        )
    }

    render() {
        const {
            playlists,
            setRef,
        } = this.props;

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
                    (playlists) && playlists.allIds && (playlists.allIds.length > -1)
                        ? playlists.allIds.map(this._renderPlaylistRows)
                        : null
                }
            </MyModal>
        )

    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTracksToPlaylist: (name, track) => dispatch(addTracksToPlaylist(name, track))
    }
}

export default connect(null, mapDispatchToProps)(withTheme(ExistingPlaylistModal));