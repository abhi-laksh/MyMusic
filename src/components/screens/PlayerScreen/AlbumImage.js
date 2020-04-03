import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import MyAppText from "../../commons/MyAppText";
import SongRow from "../../commons/SongRow";
import MiniPlayer from "../../commons/MiniPlayer/MiniPlayer";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import ThemeToggler from "../../commons/ThemeToggler";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/Button";
import SharpBG from "../../commons/SharpBG";
import Thumbnail from "../../commons/Thumbnail";
import ActionButton from "./ActionButtons";
import PlayerControl from "./PlayerControl";

const styles = StyleSheet.create({
    parentGradient: {
        width: 192,
        height: 192,
        marginTop: 64,
        borderRadius: 16,
        alignSelf: "center"
    },
    parentView: {
        width: "100%",
        height: "100%",
        padding: 0,
        borderRadius: 16,
        overflow: "hidden",
    },
    heartGradient: {
        alignSelf: "flex-end",
        marginTop: "auto",
        width: 36,
        height: 36,
        borderTopLeftRadius: 16,
    },
    heartGradientView: {
        width: "100%",
        height: "100%",
        padding: 0,
        borderTopLeftRadius: 16,
        overflow: "hidden"
    },
    heartButton: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    parentView: {
        width: "100%",
        height: "100%",
        padding: 0,
        borderRadius: 16,
        overflow: "hidden",
    },
    parentView: {
        width: "100%",
        height: "100%",
        padding: 0,
        borderRadius: 16,
        overflow: "hidden",
    },
    parentView: {
        width: "100%",
        height: "100%",
        padding: 0,
        borderRadius: 16,
        overflow: "hidden",
    }
})

function AlbumImage(props) {
    const { theme, currentTheme, isFav = false } = props;
    return (
        <ViewGradient
            gradientStyle={styles.parentGradient}
            viewStyle={styles.parentView}
            onlyBorder
            borderWidth={1}
        >
            <Thumbnail
                equal
                size={"100%"}
                scale={"60%"}
            />
            <ViewGradient
                gradientStyle={styles.heartGradient}
                viewStyle={styles.heartGradientView}
                angle={45}
                onlyBorder={!isFav}
                top
                left
                borderWidth={1}
            >
                {!isFav && <SharpBG angle={45} />}
                <Button
                    style={styles.heartButton}
                    onPress={() => console.log("Playlist")}
                >
                    <FontelloIcon name="heart" size={16} color={isFav ? theme.pallete.common.white : currentTheme.text.primary} />
                </Button>
            </ViewGradient>
        </ViewGradient>
    );
}

export default withTheme(AlbumImage)