import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import TrackPlayer from 'react-native-track-player';

import MiniPlayer from "../../commons/MiniPlayer/MiniPlayer";
import ThemeToggler from "../../commons/ThemeToggler";
import { withTheme } from "../../globals/ThemeProvider";
import Loading from "../../commons/Loading";
import SongList from "../../commons/SongRow/SongList";
import { addToQueue } from "../../../actions/queue";
import CommonBG from "../../CommonBG";


class HomeScreen extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { currentTheme, navigation } = this.props;

        return (
            <View style={{
                flex: 1,
                backgroundColor: currentTheme.background,
            }}>
                <CommonBG>
                    {this.props.newLoad ?
                        <Loading />
                        :
                        <SongList
                            currentTrackId={(this.props.currentTrackId)}
                        />
                    }
                </CommonBG>

                <MiniPlayer
                    navigation={navigation}
                    shuffleAllTracks
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrackId: state.player.currentTrack,
        queue: state.library.queue,
        fetching: state.library.fetching,
        error: state.library.error,
        newLoad: state.library.newLoad,
    };
}

export default connect(mapStateToProps, null)(withTheme(HomeScreen));