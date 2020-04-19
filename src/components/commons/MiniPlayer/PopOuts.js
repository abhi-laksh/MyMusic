import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import FontelloIcon from "../FontelloIcon";
import Button from "../Button";
import { withTheme } from "../../globals/ThemeProvider";
import ViewGradient from "../ViewGradient";
import SharpBG from "../SharpBG";
import { connect } from "react-redux";
import { addTracksToFavourites, removeTracksFromFavourites, toggleFavourites } from "../../../actions/favourites";
import AsyncStorage from "@react-native-community/async-storage";



const styles = StyleSheet.create({
    mostParent: {
        width: 80,
        height: 30,
        position: "absolute",
        top: -30,
        left: "50%",
        marginLeft: -40,
        zIndex: 1
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
        // zIndex: 1,
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
    },
    popChildButtonsView: {
        padding: 0,
        borderRadius: 24,
        overflow: "hidden"
    },
    popButtonSharpBG: {
        borderRadius: 64,
    },
    popButton: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    popButtonSharpBG: {
        borderRadius: 64,
    },
})

class PopsOut extends React.Component {
    constructor(props) {
        super(props);
        this.mode = new Animated.Value(0);
    }
    handlePopsOut = () => {
        Animated.sequence([
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0,
                duration: 200,
            })
        ]).start();
    }

    render() {
        const { theme, currentTheme } = this.props;
        const iconColor = currentTheme.text.primary;
        const isFav = this.props.isFavourite;

        // console.log("favourites ", this.props.favourites, this.props.currentTrack);

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
                        <SharpBG style={styles.popButtonSharpBG} />
                        <Button
                            onPress={() => console.log("Button playlist")}
                            style={styles.popButton}
                        >
                            <FontelloIcon name="add-lyrics" size={18} color={iconColor} />
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
                        onlyBorder={!isFav}
                    >
                        <SharpBG style={[
                            styles.popButtonSharpBG,
                            // { opacity: 0.7 }
                        ]}
                        // colors={[theme.pallete.primary.main, theme.pallete.secondary.light]}
                        />
                        <Button
                            onPress={() => this.props.dispatch(toggleFavourites(this.props.currentTrack))}
                            // onPress={() => console.log("Button heart")}
                            style={styles.popButton}
                        >
                            <FontelloIcon name="heart" size={18} color={isFav ? themeColor : iconColor} />
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

                    <ViewGradient
                        gradientStyle={styles.popChildButtonsGradient}
                        viewStyle={styles.popChildButtonsView}
                        onlyBorder
                    >
                        <SharpBG style={styles.popButtonSharpBG} />
                        <Button
                            onPress={() => console.log("Button close")}
                            style={styles.popButton}
                        >
                            <FontelloIcon name="add-playlist" size={18} color={iconColor} />
                        </Button>
                    </ViewGradient>
                </Animated.View>

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
                            <FontelloIcon name="arrow-up" size={12} color={iconColor} />
                        </Animated.View>
                    </Button>
                </ViewGradient>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const favourites = state.favourites.favourites;
    const currentTrack = state.player.currentTrack;


    const isFav = (currentTrack && currentTrack.id && JSON.stringify(favourites).includes(currentTrack.id))

    return { currentTrack: currentTrack, isFavourite: isFav };
}

export default connect(mapStateToProps)(withTheme(PopsOut));

/*
*/