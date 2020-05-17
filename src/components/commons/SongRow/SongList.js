import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MyAppText from "../MyAppText";
import SongRow from "./SongRow";


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

    _getItemLayout = (data, index) => ({
        length: 50,
        offset: parseInt(50 * index),
        index
    })

    _keyExtracter = (item) => (item.id);

    _renderItem({ item, index }) {
        return (
            <SongRow
                key={item.id}
                songName={item.title}
                songAuthor={item.artist}
                id={item.id}
                track={item}
                RightSideComponent={this.props.RightSideComponent}
                currentTrack={this.props.currentTrack ? this.props.currentTrack.id : null}
                
            // onPressPlay={this._handleOnPress.bind(this, item)}
            />
        )
    }
    
    render() {
        const {
            tracks,
            ...others
        } = this.props;

        return (
            <FlatList 
                contentContainerStyle={{
                    padding: 16,
                }}
                data={tracks}
                renderItem={this._renderItem}
                // keyExtractor={this._keyExtracter}
                // refreshing={true}
                // getItemLayout={this._getItemLayout}
                // removeClippedSubviews={true}
                updateCellsBatchingPeriod={5}
                // extraData={isActive}
                initialNumToRender={14}
                windowSize={5}
                maxToRenderPerBatch={7}
                numColumns={1}
                // disableVirtualization
                {...others}
            />
        )
    }
}
export default SongList;