import React, { useState } from 'react';
import { withTheme } from '../../globals/ThemeProvider';
import Button from '../Button';
import FontelloIcon from '../FontelloIcon';
import SharpBG from '../SharpBG';
import { View } from 'react-native';

function PlayPauseButton(props) {
    const { theme, currentTheme, isPlaying = false, color, onPress, ...others } = props;
    return (
        <View>
            {/* <SharpBG style={{ borderRadius: 0, }} angle={45} /> */}
            <Button
                onPress={onPress}
                {...others}
            >
                <FontelloIcon name={isPlaying ? "pause" : "play-my"} size={20} color={color || currentTheme.text.primary} />
            </Button>
        </View>
    );
}
export default withTheme(PlayPauseButton); 