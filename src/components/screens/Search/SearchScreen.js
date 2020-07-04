import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from '../../globals/ThemeProvider';
import MyAppText from '../../commons/MyAppText';
import Header from './Header';
import SongList from '../../commons/SongRow/SongList';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 0,
        paddingBottom: 0,
    },
    childView: {
        // flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});
class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searchText: "",
        }
        this.onSearching = this.onSearching.bind(this);
        this.findTrackFromSearch = this.findTrackFromSearch.bind(this);
    }

    onSearching(val) {
        this.setState(
            () => ({ searchText: val }),
            () => { this.findTrackFromSearch() }
        );
    }
    findTrackFromSearch() {
        const results = this.props.tracks.allIds.filter((item => {
            const track =  this.props.tracks.byId[item];
            return track && track.title.toLowerCase().match(this.state.searchText.toLowerCase());
        }))
        this.setState(() => ({
            searchResults: results
        }));
    }


    render() {
        const { currentTheme, navigation, tracks, currentTrack } = this.props
        return (
            <View style={{
                flex: 1,
            }}>
                {/* //TODO : Highlight Text on search */}
                <Header searchText={this.state.searchText} onSearching={this.onSearching} />
                <View style={[styles.parent, { backgroundColor: currentTheme.background }]}>
                    <SongList
                        trackIds={this.state.searchText.length > 0 ? this.state.searchResults : []}
                        currentTrackId={this.props.currentTrackId}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrackId: state.player.currentTrack,
        tracks: state.tracks,
    };
}

export default connect(mapStateToProps)(withTheme(SearchScreen));
