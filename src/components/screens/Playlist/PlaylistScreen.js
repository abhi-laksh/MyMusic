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
        const eachPL = this.props.playlists && this.props.playlists.byId[item];

        if (eachPL) {
            return (
                <PlaylistCard
                    name={eachPL.name}
                    tracks={eachPL.tracks}
                    createdOn={eachPL.date}
                    id={item}
                    navigation={this.props.navigation}
                />
            )
        } else {
            return null;
        }
    }

    _keyExtracter = (item) => (item);

    render() {
        const { currentTheme, navigation } = this.props;
        const isLast = ((this.props.queue && this.props.currentTrackId)
            && this.props.queue.indexOf(this.props.currentTrackId) === this.props.queue.length - 1)

        return (
            <View style={{
                flex: 1,
                backgroundColor: currentTheme.background,
            }}>
                {!(this.props.playlists.allIds.length > 0)
                    ? (
                        <ErrorPlaylist />
                    ) : (
                        <FlatList
                            contentContainerStyle={{
                                padding: 16,
                            }}
                            columnWrapperStyle={{
                                justifyContent: "space-between"
                            }}
                            data={this.props.playlists.allIds.concat()}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtracter}
                            numColumns={2}
                        />
                    )
                }
                <MiniPlayer
                    navigation={navigation}
                    isPlaying={(this.props.state === TrackPlayer.STATE_PLAYING)}
                    track={(this.props.currentTrack)}
                    isLast={isLast}
                    controlType={this.props.controlType}
                    firstTrack={this.props.queue[0]}
                // playRandomTrack={this.playRandomTrack}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        playlists: state.playlists,
        currentTrack: state.tracks.byId[state.player.currentTrack],
        currentTrackId: state.player.currentTrack,
        controlType: state.player.controlType,
        queue: state.library.queue,
        tracks: state.tracks,
        state: state.player.state,
    };
}
export default connect(mapStateToProps)(withTheme(PlaylistScreen));