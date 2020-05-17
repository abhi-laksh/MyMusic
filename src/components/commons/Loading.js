import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { withTheme } from "../globals/ThemeProvider";
import MyAppText from "./MyAppText";
import FontelloIcon from "./FontelloIcon";
import ViewGradient from "./ViewGradient";
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "react-native/Libraries/NewAppScreen";

function Loading({ currentTheme, theme } ) {
    const hieght_0 = {
        0: {
            opacity: 1,
        },
        0.5: {
            opacity: 0.45,
        },
        1: {
            opacity: 1,
        }
    }
    // console.log("Loading")

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    // flexDirection: "row",
                    // justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "70%",
                }}
            >
                <Animatable.View
                    style={{
                        // transform: [{ rotate: 15 }],
                    }}
                    animation={'pulse'}
                    iterationCount={'infinite'}
                    duration={500}
                    delay={500}
                    useNativeDriver
                >
                    <FontelloIcon name={"add-playlist"} size={64} color={currentTheme.text.primary} />
                    {/* <Icon name={"headphones"} size={64} color={currentTheme.text.primary} /> */}
                </Animatable.View>

                <Animatable.Text
                    style={{
                        marginTop: 16,
                        fontFamily: theme.font.montserrat.bold,
                        fontSize: 24, 
                        color: currentTheme.text.primary,
                        textAlign: "center",
                    }}
                    animation={'fadeInUp'}
                    duration={500}
                    // iterationCount={'infinite'}
                    useNativeDriver
                    delay={0}
                >
                    Bas <Text style={{ color: theme.pallete.primary.main }}>30</Text> saal ki mohlat do...
                </Animatable.Text>
            </View>
        </View>

    )

}

export default withTheme(Loading);


/*

                <Animatable.View
                    style={{
                        // transform: [{ rotate: 15 }],
                        height: 16,
                    }}
                    animation={hieght_0}
                    iterationCount={'infinite'}
                    duration={1000}
                    delay={0}
                >
                    <ViewGradient
                        gradientStyle={{
                            borderRadius: 4,
                        }}
                        viewStyle={{
                            padding: 0,
                            width: 4,
                            height: "100%",
                            borderTopLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            overflow: "hidden",
                        }}
                        angle={190}
                    // onlyBorder
                    // borderWidth={1}
                    >
                    </ViewGradient>
                </Animatable.View>
                <Animatable.View
                    style={{
                        // transform: [{ rotate: 15 }],
                        height: 32
                    }}
                    animation={hieght_0}
                    iterationCount={'infinite'}
                    duration={1000}
                    delay={200}
                >
                    <ViewGradient
                        gradientStyle={{
                            borderRadius: 4,
                        }}
                        viewStyle={{
                            padding: 0,
                            width: 4,
                            height: "100%",
                            borderTopLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            overflow: "hidden",
                        }}
                        angle={190}
                    // onlyBorder
                    // borderWidth={1}
                    >
                    </ViewGradient>
                </Animatable.View>
                <Animatable.View
                    style={{
                        // transform: [{ rotate: 15 }],
                        height: 80
                    }}
                    animation={hieght_0}
                    iterationCount={'infinite'}
                    duration={1000}
                    delay={450}
                >
                    <ViewGradient
                        gradientStyle={{
                            borderRadius: 4,
                        }}
                        viewStyle={{
                            padding: 0,
                            width: 4,
                            height: "100%",
                            borderTopLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            overflow: "hidden",
                        }}
                        angle={190}
                    // onlyBorder
                    // borderWidth={1}
                    >
                    </ViewGradient>
                </Animatable.View>
                <Animatable.View
                    style={{
                        // transform: [{ rotate: 15 }],
                        height: 48
                    }}
                    animation={hieght_0}
                    iterationCount={'infinite'}
                    duration={1000}
                    delay={650}
                >
                    <ViewGradient
                        gradientStyle={{
                            borderRadius: 4,
                        }}
                        viewStyle={{
                            padding: 0,
                            width: 4,
                            height: "100%",
                            borderTopLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            overflow: "hidden",
                        }}
                        angle={190}
                    // onlyBorder
                    // borderWidth={1}
                    >
                    </ViewGradient>
                </Animatable.View>
                <Animatable.View
                    style={{
                        // transform: [{ rotate: 15 }],
                        height: 32
                    }}
                    animation={hieght_0}
                    iterationCount={'infinite'}
                    duration={1000}
                    delay={800}
                >
                    <ViewGradient
                        gradientStyle={{
                            borderRadius: 4,
                        }}
                        viewStyle={{
                            padding: 0,
                            width: 4,
                            height: "100%",
                            borderTopLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            overflow: "hidden",
                        }}
                        angle={190}
                    // onlyBorder
                    // borderWidth={1}
                    >
                    </ViewGradient>
                </Animatable.View>







------------------------

                <Animatable.View
                    style={{
                        // transform: [{ rotate: 15 }],
                    }}
                    animation={hieght_1}
                    iterationCount={'infinite'}
                    duration={1000}
                    delay={100}
                >
                    <FontelloIcon name={"playlist"} size={64} color={currentTheme.text.primary} />
                    </Animatable.View>

                <Animatable.Text
                    style={{
                        marginTop: 16,
                        fontFamily: theme.font.bellota.bold,
                        fontSize: 24,
                        color: currentTheme.text.primary
                    }}
                    animation={colorAnim}
                    duration={3000}
                    iterationCount={'infinite'}
                    delay={100}
                >
                    Loading...
                </Animatable.Text>


                    <ViewGradient
                        gradientStyle={{
                            borderRadius: 6,
                        }}
                        viewStyle={{
                            padding: 0,
                            width: 6,
                            height: "100%",
                            borderTopLeftRadius: 6,
                            borderBottomRightRadius: 6,
                            overflow: "hidden",
                        }}
                        angle={190}
                        // onlyBorder
                    // borderWidth={1}
                    >
                    </ViewGradient>
*/