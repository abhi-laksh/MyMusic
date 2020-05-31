import React from "react";
import { View, StyleSheet } from "react-native";
import TrackPlayer from 'react-native-track-player';
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import MyAppText from "../../commons/MyAppText";
import Button from "../../commons/Button";
import FontelloIcon from "../../commons/FontelloIcon";
import { addMultipleToQueue } from "../../../actions/queue";
import { withTheme } from "../../globals/ThemeProvider";
import GradientText from "../../commons/GradientText";
import ErrorMessage from "../../commons/ErrorMessage";
import ViewGradient from "../../commons/ViewGradient";

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: "center"
    },
    flexZero: {
        flex: 0
    },
    addButton: {
        // flex: 0,
        marginTop: 24,
        width: "60%",
        alignSelf: "center",
        borderRadius: 8,
    },
    addButtonGradient: {
        padding: 0,
        borderRadius: 8,
    },
    textParent: {
        paddingVertical: 8,
        paddingHorizontal: 0,
    },
    textCenter: {
        textAlign: "center"
    },
});
const ErrorLyrics = ({ type, navigation, message, errorStyle, style, color, iconColor, ...others }) => {

    const navigateToLyricsEdit = () => {
        navigation.navigate("LyricsAddScreen");
    }

    return (
        <View
            style={[
                {
                    flex: 1,
                    justifyContent: "center"
                },
                style
            ]}
        >
            <ErrorMessage
                type={type}
                message={message}
                style={errorStyle}
                type={type}
                color={color}
                {...others}
            />
            <ViewGradient
                gradientStyle={{
                    borderRadius: 36,
                    width: "60%",
                    marginTop: 24,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                viewStyle={{
                    padding: 0,
                    borderRadius: 36,
                    overflow: "hidden",
                }}
                onlyBorder
            >
                <Button
                    style={{
                        height: 36,
                    }}
                    onPress={navigateToLyricsEdit}
                    activeOpacity={0.7}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Icon
                            name="plus-circle-outline"
                            size={20}
                            color={iconColor}
                        />
                        <MyAppText
                            size={14}
                            parentStyle={{
                                // backgroundColor: "#666",
                                // flex: 0,
                                // flexGrow: 0,
                                paddingHorizontal: 0,
                                marginLeft: 8,
                            }}
                            variant="semiBold"
                            style={{
                                // backgroundColor: "#66a",
                                flex: 0,
                            }}
                        // color={"#fff"}
                        >
                            Add Manually
                        </MyAppText>
                    </View>
                </Button>
            </ViewGradient>
            <ViewGradient
                gradientStyle={{
                    borderRadius: 36,
                    width: "60%",
                    marginTop: 24,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                viewStyle={{
                    padding: 0,
                    borderRadius: 36,
                    overflow: "hidden",
                }}
                onlyBorder
            >
                <Button
                    style={{
                        height: 36,
                    }}
                    // onPress={navigateToLyricsEdit}
                    onPress={() => { }}
                    activeOpacity={0.7}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FontelloIcon
                            name="search"
                            size={14}
                            color={iconColor}
                        />
                        <MyAppText
                            size={14}
                            parentStyle={{
                                // backgroundColor: "#666",
                                // flex: 0,
                                // flexGrow: 0,
                                paddingHorizontal: 0,
                                marginLeft: 8,
                            }}
                            variant="semiBold"
                            style={{
                                // backgroundColor: "#66a",
                                flex: 0,
                            }}
                        // color={"#fff"}
                        >
                            Search Online
                        </MyAppText>
                    </View>
                </Button>
            </ViewGradient>
        </View >
    );
};

export default ErrorLyrics;