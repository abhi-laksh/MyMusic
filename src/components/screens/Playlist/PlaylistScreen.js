import React from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";
import TrackPlayer from 'react-native-track-player';

import MiniPlayer from "../../commons/MiniPlayer/MiniPlayer";
import ThemeToggler from "../../commons/ThemeToggler";
import { withTheme } from "../../globals/ThemeProvider";
import PlaylistCard from "./PlaylistCard";
import ErrorPlaylist from "./ErrorPlaylist";


class PlaylistScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this._renderItem = this._renderItem.bind(this);
        this._keyExtracter = this._keyExtracter.bind(this);
    }

    _renderItem({ item, index }) {
        return (
            <PlaylistCard
                name={item.name}
                tracks={item.tracks}
                createdOn={item.date}
                navigation={this.props.navigation}
            />
        )
    }

    _keyExtracter = (item) => (item.name);

    render() {
        const { currentTheme, navigation } = this.props;


        return (
            <View style={{
                flex: 1,
                backgroundColor: currentTheme.background,
            }}>
                {!(this.props.playlists.length > 0) ?
                    <ErrorPlaylist />
                    :
                    <FlatList
                        contentContainerStyle={{
                            padding: 16,
                        }}
                        columnWrapperStyle={{
                            justifyContent: "space-between"
                        }}
                        data={this.props.playlists.concat()}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtracter}
                        numColumns={2}
                    />
                }
                <ThemeToggler />
                <MiniPlayer
                    navigation={navigation}
                    isPlaying={(this.props.state === TrackPlayer.STATE_PLAYING)}
                    track={this.props.currentTrack}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        playlists: state.playlists.playlists,
        currentTrack: state.player.currentTrack,
        tracks: state.library.tracks,
        state: state.player.state,
    };
}
export default connect(mapStateToProps)(withTheme(PlaylistScreen));