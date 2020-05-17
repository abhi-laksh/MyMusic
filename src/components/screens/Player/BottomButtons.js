import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import Button from "../../commons/Button";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import { withTheme } from "../../globals/ThemeProvider";
import { toggleFavourites } from "../../../actions/favourites";
import ShuffleButton from "./ShuffleButton";
import RepeatButton from "./RepeatButton";


const styles = StyleSheet.create({
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
        flexDirection: "row",
        justifyContent: "space-around",
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
        this._toggleFav = this._toggleFav.bind(this);
    }
    _toggleFav() {
        this.props.dispatch(toggleFavourites(this.props.currentTrack));
    }
    render() {
        const { theme, currentTheme, navigation } = this.props;

        const iconColor = (currentTheme.text.primary)

        const themeColor = currentTheme.name === "dark"
            ? theme.pallete.primary.main
            : theme.pallete.secondary.main;

        const isFav = (this.props.currentTrack && this.props.currentTrack.id && (this.props.favourites.findIndex((e) => e.id == this.props.currentTrack.id) > -1))


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
                <RepeatButton
                    style={styles.drawerButtonList}
                    iconColor={iconColor}
                    activeColor={themeColor}
                />
                <ShuffleButton
                    style={styles.drawerButtonList}
                    iconColor={iconColor}
                    activeColor={themeColor}
                />
                <Button
                    style={styles.drawerButtonList}
                    onPress={this._toggleFav}
                    // onPress={() => console.log("LOOP")}
                    activeOpacity={0.5}
                    underlayColor={"transparent"}
                >
                    <FontelloIcon name={isFav ? "heart-cross" : "heart"} size={24} color={isFav ? themeColor : iconColor} />
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
                    onPress={() => navigation.navigate("Lyrics")}
                    activeOpacity={0.5}
                    underlayColor={"transparent"}
                >
                    <FontelloIcon name="lyrics" size={24} color={iconColor} />
                </Button>
            </ViewGradient >
        )
    }
}

function mapStateToProps(state) {

    // const isFav = (currentTrack && currentTrack.id && (JSON.stringify(favourites).includes(currentTrack.id)))

    return { currentTrack: state.player.currentTrack, favourites: state.favourites.favourites, controls: state.controls };
}
export default connect(mapStateToProps)(withTheme(BottomButtons));