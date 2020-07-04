import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import FontelloIcon from "../FontelloIcon";
import Button from "../Button";
// import Button from "../SubMenu/Button";
import { withTheme } from "../../globals/ThemeProvider";
import ViewGradient from "../ViewGradient";
import SharpBG from "../SharpBG";
import { connect } from "react-redux";
import { toggleFavourites } from "../../../actions/favourites";
import AsyncStorage from "@react-native-community/async-storage";
import QueueToggler from "./QueueToggler";



const styles = StyleSheet.create({
    mostParent: {
        width: 80,
        height: 30,
        position: "absolute",
        top: -30,
        left: "50%",
        marginLeft: -40,
        zIndex: 3,
    },
    popTogglerGradient: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    popTogglerView: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        width: "100%",
        height: "100%",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 3,
    },
    popToggler: {
        width: 120,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    popChildButtonsGradient: {
        width: 40,
        height: 40,
        borderRadius: 24,
        overflow: "hidden",
        padding: 1,
        zIndex: 1,
    },
    popChildButtonsView: {
        padding: 0,
        borderRadius: 24,
        overflow: "hidden",
        zIndex: 1,
    },
    popButtonSharpBG: {
        borderRadius: 64,
    },
    popButton: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
})

class PopsOut extends React.PureComponent {

    constructor(props) {
        super(props);
        this.mode = new Animated.Value(0);
        this.goToLyrics = this.goToLyrics.bind(this);
        this.toggleFav = this.toggleFav.bind(this);
        this.handlePopsOut = this.handlePopsOut.bind(this);
    }

    toggleFav() {
        this.props.toggleFavourites(this.props.currentTrackId)
    }

    handlePopsOut() {
        Animated.sequence([
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0,
                duration: 200,
            })
        ]).start();
    }

    goToLyrics() {
        this.props.navigation.navigate("Lyrics", {
            screen: "LyricsScreen"
        });
    }

    render() {
        const { theme, currentTheme } = this.props;
        const iconColor = currentTheme.text.primary;
        const isFav = this.props.isFavourite;

        const themeColor = currentTheme.name === "light" ? theme.pallete.secondary.main : theme.pallete.primary.main

        const rotate = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"]
        });
        const playlistX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [10, -48]
        });
        const playlistY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, -24]
        });
        const heartY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, -60]
        });
        const scale = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0.1, 1]
        });

        return (
            <View
                style={styles.mostParent}
            >
                <ViewGradient
                    gradientStyle={styles.popTogglerGradient}
                    viewStyle={styles.popTogglerView}
                    onlyBorder
                    top
                    left
                    right
                    borderWidth={1}
                >
                    <Button
                        onPress={this.handlePopsOut.bind(this)}
                        style={styles.popToggler}
                    >
                        <Animated.View
                            style={{
                                transform: [{ rotate: rotate }]
                            }}
                        >
                            <FontelloIcon name="up" size={12} color={iconColor} />
                        </Animated.View>
                    </Button>
                </ViewGradient>

                <Animated.View
                    style={{
                        position: "absolute",
                        top: playlistY,
                        left: playlistX,
                        transform: [{ scale: scale }],
                    }}

                >
                    <ViewGradient
                        gradientStyle={[
                            styles.popChildButtonsGradient,
                        ]}
                        viewStyle={styles.popChildButtonsView}
                        onlyBorder
                    >
                        {/* <SharpBG style={styles.popButtonSharpBG} /> */}
                        <Button
                            onPress={this.goToLyrics}
                            style={styles.popButton}
                        >
                            <FontelloIcon name="lyrics" size={18} color={iconColor} />
                        </Button>
                    </ViewGradient>
                </Animated.View>
                <Animated.View
                    style={{
                        position: "absolute",
                        top: heartY,
                        alignSelf: "center",
                        transform: [{ scale: scale }],
                    }}
                >
                    <ViewGradient
                        gradientStyle={styles.popChildButtonsGradient}
                        viewStyle={styles.popChildButtonsView}
                        onlyBorder
                    >
                        {/* <SharpBG style={[
                            styles.popButtonSharpBG,
                            // { opacity: 0.7 }
                        ]}
                        // colors={[theme.pallete.primary.main, theme.pallete.secondary.light]}
                        /> */}
                        <Button
                            onPress={this.toggleFav}
                            style={styles.popButton}
                        >
                            <FontelloIcon name={isFav ? "heart-cross" : "heart"} size={18} color={isFav ? themeColor : iconColor} />
                        </Button>
                    </ViewGradient>
                </Animated.View>
                <Animated.View
                    style={{
                        position: "absolute",
                        top: playlistY,
                        right: playlistX,
                        transform: [{ scale: scale }],
                    }}
                >
                    <QueueToggler
                        gradientStyle={styles.popChildButtonsGradient}
                        viewStyle={styles.popChildButtonsView}
                        buttonStyle={styles.popButton}
                        iconColor={iconColor}
                    />
                </Animated.View>

            </View>
        );
    }
}

function mapStateToProps(state) {
    let library = state.library;
    let player = state.player;


    console.log();
    console.log("FAV MP::", library.favourites);
    console.log();
    return {
        isFavourite: library.favourites && library.favourites.includes(player.currentTrack),
        currentTrackId: player.currentTrack
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleFavourites: (trackId) => dispatch(toggleFavourites(trackId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PopsOut));
