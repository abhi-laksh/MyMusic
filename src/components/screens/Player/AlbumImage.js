import React from "react";
import { StyleSheet } from "react-native";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/Button";
import SharpBG from "../../commons/SharpBG";
import Thumbnail from "../../commons/Thumbnail";
import { connect } from "react-redux";
import { toggleFavourites } from "../../../actions/favourites";

const styles = StyleSheet.create({
    parentGradient: {
        width: 192,
        height: 192,
        // marginTop: 64,
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
})

function AlbumImage(props) {
    const { theme, currentTheme } = props;
    return (
        <ViewGradient
            gradientStyle={styles.parentGradient}
            viewStyle={styles.parentView}
            onlyBorder
            borderWidth={1}
        >
            <Thumbnail
                equal
                iconSize={96}
                size={"100%"}
                scale={"60%"}
            />
            {/* <ViewGradient
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
                    onPress={() => props.dispatch(toggleFavourites(props.currentTrack))}
                >
                    <FontelloIcon name="heart" size={16} color={isFav ? theme.pallete.common.white : currentTheme.text.primary} />
                </Button>
            </ViewGradient> */}
        </ViewGradient>
    );
}
function mapStateToProps(state) {
    const currentTrack = state.player.currentTrack;
    const favourites = state.favourites.favourites;
    return { currentTrack: currentTrack, favourites: favourites };
}
export default connect(mapStateToProps)(withTheme(AlbumImage));