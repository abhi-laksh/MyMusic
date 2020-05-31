import React from 'react';
import { View, TextInput, StyleSheet, Image, ImageBackground } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import { withTheme } from '../globals/ThemeProvider';
import ViewGradient from '../commons/ViewGradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyAppText from '../commons/MyAppText';
import CommonBG from '../CommonBG';
import ThemeToggler from '../commons/ThemeToggler';
import FontelloIcon from '../commons/FontelloIcon';


const styles = StyleSheet.create({
    parentGradient: {
        flex: 1,
        borderTopRightRadius: 64,
        borderBottomRightRadius: 64,
    },
    parentGradientView: {
        padding: 0,
        flex: 1,
        borderTopRightRadius: 64,
        borderBottomRightRadius: 64,
        overflow: "hidden",
    },
    drawerScrollView: {
        // padding: 20,
        // flex: 1,
        // backgroundColor:"#444",
        justifyContent: "center",
        marginTop: 24,
        paddingTop: 0,
        paddingLeft: 16,
        paddingRight: 16,
    },
    drawerScrollViewChild: {
        // width: "100%",
        height: 128,
        // justifyContent: "flex-end",
        overflow: "hidden",
        // marginLeft: -16,
        // marginLeft: -16,
        // borderTopRightRadius: 96,
        opacity: 0.75,
        // borderBottomRightRadius: 96,
    },
    userGradient: {
        borderRadius: 80,
        width: 80,
        height: 80,
        marginVertical: 18,
        marginHorizontal: 16,
    },
    userGradientView: {
        borderRadius: 80,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
    },
})


function MyDrawerContent(props) {
    const { currentTheme, theme, state, navigation, descriptors } = props;

    const routes = state.routes.filter((e) => !["Player", "Lyrics", "Search", "SongInfo"].includes(e.name));

    const fontSettings = theme.getFontSettings("montserrat", "semiBold");

    const color = currentTheme.text.primary;

    const contrast = theme.hexToRGB(currentTheme.background, 0.5);
    // const contrast = theme.hexToRGB(currentTheme.text.primary, 0.3);

    // const contrastValue = (currentTheme.name === "dark") ? 0.3 : -0.3;
    // const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));

    const colorForTheme = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.secondary.main;

    return (
        <ViewGradient
            gradientStyle={styles.parentGradient}
            viewStyle={styles.parentGradientView}
            onlyBorder
            borderWidth={2}
            top
            right
            bottom
            angle={30}
        >
            <CommonBG>
                <View
                    style={{
                        marginTop: 24,
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "#666",
                    }}
                >
                    <MyAppText
                        size={20}
                        parentStyle={{
                            marginBottom: 24,
                        }}
                        style={{
                            textTransform: "uppercase",
                            textAlign: "center",
                        }}>
                        Switch Theme
                        </MyAppText>
                    <ThemeToggler />
                </View>
                <DrawerContentScrollView
                    {...props}
                    contentContainerStyle={[
                        styles.drawerScrollView,
                        {
                            // backgroundColor: currentTheme.background,
                        }
                    ]}
                >
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
                                label={e.name}
                                key={e.key}
                                labelStyle={[
                                    fontSettings,
                                ]}
                                activeBackgroundColor={contrast}
                                activeTintColor={colorForTheme}
                                inactiveTintColor={color}
                                style={{
                                    marginTop: 8,
                                    paddingHorizontal: 16,
                                    borderWidth: 1,
                                    borderColor: descriptors[e.key].navigation.isFocused() ? colorForTheme : "transparent"
                                }}
                                onPress={() => navigation.navigate(e.name)}
                                focused={descriptors[e.key].navigation.isFocused()}
                            />
                        )
                    })
                    }
                </DrawerContentScrollView>
            </CommonBG>

            {/* <View
                style={styles.drawerScrollViewChild}
            >
                <Image
                    source={require('../../assets/images/wave-flip.png')}
                    style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        opacity: 0.7,
                    }}
                />
            </View> */}
        </ViewGradient>
    );
}
export default withTheme(MyDrawerContent)

/*
<ViewGradient
                        gradientStyle={styles.userGradient}
                        viewStyle={styles.userGradientView}
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
*/