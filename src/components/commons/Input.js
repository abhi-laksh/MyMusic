import React from 'react';
// import { TouchableHighlight } from "react-native";
import { withTheme } from '../globals/ThemeProvider';
import ViewGradient from './ViewGradient';
import { TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    gradientStyle: {
        // padding: 0
        borderRadius: 6,
    },
    viewStyle: {
        padding: 0,
        height: 48,
        borderRadius: 6,
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
    },
    inputStyle: {
        paddingHorizontal: 16,
        fontSize: 16,
        flexGrow: 1
    },
})

function Input(props) {
    const {
        children,
        disabled = false,
        inputStyle,
        viewStyle,
        gradientStyle,
        gradientProps,
        theme,
        currentTheme,
        ...others
    } = props;

    const contrastValue = (currentTheme.name === "dark") ? 0.08 : -0.05;

    const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));
    const themeColor = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.primary.light
    const color = currentTheme.text.primary
    return (
        <ViewGradient
            gradientStyle={[
                styles.gradientStyle,
                gradientStyle
            ]}
            viewStyle={[
                styles.viewStyle,
                viewStyle
            ]}
            onlyBorder
            borderWidth={1}
            disabled={disabled}
            {...gradientProps}
        >
            <TextInput
                style={[
                    styles.inputStyle,
                    { color: color, },
                    inputStyle
                ]}
                selectionColor={themeColor}
                // disabled={disabled}
                editable={!disabled}
                maxLength={255}
                placeholderTextColor={color}

                {...others}
            />
            {disabled && <Icon name="cancel" style={{ paddingHorizontal: 8 }} size={24} color={theme.pallete.error.main} />}
        </ViewGradient>
    )

}
export default withTheme(Input);