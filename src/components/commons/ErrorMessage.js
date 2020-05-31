import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { withTheme } from "../globals/ThemeProvider";
import ViewGradient from "./ViewGradient";
import MyAppText from "./MyAppText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from 'react-native-animatable';
import FontelloIcon from "./FontelloIcon";

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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

    reload: "reload-alert",
    restart: "restart-alert",
    restore: "restore-alert",
    progress: "progress-alert",
    track: "disc-alert",
    file: "file-alert",
    sync: "sync-alert",
    wifi: "wifi-strength-1-alert",
    network: "network-strength-1-alert",
    cloud: "cloud-alert",
    cloudOutline: "cloud-alert-outline",

    warning: "alert-outline",
    fileOutline: "file-alert-outline",
    message: "message-alert-outline",
    folder: "folder-alert-outline",
    clipboard: "clipboard-alert-outline",
    delete: "delete-alert-outline",
    signal: "signal-off",
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
            <FontelloIcon name={iconName} size={iconSize} color={clr} />
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