import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import MyAppText from "../../commons/MyAppText";
import SongRow from "../../commons/SongRow";
import MiniPlayer from "../../commons/MiniPlayer/MiniPlayer";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import ThemeToggler from "../../commons/ThemeToggler";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/Button";
import SharpBG from "../../commons/SharpBG";
import Thumbnail from "../../commons/Thumbnail";
import GradientText from "../../commons/GradientText";

const styles = StyleSheet.create({
    parent: {
        backgroundColor: "transparent",
    },
    gradientText: {
        flex: 0,
        height: "100%"
    }
})
function ActionButton(props) {
    const {
        children,
        buttonSize = 48,
        buttonStyle,
        gradientStyle,
        gradientViewStyle,
        onPress,
        maskedViewProps,
        maskElement,
        ...others
    } = props;
    return (
        <Button
            underlayColor={"transparent"}
            onPress={onPress}
            style={[
                styles.parent,
                {
                    width: buttonSize,
                    height: buttonSize,
                },
                buttonStyle
            ]}
            {...others}
        >
            <GradientText
                gradientStyle={[
                    styles.gradientText,
                    gradientStyle
                ]}
                gradientViewStyle={gradientViewStyle}
                angle={30}
                locations={[0.15, 1]}
                maskElement={maskElement}
                {...maskedViewProps}
            >
                {/* {children} */}
            </GradientText>
        </Button>
    )
}



export default ActionButton;
/*




*/