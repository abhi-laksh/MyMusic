import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { withTheme } from '../globals/ThemeProvider';
import { View, Text } from 'react-native';
import ViewGradient from '../commons/ViewGradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyAppText from '../commons/MyAppText';

function MyDrawerContent(props) {
    const { currentTheme, theme, state, navigation, descriptors, progress } = props;

    const routes = state.routes.filter((e) => e.name !== "Player");
    // console.log("state", state);
    // console.log("-------------------------------------");
    // console.log("navigation", navigation);
    // console.log("-------------------------------------");
    // console.log("descriptors", descriptors);
    // console.log("-------------------------------------");
    // console.log("progress", progress);
    // console.log("-------------------------------------");
    // console.log("focus", String(props).includes("focused"));
    // console.log("-------------------------------------");
    const fontSettings = theme.getFontSettings("montserrat", "semiBold");
    const contrast = theme.hexToRGB(currentTheme.text.primary, 0.1);
    const colorForTheme = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.secondary.main;
    return (
        <ViewGradient
            gradientStyle={{
                flex: 1,
                borderTopRightRadius: 96,
                borderBottomRightRadius: 96,
            }}
            viewStyle={{
                // padding: 0,
                flex: 1,
                borderTopRightRadius: 96,
                borderBottomRightRadius: 96,
            }}
            onlyBorder
            borderWidth={2}
            top
            right
            bottom
        >

            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    padding: 20,
                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >

                    <ViewGradient
                        gradientStyle={{
                            borderRadius: 80,
                            width: 80,
                            height: 80,
                            marginVertical: 18,
                            marginHorizontal: 16,
                        }}
                        viewStyle={{
                            borderRadius: 80,
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                        }}
                        onlyBorder
                        angle={45}
                    >
                        <Icon name={"account"} size={45} color={colorForTheme} />
                    </ViewGradient>
                    <MyAppText
                        parentStyle={{
                            marginBottom: 16,
                        }}
                        style={{
                            textAlign: "center",

                        }}
                    >
                        Hello User,
                </MyAppText>
                </View>
                {/* <DrawerItemList
                    {...props}
                    itemStyle={
                        {
                            marginTop: 8,
                            paddingHorizontal: 16,
                        }
                    }
                    icon={() => <Icon name="home" color={currentTheme.text.primary} />}
                    labelStyle={[
                        fontSettings,
                    ]}
                    activeBackgroundColor={contrast}
                    activeTintColor={colorForTheme}
                    inactiveTintColor={currentTheme.text.primary}

                /> */}

                {routes.map(function (e) {
                    return (
                        <DrawerItem
                            {...props}
                            label={e.name}
                            key={e.key}
                            labelStyle={[
                                fontSettings,
                            ]}
                            activeBackgroundColor={contrast}
                            activeTintColor={colorForTheme}
                            inactiveTintColor={currentTheme.text.primary}
                            style={{
                                marginTop: 8,
                                paddingHorizontal: 16,
                            }}
                            onPress={() => navigation.navigate(e.name)}
                            focused={descriptors[e.key].navigation.isFocused()}
                        />
                    )
                })

                }


            </DrawerContentScrollView>
        </ViewGradient>
    );
}
export default withTheme(MyDrawerContent)