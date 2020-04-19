import React from "react";
import { StyleSheet, View } from "react-native";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/Button";
import SharpBG from "../../commons/SharpBG";
import Thumbnail from "../../commons/Thumbnail";
import { connect } from "react-redux";
import { toggleFavourites } from "../../../actions/favourites";


const styles = StyleSheet.create({
    parent: {
        width: "100%",
        alignItems: "center",
        // backgroundColor: "#f00",
        // paddingHorizontal: 16,
        // marginTop: 24,
    },
    controlsParent: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginVertical: 36,
    },
    iconsParent: {
        // backgroundColor: "#666",
        // backgroundColor: "transparent",
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",

    },
    lyricDrawerButtonGradient: {
        width: 100,
        height: 40,
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
    drawerGradient: {
        width: "100%",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        // borderRadius: 16,
    },
    drawerGradientView: {
        width: "100%",
        padding: 0,
        paddingVertical: 4,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        // borderRadius: 16,
        flexDirection: "row",
        justifyContent: "space-around",
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
    },
    drawerButtonList: {
        // backgroundColor: "#666",
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
    },
})

class BottomButtons extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { theme, currentTheme } = this.props;

        const iconColor = (currentTheme.text.primary)
        const themeColor = currentTheme.name === "dark"
            ? theme.pallete.primary.main
            : theme.pallete.secondary.main;


        return (
            <ViewGradient
                gradientStyle={styles.drawerGradient}
                viewStyle={styles.drawerGradientView}
                onlyBorder
                borderWidth={1}
                top
                // left
                // right
                bottom
            >
                <Button
                    style={styles.drawerButtonList}
                    onPress={() => console.log("LOOP")}
                    activeOpacity={0.5}
                    underlayColor={"transparent"}
                >
                    <FontelloIcon name="loop-one" size={24} color={iconColor} />
                </Button>
                <Button
                    style={styles.drawerButtonList}
                    onPress={() => console.log("LOOP")}
                    activeOpacity={0.5}
                    underlayColor={"transparent"}
                >
                    <FontelloIcon name="playlist" size={20} color={iconColor} />
                </Button>
                <Button
                    style={styles.drawerButtonList}
                    onPress={() => this.props.dispatch(toggleFavourites(this.props.currentTrack))}
                    // onPress={() => console.log("LOOP")}
                    activeOpacity={0.5}
                    underlayColor={"transparent"}
                >
                    <FontelloIcon name="heart" size={24} color={this.props.isFavourite ? themeColor : iconColor} />
                </Button>
                <Button
                    style={styles.drawerButtonList}
                    onPress={() => console.log("LOOP")}
                    activeOpacity={0.5}
                    underlayColor={"transparent"}
                >
                    <FontelloIcon name="shuffle" size={20} color={iconColor} />
                </Button>
                <Button
                    style={styles.drawerButtonList}
                    onPress={() => console.log("LOOP")}
                    activeOpacity={0.5}
                    underlayColor={"transparent"}
                >
                    <FontelloIcon name="lyrics" size={24} color={iconColor} />
                </Button>
            </ViewGradient>
        )
    }
}

function mapStateToProps(state) {
    const favourites = state.favourites.favourites;
    const currentTrack = state.player.currentTrack;


    const isFav = (currentTrack && currentTrack.id && JSON.stringify(favourites).includes(currentTrack.id))

    return { currentTrack: currentTrack, isFavourite: isFav };
}
export default connect(mapStateToProps)(withTheme(BottomButtons));