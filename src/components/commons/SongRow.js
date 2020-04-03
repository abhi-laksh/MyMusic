import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MyAppText from "./MyAppText";
import ViewGradient from "./ViewGradient";
import Thumbnail from "./Thumbnail";
import { withTheme } from "../globals/ThemeProvider";
import Button from "./Button";
import FontelloIcon from "./FontelloIcon";
import Swipeable from "react-native-gesture-handler/Swipeable";


const styles = StyleSheet.create({
    parent: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        marginBottom: 16,
    },
    rowSongParent: {
        flexGrow: 1,
    },
    fullHeight: {
        height: "100%",
    },
    songNameButtonView: {
        flexDirection: "row",
        alignItems: "center",
    },
    songNameView: {
        justifyContent: "center",
        flexGrow: 1,
    },
    menuButton: {
        justifyContent: "center",
        width: 32,
        alignItems: "center",
    }
})


const SongRow = (props) => {
    const {
        currentTheme,
        songName = "Unknown Name",
        songAuthor = "Unknown Author",
        songImage,
        onPress
    } = props
    return (
        <View
            style={styles.parent}
        >
            <View
                style={styles.rowSongParent}
            >
                <Button
                    style={styles.fullHeight}
                    onPress={onPress}
                >
                    <View
                        style={[
                            styles.fullHeight,
                            styles.songNameButtonView
                        ]}
                    >
                        <Thumbnail size={50} scale={"50%"} source={songImage} />
                        <View
                            style={[
                                styles.fullHeight,
                                styles.songNameView
                            ]}
                        >
                            <MyAppText
                                size={14}
                                variant="medium"
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                            >
                                {songName}
                            </MyAppText>
                            <MyAppText
                                fontName="bellota"
                                size={13}
                                variant="bold"
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                            >
                                {songAuthor}
                            </MyAppText>
                        </View>
                    </View>
                </Button>
            </View>
            <View>
                <Button
                    style={[
                        styles.fullHeight,
                        styles.menuButton
                    ]}
                    onPress={() => console.log("SubMenu")}
                    underlayColor={"transparent"}
                >
                    <FontelloIcon name="menu-dots" color={currentTheme.text.primary} />
                </Button>
            </View>
        </View>
    )
}
export default withTheme(SongRow);

/*


                <View
                    style={
                        {
                            backgroundColor: "#eee",
                            height: "100%",
                            width: 50,
                            padding: 16
                        }
                    }
                >
                    <Thumbnail />
                </View>
*/