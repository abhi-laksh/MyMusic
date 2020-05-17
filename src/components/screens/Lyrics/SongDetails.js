import React from "react";
import { View, StyleSheet } from "react-native";
import TrackPlayer from 'react-native-track-player';
import { connect } from "react-redux";

import MyAppText from "../../commons/MyAppText";
import Button from "../../commons/Button";
import FontelloIcon from "../../commons/FontelloIcon";
import { addMultipleToQueue } from "../../../actions/queue";
import { withTheme } from "../../globals/ThemeProvider";
import GradientText from "../../commons/GradientText";

const styles = StyleSheet.create({
    parent: {
        padding: 16,
        paddingBottom: 8,
        // marginTop: 16,
        marginBottom: 8,
        borderBottomWidth: 2,
    },
    subParent: {
        flexDirection: "row",
        // paddingTop: 24,
        // paddingBottom: 8,
        marginBottom: 8,
        alignItems: "center",
    },
    thumbnial: {
        width: 100,
        height: 108,
        marginRight: 16,
        alignItems: "center",
        borderWidth: 2,
        justifyContent: "center",
        borderRadius: 8,
    },
    capitalize: {
        textTransform: "capitalize"
    },
    detailsParent: {
        flex: 1,
    },
    textParentStyle: {
        marginBottom: 2,
        paddingHorizontal: 0,
    },
    buttonGroups: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
    },
    eachButton: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor:"#666"
    },
});

class SongDetails extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { theme, currentTheme, navigation, name = "Unknown Title", artist = "Unknown Artist", createdOn } = this.props;

        const contrastValue = (currentTheme.name === "dark") ? 0.3 : -0.3;
        const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));
        const currentColor = currentTheme.text.primary;
        const themeColor = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.secondary.main;

        return (
            <View
                style={[
                    styles.parent,
                    {
                        backgroundColor: currentTheme.background,
                        borderBottomColor: contrast,
                    }
                ]} 
            >
                <View
                    style={styles.subParent}
                >
                    <View
                        style={[
                            styles.thumbnial,
                            { borderColor: contrast, }
                        ]}
                    >
                        <GradientText
                            maskedStyle={{
                                width: 48,
                                height: 48,
                            }}
                            gradientStyle={{
                                width: 48,
                                height: 48,
                            }}
                            angle={50}
                        >
                            <FontelloIcon name="lyrics" size={48} color={contrast} />
                        </GradientText>
                    </View>
                    <View
                        style={styles.detailsParent}
                    >
                        <MyAppText
                            size={18}
                            numberOfLines={3}
                            variant={"semiBold"}
                            style={styles.capitalize}
                            parentStyle={styles.textParentStyle}
                            color={themeColor}
                        >
                            {name}
                        </MyAppText>
                        <MyAppText
                            size={13}
                            numberOfLines={2}
                            parentStyle={styles.textParentStyle}
                        >
                            {artist}
                        </MyAppText>
                    </View>
                </View>

                <View
                    style={styles.buttonGroups}
                >
                    <Button
                        style={styles.eachButton}
                        onPress={() => { }}
                    >
                        <FontelloIcon name="shuffle" size={24} color={currentColor} />
                    </Button>
                    <Button
                        style={styles.eachButton}
                        onPress={() => { }}
                    >
                        <FontelloIcon name="play-my" size={24} color={currentColor} />
                    </Button>
                    {/* 
                        //TODO Add ICON lyrics-edit
                     */}
                    <Button
                        style={styles.eachButton}
                        onPress={() => { }}
                    >
                        <FontelloIcon name="add-lyrics" size={28} color={currentColor} />
                    </Button>
                </View>
            </View>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        addMultipleToQueue: (tracks) => dispatch(addMultipleToQueue(tracks))
    }
}


export default connect(null, mapDispatchToProps)(withTheme(SongDetails));