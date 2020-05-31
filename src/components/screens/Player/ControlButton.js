import React, { useReducer, useState } from 'react';
import _ from 'lodash';
import { View } from 'react-native';
import Button from '../../commons/Button';
import FontelloIcon from '../../commons/FontelloIcon';
import { connect } from 'react-redux';
import { addMultipleToQueue } from '../../../actions/queue';
import { setLoop, switchControls } from '../../../actions/player';

const initialState = { iconName: "loop", isLoop: false, isToggled: null };

function repeatReducer(state, action) {
    switch (action.type) {
        case 'on':
            return { ...state, isLoop: true, isToggled: state.iconName };
        case 'all':
            return { ...state, iconName: "loop", isLoop: true, isToggled: state.iconName };
        case 'one':
            return { ...state, iconName: "loop-1", isLoop: true, isToggled: state.iconName };
        case 'off':
            return { ...state, isLoop: false };
        default:
            return state;
    }
}

const ControlButton = ({ style, size = 24, iconColor, activeColor, setControlType, controlType, ...props }) => {


    const toggleControls = () => {
        setControlType();
    }

    const icon = (controlType === "shuffle")
        ? "shuffle"
        : (controlType === "loop-all") ? "loop" : "loop-1";

    return (
        <Button
            style={style}
            onPress={toggleControls}
            activeOpacity={0.5}
            underlayColor={"transparent"}
        >
            <FontelloIcon
                name={icon}
                size={size}
                color={activeColor}
            />
        </Button>
    );
};

function mapStateToProps(state) {
    return {
        controlType: state.player.controlType,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setControlType: () => dispatch(switchControls())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlButton);