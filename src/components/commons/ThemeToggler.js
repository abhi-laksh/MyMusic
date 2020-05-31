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
});

class ThemeToggler extends React.PureComponent {
    constructor(props) {
        super(props);

        this.refNight = null;
        this.refDay = null;

        this.zoomIn = {
            from: {
                transform: [{ scale: 0.7 }],
            },
            to: {
                transform: [{ scale: 1 }],
            }
        }

        this.zoomOut = {
            from: {
                transform: [{ scale: 1 }],
            },
            to: {
                transform: [{ scale: 0.7 }],
            }
        }
        this.state = {
            themeName: "light",
        }
        this.setDayRef = this.setDayRef.bind(this);
        this.setNightRef = this.setNightRef.bind(this);
        this.toggleAnimation = this.toggleAnimation.bind(this);

    }

    setDayRef(ref) { this.refDay = ref; }
    
    setNightRef(ref) { this.refNight = ref; }

    toggleAnimation(isDark, next = () => { }) {
        return () => {
            if (isDark) {
                console.log("In")
                this.refDay.animate(this.zoomIn);
                this.refNight.animate(this.zoomOut);
                next();
            } else {
                console.log("OUT")
                this.refDay.animate(this.zoomOut);
                this.refNight.animate(this.zoomIn);
                next();
            }
        }
    }

    render() {

        const { toggleTheme, theme, currentTheme } = this.props;
        const isDark = currentTheme.name === "dark";
        // const isDark = this.state.themeName === "dark";
        const primary = theme.pallete.primary.main;
        const secondary = theme.pallete.secondary.main;

        const alphaVal = isDark ? 0.3 : -0.3;
        const contrast = theme.lightenDarken(alphaVal, theme.hexToRGB(currentTheme.background));

        return (
            <Button
                onPress={this.toggleAnimation(isDark, toggleTheme)}
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
                        ref={this.setDayRef}
                        style={[
                            styles.dayView,
                            {
                                backgroundColor: currentTheme.background,
                                borderColor: !isDark ? primary : "transparent",
                            },
                            (isDark) ? {
                                transform: [{ scale: 0.7 }],
                            } : null
                        ]}
                        // animation={!isDark ? zoomIn : zoomOut}
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
                        ref={this.setNightRef}
                        style={[
                            styles.nightView,
                            {
                                backgroundColor: currentTheme.background,
                                borderColor: isDark ? secondary : "transparent",
                            },
                            (!isDark) ? {
                                transform: [{ scale: 0.7 }],
                            } : null
                        ]}
                        // animation={isDark ? zoomIn : zoomOut}
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
            </Button >
        )
    }
}

export default withTheme(ThemeToggler);

/*
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



*/