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
        const { initialTracks = [], name } = this.props;
        if (
            (tracks.length > 0)
            && ((initialTracks.length !== tracks.length))
        ) {
            this.props.addTracksToPlaylist(name, tracks);
            this.props.navigation.navigate('PlaylistScreen')
        }

    }

    _addToSelections(track) {
        const prevItems = this.state.addedTracks.concat();
        prevItems.push(track);

        this.setState(() => ({ addedTracks: prevItems }));
        // console.log("ADDED", this.state.addedTracks)
    }

    _renderSideComponent(props) {
        const color = props.currentTheme.text.primary;
        return (
            <Button
                style={
                    styles.modalToggler
                }
                onPress={this._addToSelections.bind(this, props.track)}
                underlayColor={"transparent"}
            >
                <Icon name="library-plus" color={color} size={24} />
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
        const selectedTracks = JSON.stringify(this.state.addedTracks);
        const unSelectedTracks = this.props.tracks.filter((e) => !selectedTracks.includes(e.id));

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
                    tracks={unSelectedTracks}
                    currentTrack={this.props.currentTrack}
                    RightSideComponent={this._renderSideComponent}
                    ListHeaderComponent={
                        <MyAppText
                            numberOfLines={1}
                            size={16}
                            parentStyle={[
                                styles.modalTitle,
                                {
                                    backgroundColor: "#666",
                                    // backgroundColor: currentTheme.background,
                                }
                            ]}
                        >
                            {
                                "Songs Added "
                                + String(this.state.addedTracks.length)
                                + " of " + String(this.props.tracks.length)
                            }
                        </MyAppText>
                    }
                    stickyHeaderIndices={[0]}
                />
            </MyModal>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrack: state.player.currentTrack,
        tracks: state.library.tracks,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTracksToPlaylist: (name, track) => dispatch(addTracksToPlaylist(name, track))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(TrackListModal));