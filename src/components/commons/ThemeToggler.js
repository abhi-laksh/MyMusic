import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { ThemeContext, withTheme } from '../globals/ThemeProvider';
import Button from './SubMenu/Button';
import ViewGradient from './ViewGradient';
import FontelloIcon from './FontelloIcon';

const styles = StyleSheet.create({
    gradientStyle: {
        width: 64,
        height: 64,
        borderRadius: 64,
    },
    subParent: {
        borderWidth: 2,
        width: 80,
        height: 80,
        borderRadius: 80,
        overflow: "visible",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dayView: {
        width: 48,
        height: 48,
        borderRadius: 64,
        marginLeft: -24,
        borderRadius: 64,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    nightView: {
        width: 48,
        height: 48,
        borderRadius: 64,
        borderRadius: 64,
        marginLeft: 24,
        alignItems: "center",
        borderWidth: 2,
        justifyContent: "center",
    },
    fullDimension: {
        // backgroundColor: "#f95850",
        overflow: "visible",
    }
})

function ThemeToggler({ toggleTheme, theme, currentTheme }) {

    const zoomIn = {
        from: {
            transform: [{ scale: 0.7 }],
        },
        to: {
            transform: [{ scale: 1 }],
        }
    }

    const zoomOut = {
        from: {
            transform: [{ scale: 1 }],
        },
        to: {
            transform: [{ scale: 0.7 }],
        }
    }
    const isDark = currentTheme.name === "dark";
    const primary = theme.pallete.primary.main;
    const secondary = theme.pallete.secondary.main;

    const alphaVal = isDark ? 0.3 : -0.3;
    const contrast = theme.lightenDarken(alphaVal, theme.hexToRGB(currentTheme.background));

    return (
        <Button
            onPress={toggleTheme}
            style={styles.fullDimension}
            underlayColor={"transparent"}
        >
            <View
                style={[
                    styles.subParent,
                    {
                        borderColor: contrast,
                    }
                ]}
            >
                <Animatable.View
                    style={[
                        styles.dayView,
                        {
                            backgroundColor: currentTheme.background,
                            borderColor: !isDark ? primary : "transparent",
                        }
                    ]}
                    animation={!isDark ? zoomIn : zoomOut}
                    useNativeDriver
                    duration={100}
                >
                    <FontelloIcon
                        name={"day"}
                        color={primary}
                        size={36}
                    />
                </Animatable.View>
                <Animatable.View
                    style={[
                        styles.nightView
                        , {
                            backgroundColor: currentTheme.background,
                            borderColor: isDark ? secondary : "transparent",
                        }
                    ]}
                    animation={isDark ? zoomIn : zoomOut}
                    useNativeDriver
                    duration={100}
                >
                    <FontelloIcon
                        name={"night"}
                        color={secondary}
                        size={32}
                    />
                </Animatable.View>
            </View>
        </Button>
    )
}
export default withTheme(ThemeToggler);



/*

function ThemeToggler({ toggleTheme, theme, currentTheme }) {

    const zoomIn = {
        from: {
            transform: [{ scale: 0.7 }],
        },
        to: {
            transform: [{ scale: 1 }],
        }
    }

    const zoomOut = {
        from: {
            transform: [{ scale: 1 }],
        },
        to: {
            transform: [{ scale: 0.7 }],
        }
    }
    const isDark = currentTheme.name === "dark";
    const colorForTheme = !isDark ? theme.pallete.primary.main : theme.pallete.secondary.main;
    const alphaVal = isDark ? 0.3 : -0.3;
    const contrast = theme.lightenDarken(alphaVal, theme.hexToRGB(currentTheme.background));

    return (
        <Button
            onPress={toggleTheme}
            style={styles.fullDimension}
            underlayColor={"transparent"}
        >
            <View
                style={{
                    borderColor: contrast,
                    borderWidth: 2,
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    overflow: "visible",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // backgroundColor:"#aaa"
                }}
            >
                <Animatable.View
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 64,
                        backgroundColor: currentTheme.background,
                        borderColor: !isDark ? colorForTheme : "transparent",
                        // backgroundColor: "#484582",
                        marginLeft: -24,
                        borderRadius: 64,
                        // marginTop: 9,
                        // position: "absolute",
                        borderWidth: 2,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    animation={!isDark ? zoomIn : zoomOut}
                    useNativeDriver
                    duration={100}
                >
                    <FontelloIcon
                        name={"day"}
                        color={theme.pallete.primary.main}
                        size={36}
                    />
                </Animatable.View>
                <Animatable.View
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 64,
                        backgroundColor: currentTheme.background,
                        borderColor: isDark ? colorForTheme : "transparent",
                        // backgroundColor: "#666",
                        borderRadius: 64,
                        marginLeft: 24,
                        // position: "absolute",
                        // marginTop: 9,
                        alignItems: "center",
                        borderWidth: 2,
                        justifyContent: "center",
                    }}
                    animation={isDark ? zoomIn : zoomOut}
                    useNativeDriver
                    duration={100}
                >
                    <FontelloIcon
                        name={"night"}
                        color={theme.pallete.secondary.main}
                        size={32}
                    />
                </Animatable.View>
            </View>
        </Button>
    )
}
export default withTheme(ThemeToggler);















toggleDarkAnim = () => {
        Animated.timing(anim, {
            toValue: 1,
            duration: 100,
        }).start(({ finished }) => {
            if (finished) {
                console.log(finished, "toggleDarkAnim");
                toggleTheme();
            }
        })
    }
    toggleLightAnim = () => {
        Animated.timing(anim, {
            toValue: 0,
            duration: 100,
        }).start(({ finished }) => {
            if (finished) {
                console.log(finished, "toggleLightAnim");
                toggleTheme();
            }
        })
    }









function ThemeToggler({ toggleTheme, theme, currentTheme }) {

    const isDark = currentTheme.name === "dark";
    const colorForTheme = !isDark ? theme.pallete.primary.main : theme.pallete.secondary.main;

    const togglerOff = {
        from: {
            transform: [{ translateX: 36 }]
        },
        to: {
            transform: [{ translateX: 0 }]
        }
    }
    const togglerOn = {
        from: {
            transform: [{ translateX: 0 }]
        },
        to: {
            transform: [{ translateX: 36 }]
        }
    }
    return (
        <ViewGradient
            gradientStyle={styles.gradientStyle}
            viewStyle={styles.gradientStyleView}
            onlyBorder={!isDark}
            borderWidth={1}
            angle={30}
        >
            <Button
                onPress={toggleTheme}
                style={styles.fullDimension}
                underlayColor={"transparent"}
            >
                <Animatable.View
                    animation={isDark ? togglerOn : togglerOff}
                    duration={150}
                    style={[styles.thumb, { backgroundColor: "#fff", }]}
                >
                    <FontelloIcon
                        name={!isDark ? "day" : "night"}
                        color={colorForTheme}
                        size={37}
                    />
                </Animatable.View>
            </Button>
        </ViewGradient>
    )
}



2

*/