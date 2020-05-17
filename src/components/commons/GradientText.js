import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { withTheme } from "../globals/ThemeProvider";
import MaskedView from '@react-native-community/masked-view';
import SharpBG from "./SharpBG";
import ViewGradient from "./ViewGradient";

const styles = StyleSheet.create({
    maskedView: {
        flexDirection: "row",
    },
    viewGradient: {
        flex: 1,
        height: "auto",
    },
})


const GradientText = ({
    children,
    maskedStyle,
    gradientStyle,
    gradientViewStyle,
    angle = 90,
    locations,
    gColors,
    ...others
}) => {
    // console.log(`GradientText`, children)
    return (
        <MaskedView
            style={[
                styles.maskedView,
                maskedStyle
            ]}
            maskElement={children}
            {...others}
        >
            <ViewGradient
                gradientStyle={[
                    styles.viewGradient,
                    gradientStyle,
                ]}
                angle={angle}
                locations={locations}
                gColors={gColors}
                viewStyle={[
                    gradientViewStyle,
                ]}

            ></ViewGradient>
        </MaskedView>
    )
}

export default GradientText;
/*

const GradientText = (props) => {
    const {
        children,
        maskedStyle,
        gradientStyle,
        gradientViewStyle,
        theme,
        currentTheme,
        angle = 90,
        locations,
        gColors,
        ...others
    } = this.props;
    // console.log(`GradientText`, children)
    return (
        <MaskedView
            style={[
                styles.maskedView,
                maskedStyle
            ]}
            maskElement={children}
            {...others}
        >
            <ViewGradient
                gradientStyle={[
                    styles.viewGradient,
                    gradientStyle,
                ]}
                angle={angle}
                locations={locations}
                gColors={gColors}
                viewStyle={{}}
                viewStyle={[
                    gradientViewStyle,
                ]}

            ></ViewGradient>
        </MaskedView>
    )
}
*/