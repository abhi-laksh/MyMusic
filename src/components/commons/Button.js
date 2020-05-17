import React from 'react';
import { TouchableHighlight } from "react-native-gesture-handler";
// import { TouchableHighlight } from "react-native";
import { withTheme } from '../globals/ThemeProvider';
function Button({ children, disabled, onPress, underlayColor, style, theme, currentTheme, ...others }) {
    const contrastValue = (currentTheme.name === "dark") ? 0.08 : -0.05;
    const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));

    return (
        <TouchableHighlight
            style={[
                { overflow: "hidden" },
                style
            ]}
            disabled={disabled}
            onPress={onPress}
            underlayColor={underlayColor || contrast}
            {...others}
        >
            {children}
        </TouchableHighlight>
    )

}
export default withTheme(Button);