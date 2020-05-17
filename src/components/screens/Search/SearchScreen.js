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
        const results = this.props.tracks.filter((item => {
            return item.title.toLowerCase().match(this.state.searchText.toLowerCase());
        }))
        this.setState(() => ({
            searchResults: results
        }));
    }


    render() {
        // console.log("SEARCH SCREEN:::", this.state.searchText, this.state.searchResults)
        const { currentTheme, navigation, tracks, currentTrack } = this.props
        return (
            <View style={{
                flex: 1,
            }}>
                {/* //TODO : Highlight Text on search */}
                <Header searchText={this.state.searchText} onSearching={this.onSearching} />
                <View style={[styles.parent, { backgroundColor: currentTheme.background }]}>
                    <SongList
                        tracks={this.state.searchText.length > 0 ? this.state.searchResults : []}
                        currentTrack={currentTrack}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrack: state.player.currentTrack,
        tracks: state.library.tracks,
    };
}

export default connect(mapStateToProps)(withTheme(SearchScreen));
