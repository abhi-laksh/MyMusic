import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MyAppText from "../../commons/MyAppText";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/Button";
import HeaderLayout from "../../commons/HeaderLayout";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import TrackPlayer from 'react-native-track-player';
const styles = StyleSheet.create({
    parentView: {
        padding: 0,
        flexDirection: "row",
        paddingVertical: 8,
    },
    buttons: {

        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    capital: {
        textTransform: "capitalize"
    },
    parentSongName: {
        flex: 1,
        alignItems: "center",
    },
    buttons: {

        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    buttons: {

        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    }
})
function Header(props) {

    const { theme, currentTheme, navigation } = props;
    const [isShuffle, setShuffle] = useState(false);
    const [isLoop, setLoop] = useState(false);

    const color = currentTheme.text.primary;
    return (
        <HeaderLayout>
            <ViewGradient
                viewStyle={styles.parentView}
                onlyBorder
                bottom
                borderWidth={1}
            >
                <Button
                    style={[
                        styles.buttons,
                        {
                            backgroundColor: currentTheme.background,
                        },
                    ]}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="chevron-down" size={24} color={color} />
                </Button>

                <MyAppText
                    style={styles.capital}
                    parentStyle={styles.parentSongName}
                    variant="semiBold"
                    numberOfLines={1}
                >
                    {props.track ? props.track.title : "Unknown Title"}
                </MyAppText>

                <Button
                    style={[
                        styles.buttons,
                        {
                            flex: 1,
                        }
                    ]}
                    onPress={() => console.log("Hii")}
                >
                    <FontelloIcon name="menu-dots" size={14} color={color} />
                </Button>
            </ViewGradient>
        </HeaderLayout >
    );
}

function mapStateToProps(state) {
    const currentTrack = state.player.currentTrack;
    return {
        state: state.player.state,
        track: currentTrack ? currentTrack : null
    };
}


export default connect(mapStateToProps)(withTheme(Header));

/*
<View
                    style={{
                        overflow: "hidden",
                        justifyContent: "center",
                        flex: 1,
                        flexGrow: 1,
                    }}
                >
                    <Animatable.Text
                        animation={slideTillEnd}
                        iterationCount="infinite"
                        duration={dimension.width !== 0 ? ((Number(songName.length) * 325.203)) : 325}
                        onLayout={(e) => {
                            const { width, height } = e.nativeEvent.layout;
                            setDimension({ width, height });
                        }}
                        style={[
                            {
                                // transform: [{ translateX: -256 }],
                                // width: ("100%"),
                                color: currentTheme.text.primary,
                                backgroundColor: "#666",
                            },
                            theme.getFontSettings("montserrat", "medium", 18),
                        ]}
                        numberOfLines={1}
                        ellipsizeMode={"clip"}
                        easing={"linear"}
                    >
                        {songName}
                    </Animatable.Text>
                </View>
*/