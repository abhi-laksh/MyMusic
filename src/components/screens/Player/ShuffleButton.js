import React, { Component, PureComponent } from 'react';
import _ from 'lodash';
import { View } from 'react-native';
import Button from '../../commons/Button';
import FontelloIcon from '../../commons/FontelloIcon';
import { connect } from 'react-redux';
import { addMultipleToQueue } from '../../../actions/queue';
import { setShuffle } from '../../../actions/player';



const ShuffleButton = ({ style, size = 24, iconColor, tracks,activeColor, controls, setShuffle ,...others}) => {
    
    const toggleShuffle = () => {
        setShuffle();
    }
    return (
            <Button
                style={style}
                onPress={toggleShuffle}
                activeOpacity={0.5}
                underlayColor={"transparent"}
                {...others}
            >
                <FontelloIcon name="shuffle" size={size} color={controls.isShuffle ? activeColor : iconColor} />
            </Button>
        );
}


/*class ShuffleButton extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleShuffle = this.toggleShuffle.bind(this);
        // this.shuffleTracks = this.shuffleTracks.bind(this);
        this.state = {
            isShuffle: false,
        }
    }
    toggleShuffle() {
        let isShuffle = this.state.isShuffle;
        this.setState(
            () => ({ isShuffle: !isShuffle }),
            () => { this.shuffleTracks(); }
        )
    }
    shuffleTracks() {
        if (this.state.isShuffle) {
            this.props.addMultipleToQueue(_.shuffle(this.props.tracks));
        } else {
            this.props.addMultipleToQueue(this.props.tracks);
        }
    }
    render() {
        const { style, iconColor, activeColor, size = 20, ...others } = this.props;
        return (
            <Button
                style={style}
                onPress={this.toggleShuffle}
                activeOpacity={0.5}
                underlayColor={"transparent"}
                {...others}
            >
                <FontelloIcon name="shuffle" size={size} color={this.state.isShuffle ? activeColor : iconColor} />
            </Button>
        );
    }
}*/

function mapStateToProps(state) {
    return {
        currentTrack: state.player.currentTrack,
        tracks: state.library.tracks,
        controls:state.controls
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setShuffle: () => dispatch(setShuffle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShuffleButton);