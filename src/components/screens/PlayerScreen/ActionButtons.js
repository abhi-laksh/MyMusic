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

export default function ActionButton(props) {
    const {
        children,
        buttonSize = 48,
        buttonStyle,
        gradientStyle,
        gradientViewStyle,
        onPress,
        maskedViewProps,
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
                {...maskedViewProps}
            >
                {children}
            </GradientText>
        </Button>
    )
}

/*

        <ViewGradient
            gradientStyle={[
                {
                    width: buttonSize,
                    height: buttonSize,
                    borderRadius: buttonSize,
                },
                (top ? { top: top } : null),
                (left ? { left: left } : null),
                (bottom ? { bottom: bottom } : null),
                (right ? { right: right } : null),
                gradientStyle
            ]}
            viewStyle={[
                {
                    padding: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: buttonSize,
                },
                gradientViewStyle

            ]}
            onlyBorder={isToggler ? (typeof toggle === "boolean" && !toggle) : true}
            borderWidth={borderWidth}
        >
            {
                (!isToggler || (!toggle))
                    ? (
                        <SharpBG
                            style={{
                                borderRadius: buttonSize,
                            }}
                            angle={60}
                        />
                    )
                    : null
            }

            <Button
                style={[
                    {
                        height: "100%",
                        borderRadius: buttonSize,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    buttonStyle
                ]}
                onPress={onPress}
            >
                {children}
            </Button>
        </ViewGradient>
*/