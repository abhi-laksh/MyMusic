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
import ControlButton from "./ControlButton";


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
        this.goToPL = this.goToPL.bind(this);
    }
    goToPL() {
        this.props.navigation.navigate("Playlist");
    }
    _toggleFav() {
        this.props.toggleFavourites((this.props.currentTrackId));
    }

    render() {
        const { theme, currentTheme, navigation, disabled, disabledColor } = this.props;
        /* 
                TODO : Make Btns Disable
        */
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
                <ControlButton
                    style={styles.drawerButtonList}
                    iconColor={iconColor}
                    activeColor={themeColor}
                />
                <Button
                    style={styles.drawerButtonList}
                    onPress={this._toggleFav}
                    activeOpacity={0.5}
                    underlayColor={"transparent"}
                    disabled={disabled}
                >
                    <FontelloIcon name={this.props.isFavourite ? "heart-cross" : "heart"} size={24} color={disabled ? disabledColor : (this.props.isFavourite ? themeColor : iconColor)} />
                </Button>
                <Button
                    style={styles.drawerButtonList}
                    onPress={this.goToPL}
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
                    disabled={disabled}
                >
                    <FontelloIcon name="lyrics" size={24} color={iconColor} color={disabled ? disabledColor : iconColor} />
                </Button>
            </ViewGradient>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentTrackId: state.player.currentTrack,
        isFavourite: state.library.favourites.includes(state.player.currentTrack),
    };
}



function mapDispatchToProps(dispatch) {
    return {
        toggleFavourites: (track) => dispatch(toggleFavourites(track)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(BottomButtons));