import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import SongList from "../../commons/SongRow/SongList";
import PlaylistDetails from "./PlaylistDetails";
import ErrorPlaylistTracks from "./ErrorPlaylistTracks";
import { withTheme } from "../../globals/ThemeProvider";

class PlaylistTracksScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentTheme, navigation, route } = this.props;
        const { playlistId } = route.params;
        const tracks = this.props.playlists && this.props.playlists.byId[playlistId] && this.props.playlists.byId[playlistId].tracks;
        const name = this.props.playlists && this.props.playlists.byId[playlistId] && this.props.playlists.byId[playlistId].name;
        const date = this.props.playlists && this.props.playlists.byId[playlistId] && this.props.playlists.byId[playlistId].date;


        return (
            (tracks) && (tracks.length > 0)
                ? (
                    <View style={{
                        flex: 1,
                        backgroundColor: currentTheme.background,
                    }}
                    >
                        <SongList
                            currentTrackId={this.props.currentTrackId}
                            trackIds={tracks.concat()}
                            ListHeaderComponent={(
                                <PlaylistDetails
                                    navigation={navigation}
                                    playlistId={playlistId}
                                    name={name}
                                    tracks={tracks}
                                    createdOn={date}
                                />
                            )}
                            stickyHeaderIndices={[0]}
                        />
                    </View>
                )
                : (
                    <ErrorPlaylistTracks playlistId={playlistId} navigation={navigation} />
                )

        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrackId: state.player.currentTrack,
        playlists: state.playlists
    };
}
export default connect(mapStateToProps)(withTheme(PlaylistTracksScreen));