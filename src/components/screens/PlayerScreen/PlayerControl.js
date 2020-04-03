import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MyAppText from "../../commons/MyAppText";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/Button";
import SharpBG from "../../commons/SharpBG";
import ActionButton from "./ActionButtons";
import GradientText from "../../commons/GradientText";


const styles = StyleSheet.create({
    parent: {
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    controlsParent: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24
    },
    iconsParent: {
        backgroundColor: "transparent",
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    lyricDrawerButtonGradient: {
        width: 96,
        height: 48,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        alignSelf: "center"
    },
    lyricDrawerButtonGradientView: {
        padding: 0,
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    lyricDrawerButtonSharpBG: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    lyricDrawerButton: {
        height: "100%",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    lyricDrawerGradient: {
        width: "100%",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    lyricDrawerGradientView: {
        width: "100%",
        // padding: 8,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    lyricText: {
        color: "#000",
        height: "100%",
    },
    lyricTextParent: {
        paddingHorizontal: 0,
        backgroundColor: "transparent",
    },
    lyricDrawerButtonSharpBG: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    }
})

function PlayerControl(props) {
    const { theme, currentTheme } = props;
    const [isShuffle, setShuffle] = useState(false);
    const [isLoop, setLoop] = useState(false);

    const iconColor = (currentTheme.text.primary)
    const color = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.secondary.main;

    return (
        <View
            style={styles.parent}
        >
            <View
                style={styles.controlsParent}
            >
                <ActionButton
                    onPress={() => console.log("b10")}
                    activeOpacity={0.5}
                    buttonSize={36}
                >
                    <View
                        style={styles.iconsParent}
                    >
                        <FontelloIcon name="prev" size={24} color={"#fff"} />
                    </View>
                </ActionButton>

                <ActionButton
                    onPress={() => console.log("b10")}
                    activeOpacity={0.5}
                    buttonSize={36}
                >
                    <View
                        style={styles.iconsParent}

                    >
                        <FontelloIcon name="backward-10" size={36} color={"#fff"} />
                    </View>
                </ActionButton>

                {/* PLAY */}
                <ActionButton
                    onPress={() => console.log("play")}
                    activeOpacity={0.5}
                    buttonSize={48}
                >
                    <View
                        style={[
                            styles.iconsParent,
                            {
                                alignItems: "center",
                            }
                        ]}
                    >
                        <FontelloIcon name="play" size={36} color={"#fff"} />
                    </View>
                </ActionButton>

                <ActionButton
                    onPress={() => console.log("b10")}
                    activeOpacity={0.5}
                    buttonSize={36}
                >
                    <View
                        style={styles.iconsParent}
                    >
                        <FontelloIcon name="forward-10" size={36} color={"#fff"} />
                    </View>
                </ActionButton>

                <ActionButton
                    onPress={() => console.log("b10")}
                    activeOpacity={0.5}
                    buttonSize={36}
                >
                    <View
                        style={styles.iconsParent}

                    >
                        <FontelloIcon name="next" size={24} color={"#fff"} />
                    </View>
                </ActionButton>
            </View>

            {/* Lyrics Drower */}
            <View
                style={{
                    width: "100%"
                }}
            >
                <ViewGradient
                    gradientStyle={
                        styles.lyricDrawerButtonGradient
                    }
                    viewStyle={styles.lyricDrawerButtonGradientView}
                    onlyBorder
                    top
                    left
                    right
                >
                    <SharpBG
                        style={styles.lyricDrawerButtonSharpBG}
                        angle={45}
                    />
                    <Button
                        style={styles.lyricDrawerButton}
                        onPress={() => console.log("Playlist")}
                    >
                        <FontelloIcon name="lyrics" size={24} color={iconColor} />
                    </Button>
                </ViewGradient>
                <ViewGradient
                    gradientStyle={styles.lyricDrawerGradient}
                    viewStyle={styles.lyricDrawerGradientView}
                    onlyBorder
                    // borderWidth={1}
                    top
                    left
                    right
                >
                    <GradientText>
                        <MyAppText
                            style={styles.lyricText}
                            parentStyle={styles.lyricTextParent}
                            size={15}
                            numberOfLines={1}
                            variant="bold"
                        >
                            Current Line of lyrics of song which is bring currently played.
                            Current Line of lyrics of song which is bring currently played.
                            </MyAppText>
                    </GradientText>
                </ViewGradient>
            </View>
        </View >
    )
}

export default withTheme(PlayerControl);

/*

*/