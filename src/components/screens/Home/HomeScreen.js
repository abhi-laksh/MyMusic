import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import TrackPlayer from 'react-native-track-player';

import MiniPlayer from "../../commons/MiniPlayer/MiniPlayer";
import ThemeToggler from "../../commons/ThemeToggler";
import { withTheme } from "../../globals/ThemeProvider";
import Loading from "../../commons/Loading";
import SongList from "../../commons/SongRow/SongList";
import { addMultipleToQueue, addToQueue } from "../../../actions/queue";
import CommonBG from "../../CommonBG";


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.playRandomTrack = this.playRandomTrack.bind(this);
    }
    async playRandomTrack() {
        const randomTrack = this.props.tracks[Math.floor(Math.random() * this.props.tracks.length)];
        if (!(this.props.queue.find((e) => randomTrack.id === e.id))) {
            console.log("HOME:::",randomTrack)
            await this.props.addToQueue(randomTrack);
            await TrackPlayer.skip(String(randomTrack.id));
            TrackPlayer.play();
        } else {
            await TrackPlayer.skip(String(randomTrack.id));
         }
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
                            tracks={this.props.tracks}
                            currentTrack={this.props.currentTrack}
                            addAllToQueue={this.props.addAllToQueue}
                        />
                    }
                </CommonBG> 

                <MiniPlayer
                    navigation={navigation}
                    isPlaying={(this.props.state === TrackPlayer.STATE_PLAYING)}
                    track={this.props.currentTrack}
                    isLast={isLast}
                    controls={this.props.controls}
                    firstTrack={this.props.queue[0]}
                    playRandomTrack={this.playRandomTrack}
                />
            </View>
        );
    }
} 

function mapStateToProps(state) {
    return {
        currentTrack: state.player.currentTrack,
        tracks: state.library.tracks,
        queue: state.queue.queue,
        controls: state.controls,
        state: state.player.state,
        fetching: state.library.fetching,
        error: state.library.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addAllToQueue: (tracks) => dispatch(addMultipleToQueue(tracks)),
        addToQueue: (track) => dispatch(addToQueue(track)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(HomeScreen));