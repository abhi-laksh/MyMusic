import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import TrackPlayer from 'react-native-track-player';

import MiniPlayer from "../../commons/MiniPlayer/MiniPlayer";
import ThemeToggler from "../../commons/ThemeToggler";
import { withTheme } from "../../globals/ThemeProvider";
import Loading from "../../commons/Loading";
import SongList from "../../commons/SongRow/SongList";
import { addMultipleToQueue } from "../../../actions/queue";
import CommonBG from "../../CommonBG";


class FavouritesScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.addAllToQueue(this.props.favourites)
    }
    render() {
        const { currentTheme, navigation } = this.props;

        const isLast = ((this.props.queue && this.props.currentTrack)
            && (this.props.queue.findIndex((e) => e.id === this.props.currentTrack.id)) === (this.props.queue.length - 1)
        )

        return (
            <View style={{
                flex: 1,
                backgroundColor: currentTheme.background,
            }}>
                <CommonBG>
                    {this.props.fetching ?
                        <Loading />
                        :
                        <SongList
                            tracks={this.props.favourites}
                            currentTrack={this.props.currentTrack}
                        />
                    }
                    <ThemeToggler />
                </CommonBG>

                <MiniPlayer
                    navigation={navigation}
                    isPlaying={(this.props.state === TrackPlayer.STATE_PLAYING)}
                    track={this.props.currentTrack}
                    isLast={isLast}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrack: state.player.currentTrack,
        tracks: state.library.tracks,
        favourites: state.favourites.favourites,
        queue: state.queue.queue,
        state: state.player.state,
        fetching: state.library.fetching,
        error: state.library.error,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        addAllToQueue: (tracks) => dispatch(addMultipleToQueue(tracks))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(FavouritesScreen));