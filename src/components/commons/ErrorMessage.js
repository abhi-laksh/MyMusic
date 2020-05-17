import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { withTheme } from "../globals/ThemeProvider";
import ViewGradient from "./ViewGradient";
import MyAppText from "./MyAppText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        textAlign: "center",
        textTransform: "capitalize",
    },
    textParent: {
        marginTop: 16,
    },
})
const msgTypeIcons = {
    default: "comment-alert-outline",
    track: "file-alert-outline",
    sync: "sync-alert",
    progress: "progress-alert",
}

const ErrorMessage = ({
    theme,
    currentTheme,
    style,
    textStyle,
    textParentStyle,
    type = "default",
    color,
    size = 24,
    iconSize = 64,
    message = "There is an error",
    ...others
}) => {
    const clr = color || theme.pallete.error.main;
    const iconName = msgTypeIcons[type] || msgTypeIcons["default"];

    return (
        <View
            style={[
                styles.parent,
                style
            ]}
        >
            <Icon name={iconName} size={iconSize} color={clr} />
            <MyAppText
                color={clr}
                parentStyle={styles.textParent}
                style={styles.text}
                size={size}
            >
                {message}
            </MyAppText>
        </View>
    )
}
export default withTheme(ErrorMessage);