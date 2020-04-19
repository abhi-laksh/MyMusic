import React from "react";
import { View, FlatList } from "react-native";
import SongRow from "../../commons/SongRow";
import MiniPlayer from "../../commons/MiniPlayer/MiniPlayer";
import ThemeToggler from "../../commons/ThemeToggler";
import { withTheme } from "../../globals/ThemeProvider";
import TrackPlayer from 'react-native-track-player';
import { connect } from "react-redux";
import Loading from "../../commons/Loading";


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    async _handleSongPress(id) {
        await TrackPlayer.skip(String(id));
        TrackPlayer.play();
    }

    _renderItem({ item }) {
        return (
            <SongRow
                key={item.id}
                songName={item.title}
                songAuthor={item.artist}
                id={item.id}
                track={item}
            // onPress={() => this._handleSongPress.bind(this, item.id)}
            />
        )
    }

    render() {
        const { theme, currentTheme, navigation } = this.props;

        return (
            <View style={{
                flex: 1,
                backgroundColor: currentTheme.background,
            }}>
                {this.props.fetching ?
                    <Loading />
                    : <FlatList
                        contentContainerStyle={{
                            padding: 16,
                        }}
                        data={this.props.tracks}
                        renderItem={this._renderItem}
                        // keyExtractor={item => item.id}
                        updateCellsBatchingPeriod={100}
                        refreshing
                    />
                }
                <ThemeToggler />
                <MiniPlayer navigation={navigation} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.library.tracks,
        fetching: state.library.fetching,
        error: state.library.error
    };
}
export default connect(mapStateToProps)(withTheme(HomeScreen));