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
        const { tracks, name, createdOn } = route.params;


        return (

            (tracks) && (tracks.length > 0)
                ? (
                    <View style={{
                        flex: 1,
                        backgroundColor: currentTheme.background,
                    }}
                    >
                        <SongList
                            currentTrack={this.props.currentTrack}
                            tracks={tracks.concat()}
                            ListHeaderComponent={<PlaylistDetails navigation={navigation} name={name} tracks={tracks} createdOn={createdOn} />}
                            stickyHeaderIndices={[0]}
                        />
                    </View>
                )
                : (
                    <ErrorPlaylistTracks name={name} navigation={navigation} />
                )

        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrack: state.player.currentTrack,
    };
}
export default connect(mapStateToProps)(withTheme(PlaylistTracksScreen));