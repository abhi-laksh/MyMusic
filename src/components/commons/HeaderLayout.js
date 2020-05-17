import React from "react";
import { Text, View } from "react-native";
import { withTheme } from "../globals/ThemeProvider";
import ViewGradient from "./ViewGradient";

const HeaderLayout = ({
    children,
    theme,
    currentTheme,
    style,
    ...others
}) => {
    return (
        <View style={[{ backgroundColor: currentTheme.background }, style]} {...others}>
            {children}
        </View>
    )
}
export default withTheme(HeaderLayout);