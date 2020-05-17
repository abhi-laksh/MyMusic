import React, { useReducer, useState } from 'react';
import _ from 'lodash';
import { View } from 'react-native';
import Button from '../../commons/Button';
import FontelloIcon from '../../commons/FontelloIcon';
import { connect } from 'react-redux';
import { addMultipleToQueue } from '../../../actions/queue';
import { setLoop } from '../../../actions/player';

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

const RepeatButton = ({ style, size = 24, iconColor, activeColor, controls, setLoop }) => {

    const [state, dispatch] = useReducer(repeatReducer, initialState);
    const [count, setCount] = useState(0);

    // const countOnClicks = () => {
    //     setCount(count + 1);
    //     switchRepeaters();
    // }
    // const switchRepeaters = () => {
    //     if (!state.isLoop) {
    //         dispatch({ type: "on" });
    //     }
    //     else if (state.iconName === "loop" && (state.isLoop && state.isToggled !== "loop-1")) {
    //         dispatch({ type: "one" });
    //     }
    //     else if (state.iconName === "loop-1" && (state.isLoop && state.isToggled !== "loop")) {
    //         dispatch({ type: "all" });
    //     }else{
    //         dispatch({ type: "off" });
    //     }
    // }
    const toggleLoop = () => {
        setLoop();
    }
    return (
        <Button
            style={style}
            onPress={toggleLoop}
            activeOpacity={0.5}
            underlayColor={"transparent"} 
        >
            <FontelloIcon
                name={controls.loopType === "all" ? "loop" : "loop-1"}
                size={size}
                color={controls.isLoop ? activeColor : iconColor}
            />
        </Button>
    );
};

function mapStateToProps(state) {
    return {
        controls: state.controls, 
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setLoop: () => dispatch(setLoop())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepeatButton);