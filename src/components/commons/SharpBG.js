import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { withTheme } from '../globals/ThemeProvider';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    parent: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    },
})

function SharpBG(props) {
    const { theme,
        currentTheme,
        angle = 55,
        depth = 4,
        locations = [0.5, 0.5],
        lightContrast = -0.1,
        darkContrast = 0.15,
        colors,
        style,
        transparency = 1,
        ...others } = props;

    const alphaVal = theme.dark.background === currentTheme.background ? darkContrast : lightContrast;
    const boxShadowColor = theme.lightenDarken(alphaVal, theme.hexToRGB(currentTheme.background, transparency));
    return (
        <LinearGradient
            colors={colors || [boxShadowColor, currentTheme.background]}
            style={[
                styles.parent,
                style
            ]}
            angle={angle}
            useAngle
            locations={locations}
            {...others}
        ></LinearGradient>
    );
}
export default withTheme(SharpBG);