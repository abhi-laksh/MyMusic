import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";

import MyAppText from "../../commons/MyAppText";
import Button from "../../commons/SubMenu/Button";
import SongList from "../../commons/SongRow/SongList";
import MyModal from "../../commons/MyModal";
import { addTracksToPlaylist } from "../../../actions/playlists";
import { withTheme } from "../../globals/ThemeProvider";
import FontelloIcon from "../../commons/FontelloIcon";

const styles = StyleSheet.create({
    parent: {
        flex: 0.6,
    },
    modalTitle: {
        marginBottom: 16,
        paddingVertical: 16,
    },
    modalToggler: {
        justifyContent: "center",
        width: 36,
        height: "100%",
        alignItems: "center",
        // backgroundColor: "#666"
    },
})

class TrackListModal extends React.Component {
    constructor(props) {
        super(props);

        this._renderSideComponent = this._renderSideComponent.bind(this);
        this._addToSelections = this._addToSelections.bind(this);
        this._addSongsToPlaylist = this._addSongsToPlaylist.bind(this);
        this.trackListModal = null;

        this.state = {
            addedTracks: [],
        }

    }

    _addSongsToPlaylist() {
        const tracks = this.state.addedTracks;
        const { initialTracks = [], playlistId } = this.props;
        if (
            (tracks.length > 0)
            && ((initialTracks.length !== tracks.length))
        ) {
            this.props.addTracksToPlaylist(playlistId, tracks);
            this.props.navigation.navigate('PlaylistScreen')
        }

    }

    _addToSelections(track) {
        const prevItems = this.state.addedTracks.concat();
        prevItems.push(track);
        this.setState(() => ({ addedTracks: prevItems }));
    }

    _renderSideComponent(props) {
        const color = props.currentTheme.text.primary;
        return (
            <Button
                style={
                    styles.modalToggler
                }
                onPress={this._addToSelections.bind(this, props.id)}
                underlayColor={"transparent"}
            >
                <FontelloIcon name="playlist-plus" color={color} size={24} />
                {/* <Icon name="library-plus" color={color} size={24} /> */}
            </Button>
        )
    }

    componentDidMount() {
        const { initialTracks } = this.props;
        if (initialTracks) {
            this.setState(() => ({ addedTracks: initialTracks }))
        }
    }

    render() {
        const { theme, currentTheme } = this.props;
        const selectedTracks = this.state.addedTracks;
        const unSelectedTracks = this.props.tracks
            && this.props.tracks.allIds
            && this.props.tracks.allIds.filter((e) => !selectedTracks.includes(e));
        return (
            <MyModal
                setRef={this.props.setModalRef}
                gradientStyle={styles.parent}
                onModalHide={this._addSongsToPlaylist}
                viewStyle={{
                    padding: 0,
                }}
            >

                <SongList
                    trackIds={unSelectedTracks}
                    currentTrackId={(this.props.currentTrackId)}
                    RightSideComponent={this._renderSideComponent}
                    ListHeaderComponent={
                        <MyAppText
                            numberOfLines={1}
                            size={16}
                            parentStyle={StyleSheet.compose([
                                styles.modalTitle,
                                {
                                    // backgroundColor: "#666",
                                    backgroundColor: currentTheme.background,
                                    flex: 1,
                                    borderBottomColor: theme.pallete.primary.main,
                                    borderBottomWidth: 2
                                }
                            ])}
                        >
                            {
                                "Songs Added "
                                + String(this.state.addedTracks.length)
                                + " of " + String(this.props.tracks
                                    && this.props.tracks.allIds
                                    && this.props.tracks.allIds.length
                                )
                            }
                        </MyAppText>
                    }
                    contentContainerStyle={{
                        padding: 0,
                    }}
                    stickyHeaderIndices={[0]}
                />
            </MyModal>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrackId: state.player.currentTrack,
        tracks: state.tracks,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTracksToPlaylist: (playlistId, trackId) => dispatch(addTracksToPlaylist(playlistId, trackId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(TrackListModal));