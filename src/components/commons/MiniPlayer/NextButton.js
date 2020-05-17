import React, { useState } from 'react';
import { withTheme } from '../../globals/ThemeProvider';
import Button from '../Button';
import FontelloIcon from '../FontelloIcon';
import { View } from 'react-native';
import SharpBG from '../SharpBG';

function NextButton(props) {
    // const [playPause, setPlayPause] = useState(true);
    const { theme, color, currentTheme, disabled, onPress, ...others } = props
    return (
        <View>
            <Button
                onPress={onPress}
                disabled={disabled}
                {...others}
            >
                <FontelloIcon
                    name="next"
                    size={20}
                    color={!disabled ? (color || currentTheme.text.primary) : currentTheme.text.disabled}
                />
            </Button>
        </View>
    );
}
export default withTheme(NextButton);