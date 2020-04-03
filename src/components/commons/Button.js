import React from 'react';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { withTheme } from '../globals/ThemeProvider';

function Button(props) {
    const { children, disabled, onPress, underlayColor, style, theme, currentTheme, ...others } = props;
    const contrastValue = (theme.dark.background === currentTheme.background) ? 0.15 : -0.05;
    const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));

    return (
        <TouchableHighlight
            style={[
                { overflow: "hidden" },
                style
            ]}
            disabled={disabled}
            onPress={onPress}
            // underlayColor={underlayColor || "#888"}
            underlayColor={underlayColor || contrast}
            {...others}
        >
            {children}
        </TouchableHighlight>
    )

}
export default withTheme(Button);