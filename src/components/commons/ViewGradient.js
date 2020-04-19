import React from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { withTheme } from '../globals/ThemeProvider';

const ViewGradient = (props) => {
    const { children,
        gradientStyle,
        disabled,
        viewStyle,
        locations,
        currentTheme,
        textStyle,
        angle = 90,
        theme,
        gColors,
        borderWidth = 2,
        onlyBorder = false,
        top = false,
        left = false,
        bottom = false,
        right = false,
        ...others } = props;

    const colors = (gColors ? gColors : theme ? ([theme.pallete.primary.main, theme.pallete.secondary.main]) : (["#aaa", "#000"]));

    const all = (!top && !left && !bottom && !right) ? true : false;

    return (
        <LinearGradient
            colors={!disabled ? colors : [currentTheme.text.disabled, currentTheme.text.disabled]}
            style={[
                (disabled ? { opacity: 0.85 } : null),
                {
                    padding: all ? borderWidth : 0,
                },
                (
                    (!all) ? {
                        paddingTop: top ? borderWidth : 0,
                        paddingBottom: bottom ? borderWidth : 0,
                        paddingLeft: left ? borderWidth : 0,
                        paddingRight: right ? borderWidth : 0,
                    } : null
                ),
                gradientStyle
            ]}
            angle={angle}
            locations={locations}
            useAngle
        >

            <View style={[
                {
                    backgroundColor: (!onlyBorder) ? "transparent" : currentTheme.background,
                    padding: 12,
                },
                viewStyle
            ]}
                {...others}
            >
                {children}
            </View>
        </LinearGradient>
    )
};

export default withTheme(ViewGradient);