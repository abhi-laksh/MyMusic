import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import FontelloIcon from "../FontelloIcon";
import Button from "../Button";
import { withTheme } from "../../globals/ThemeProvider";
import ViewGradient from "../ViewGradient";
import SharpBG from "../SharpBG";



const styles = StyleSheet.create({
    mostParent: {
        width: 60,
        height: 30,
        position: "absolute",
        top: -30,
        left: "50%",
        marginLeft: -30,
        zIndex: 1,
    },
    popTogglerGradient: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        zIndex: 1,
    },
    popTogglerView: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        width: "100%",
        height: "100%",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 1,
    },
    popToggler: {
        width: 120,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    popChildButtonsGradient: {
        width: 40,
        height: 40,
        borderRadius: 24,
        overflow: "hidden",
        padding: 1,
    },
    popChildButtonsView: {
        padding: 0,
        borderRadius: 24,
        overflow: "hidden"
    },
    popButtonSharpBG: {
        borderRadius: 64,
    },
    popButton: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    popButtonSharpBG: {
        borderRadius: 64,
    },
    popButtonSharpBG: {
        borderRadius: 64,
    },
    popButtonSharpBG: {
        borderRadius: 64,
    },
    popButtonSharpBG: {
        borderRadius: 64,
    },
    popButtonSharpBG: {
        borderRadius: 64,
    },
})

class PopsOut extends React.Component {
    constructor(props) {
        super(props);
        this.mode = new Animated.Value(0);
    }
    handlePopsOut = () => {
        Animated.sequence([
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0,
                duration: 200
            })
        ]).start();
    }
    handlePopsIn = () => {
        Animated.sequence([
            Animated.timing(this.mode, {
                toValue: 0,
                duration: 200,
                delay: 2000
            })
        ]).start();
    }
    render() {
        const { theme, currentTheme } = this.props;

        const iconColor = currentTheme.text.primary;

        const rotate = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"]
        });
        const playlistX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [10, -48]
        });
        const playlistY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, -24]
        });
        const heartY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, -60]
        });
        const scale = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0.1, 1]
        });

        return (
            <View
                style={styles.mostParent}
            >

                <ViewGradient
                    gradientStyle={styles.popTogglerGradient}
                    viewStyle={styles.popTogglerView}
                    onlyBorder
                    top
                    left
                    right
                    borderWidth={1}
                >
                    <Button
                        onPress={this.handlePopsOut}
                        // onPressIn={this.handlePopsOut}
                        // onPressOut={this.handlePopsIn}
                        style={styles.popToggler}
                    >
                        <Animated.View
                            style={{
                                transform: [{ rotate: rotate }]
                            }}
                        >
                            <FontelloIcon name="arrow-up" size={12} color={iconColor} />
                        </Animated.View>
                    </Button>
                </ViewGradient>

                <Animated.View
                    style={{
                        position: "absolute",
                        top: playlistY,
                        left: playlistX,
                        transform: [{ scale: scale }],
                    }}
                >
                    <ViewGradient
                        gradientStyle={[
                            styles.popChildButtonsGradient,
                        ]}
                        viewStyle={styles.popChildButtonsView}
                        onlyBorder
                    >
                        <SharpBG style={styles.popButtonSharpBG} />
                        <Button
                            onPress={() => console.log("Button playlist")}
                            style={styles.popButton}
                        >
                            <FontelloIcon name="add-queue" size={18} color={iconColor} />
                        </Button>
                    </ViewGradient>
                </Animated.View>
                <Animated.View
                    style={{
                        position: "absolute",
                        top: heartY,
                        alignSelf: "center",
                        transform: [{ scale: scale }],
                    }}
                >
                    <ViewGradient
                        gradientStyle={styles.popChildButtonsGradient}
                        viewStyle={styles.popChildButtonsView}
                        onlyBorder
                    >
                        <SharpBG style={styles.popButtonSharpBG} />
                        <Button
                            onPress={() => console.log("Button heart")}
                            style={styles.popButton}
                        >
                            <FontelloIcon name="heart" size={18} color={iconColor} />
                        </Button>
                    </ViewGradient>
                </Animated.View>
                <Animated.View
                    style={{
                        position: "absolute",
                        top: playlistY,
                        right: playlistX,
                        transform: [{ scale: scale }],
                    }}
                >

                    <ViewGradient
                        gradientStyle={styles.popChildButtonsGradient}
                        viewStyle={styles.popChildButtonsView}
                        onlyBorder
                    >
                        <SharpBG style={styles.popButtonSharpBG} />
                        <Button
                            onPress={() => console.log("Button close")}
                            style={styles.popButton}
                        >
                            <FontelloIcon name="playlist" size={18} color={iconColor} />
                        </Button>
                    </ViewGradient>
                </Animated.View>
            </View>
        );
    }
}
export default withTheme(PopsOut);

/*
*/