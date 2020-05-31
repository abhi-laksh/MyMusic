import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MyAppText from "../MyAppText";
import SongRow from "./SongRow";
import { connect } from "react-redux";


const styles = StyleSheet.create({
    songNameView: {
        justifyContent: "center",
        flexGrow: 1,
        height: "100%",
    },
})

class SongList extends React.PureComponent {

    constructor(props) {
        super(props);
        this._getItemLayout = this._getItemLayout.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._keyExtracter = this._keyExtracter.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    // console.log((this.props.songName !== nextProps.songName) , this.props.songName.substring(0,50))
    //     return (
    //         (this.props.songName !== nextProps.songName)
    //         || (this.props.songAuthor !== nextProps.songAuthor)
    //         || (this.props.isActive !== nextProps.isActive)
    //         || (this.props.activeColor !== nextProps.activeColor)
    //     )
    // }

    _getItemLayout(data, index) {
        return ({
            length: 50,
            offset: parseInt(50 * index),
            index
        })
    }

    _keyExtracter(item) { return (item) };

    _renderItem({ item, index }) {
        let track = this.props.tracks && this.props.tracks.byId[item];
        return track ? (
            <SongRow
                key={item}
                songName={track && track.title}
                songAuthor={track && track.artist}
                id={item}
                track={track}
                RightSideComponent={this.props.RightSideComponent}
                currentTrackId={this.props.currentTrackId}
            />
        ) : null;
    }

    render() {
        const {
            trackIds,
            ...others
        } = this.props;
        return (
            <FlatList
                contentContainerStyle={{
                    padding: 16,
                }}
                data={trackIds || (this.props.tracks && this.props.tracks.allIds)}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtracter}
                // refreshing={true}
                // getItemLayout={this._getItemLayout}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={30}
                // extraData={isActive}
                initialNumToRender={20}
                windowSize={7}
                maxToRenderPerBatch={1}
                numColumns={1}
                // disableVirtualization
                {...others}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.tracks,
    };
}
export default connect(mapStateToProps)(SongList);