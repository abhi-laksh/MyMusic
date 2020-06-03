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

        const isLast = ((this.props.queue && this.props.currentTrackId)
            && this.props.queue.indexOf(this.props.currentTrackId) === this.props.queue.length - 1)


        // console.log("FV::", this.props.favourites)

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
                            trackIds={this.props.favourites}
                            currentTrackId={(this.props.currentTrackId)}
                        />
                    }
                </CommonBG>

                <MiniPlayer
                    navigation={navigation}
                    isPlaying={(this.props.state === TrackPlayer.STATE_PLAYING)}
                    track={this.props.currentTrack}
                    controlType={this.props.controlType}
                    isLast={isLast}
                    firstTrack={this.props.queue[0]}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrack: state.tracks.byId[state.player.currentTrack],
        currentTrackId: state.player.currentTrack,
        queue: state.library.queue,
        favourites: state.library.favourites,
        tracks: state.tracks,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        addAllToQueue: (tracks) => dispatch(addMultipleToQueue(tracks))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(FavouritesScreen));