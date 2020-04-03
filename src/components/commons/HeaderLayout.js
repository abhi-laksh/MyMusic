import React from "react";
import { Text, View } from "react-native";
import { withTheme } from "../globals/ThemeProvider";
import ViewGradient from "./ViewGradient";

const HeaderLayout = (props) => {
    const {
        children,
        theme,
        currentTheme,
        style,
        ...others
    } = props;

    return (
        <View style={[{ backgroundColor: currentTheme.background }, style]} {...others}>
            {children}
        </View>
    )
}
export default withTheme(HeaderLayout);