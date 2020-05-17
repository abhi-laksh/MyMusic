import React from 'react';
import { TouchableHighlight } from "react-native";
// import { TouchableHighlight } from "react-native";
import { withTheme } from '../../globals/ThemeProvider';
function Button(props) {
    const { children, disabled, onPress, underlayColor, style, theme, currentTheme, ...others } = props;
    const contrastValue = (currentTheme.name === "dark") ? 0.08 : -0.05;
    const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));

    return (
        <TouchableHighlight
            style={[
                { overflow: "hidden", opacity: disabled ? 0.7 : 1 },
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