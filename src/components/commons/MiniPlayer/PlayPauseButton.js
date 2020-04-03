import React, { useState } from 'react';
import { withTheme } from '../../globals/ThemeProvider';
import Button from '../Button';
import FontelloIcon from '../FontelloIcon';
import SharpBG from '../SharpBG';
import { View } from 'react-native';

function PlayPauseButton(props) {
    const [playPause, setPlayPause] = useState(true);
    const { theme, currentTheme, color, ...others } = props
    const button = (
        <View>
            <SharpBG style={{ borderRadius: 0, }} angle={45} />
            <Button
                onPress={() => setPlayPause(!playPause)}
                {...others}
            >
                <FontelloIcon name={playPause ? "pause" : "play"} size={20} color={color || currentTheme.text.primary} />
            </Button>
        </View>
    );

    return button;
}
export default withTheme(PlayPauseButton); 