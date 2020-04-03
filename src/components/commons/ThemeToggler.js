import React, { useState } from 'react';
import { ThemeContext, withTheme } from '../globals/ThemeProvider';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Text, View, StyleSheet } from 'react-native';
import Button from './Button';
import ViewGradient from './ViewGradient';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
    gradientStyle: {
        width: 34,
        height: 16,
        borderRadius: 64,
    },
    gradientStyleView: {
        padding: 0,
        width: "100%",
        height: "100%",
        borderRadius: 64,
        overflow: "hidden"
    },
    gradientStyle: {
        width: 34,
        height: 16,
        borderRadius: 64,
    },
    thumb: {
        width: 16,
        height: "100%",
        borderRadius: 16,
    },
    fullDimension: {
        width: "100%",
        height: "100%",
    }
})

function ThemeToggler(props) {

    const { toggleTheme, currentTheme } = props;
    const isOn = currentTheme.name === "dark";
    const togglerOff = {
        from: {
            transform: [{ translateX: 16 }]
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
            transform: [{ translateX: 16 }]
        }
    }
    return (
        <ViewGradient
            gradientStyle={styles.gradientStyle}
            viewStyle={styles.gradientStyleView}
            onlyBorder={!isOn}
            borderWidth={1}
            angle={30}
        >
            <Button
                onPress={toggleTheme}
                style={styles.fullDimension}
                underlayColor={"transparent"}
            >
                <Animatable.View
                    animation={isOn ? togglerOn : togglerOff}
                    duration={150}
                    style={[styles.thumb, { backgroundColor: currentTheme.text.primary, }]}
                ></Animatable.View>
            </Button>
        </ViewGradient>
    )
}
export default withTheme(ThemeToggler);

/*

function ThemeToggler() {

    const [isOn,setIsOn] = useState(false);
    return (
        <ThemeContext.Consumer>
            {
                ({ currentTheme, toggleTheme }) => {
                    return (
                        <TouchableHighlight
                            onPress={toggleTheme}
                            style={{ backgroundColor: currentTheme.background }}
                        >
                            <Text style={{ color: currentTheme.text.primary }}>
                                Toggle Theme
                            </Text>
                        </TouchableHighlight>
                    )

                }
            }
        </ThemeContext.Consumer>
    )
}





2

*/