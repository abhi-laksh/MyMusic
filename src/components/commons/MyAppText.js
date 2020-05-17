import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { withTheme } from "../globals/ThemeProvider";


const styles = StyleSheet.create({
    parent: {
        flexDirection: "row",
        paddingHorizontal: 16,
    },
    text: {
        flex: 1,
        flexWrap: "wrap",
    },
})

const MyAppText = ({
    fontName = "montserrat",
    variant = "medium",
    size = 16,
    style,
    children,
    color,
    theme,
    currentTheme,
    parentStyle,
    ...others
}) => {
    const getFontStyles = theme.getFontSettings(fontName, variant, size);
    // const mergeStyle = [getFontStyles, styles.parent, { color: currentTheme.text.primary, }, { ...style }];
    return (
        <View
            style={[
                styles.parent,
                parentStyle
            ]}
        >
            <Text style={[
                getFontStyles,
                styles.text,
                {
                    color: color || currentTheme.text.primary,
                },
                { ...style }
            ]}
                {...others}
            >
                {children}
            </Text>
        </View>
    )
}
export default withTheme(MyAppText);