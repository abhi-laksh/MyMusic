import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, BackHandler } from 'react-native';
import { withTheme } from '../../globals/ThemeProvider';
import MyAppText from '../../commons/MyAppText';
import GradientText from '../../commons/GradientText';
import MaskedView from '@react-native-community/masked-view';
import ViewGradient from '../../commons/ViewGradient';
import FontelloIcon from '../../commons/FontelloIcon';
import SongDetails from './SongDetails';
import { connect } from 'react-redux';
import ErrorLyrics from './ErrorLyrics';
import Input from '../../commons/Input';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../commons/Button";
import { addMultipleToQueue } from "../../../actions/queue";
import Clipboard from '@react-native-community/clipboard'
import { addLyrics } from '../../../actions/lyrics';
const styles = StyleSheet.create({
    parent: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 16,
        // paddingBottom: 0,
    },
    childView: {
        // flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});
// TODO : Two Btns -> paste, file
const LyricsAddScreen = ({ addLyrics, navigation, currentTrack, currentTheme, trackLyrics, ...props }) => {

    const [copiedText, setCopiedText] = useState('');

    const fetchCopiedText = (next) => async () => {
        const text = await Clipboard.getString()
        setCopiedText(text);
        addLyrics(currentTrack.id, text);
        next();
    }
    const addLyricsToTrack = () => {
        navigation.navigate("LyricsScreen");
    }

    const iconColor = currentTheme.text.primary;

    // Manually go back as nested stack doesnt remember Drawer Nav Item
    const goBackHome = () => {
        navigation.navigate("Home")
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", goBackHome);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", goBackHome);
        }
    });

    return (
        <View style={[
            styles.parent,
            {
                backgroundColor: currentTheme.background,
                alignItems: "center",
                justifyContent: "center",
            }
        ]}>
            <FontelloIcon
                name={"add-lyrics"}
                color={iconColor}
                size={64}
            />
            <MyAppText
                style={{
                    textAlign: "center"
                }}
                parentStyle={{
                    marginTop: 24,
                }}
                variant="semiBold"
            >
                {copiedText || "HERE"}
            </MyAppText>

            <ViewGradient
                gradientStyle={{
                    borderRadius: 36,
                    width: "70%",
                    marginTop: 36,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                viewStyle={{
                    padding: 0,
                    borderRadius: 36,
                    overflow: "hidden",
                }}
                onlyBorder
            >
                <Button
                    style={{
                        height: 36,
                    }}
                    // onPress={navigateToLyricsEdit}
                    onPress={fetchCopiedText(addLyricsToTrack)}
                    // onPress={() => { }}
                    activeOpacity={0.7}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Icon
                            name={"clipboard-arrow-right-outline"}
                            size={18}
                            color={iconColor}
                        />
                        <MyAppText
                            size={14}
                            parentStyle={{
                                // backgroundColor: "#666",
                                // flex: 0,
                                // flexGrow: 0,
                                paddingHorizontal: 0,
                                marginLeft: 8,
                            }}
                            variant="semiBold"
                            style={{
                                // backgroundColor: "#66a",
                                flex: 0,
                            }}
                        // color={"#fff"}
                        >
                            Paste From ClipBoard
                        </MyAppText>
                    </View>
                </Button>
            </ViewGradient>
            <ViewGradient
                gradientStyle={{
                    borderRadius: 36,
                    width: "70%",
                    marginTop: 24,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                viewStyle={{
                    padding: 0,
                    borderRadius: 36,
                    overflow: "hidden",
                }}
                onlyBorder
            >
                <Button
                    style={{
                        height: 36,
                    }}
                    // onPress={navigateToLyricsEdit}
                    onPress={() => { }}
                    activeOpacity={0.7}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Icon
                            name={"plus-circle-outline"}
                            size={18}
                            color={iconColor}
                        />
                        <MyAppText
                            size={14}
                            parentStyle={{
                                // backgroundColor: "#666",
                                // flex: 0,
                                // flexGrow: 0,
                                paddingHorizontal: 0,
                                marginLeft: 8,
                            }}
                            variant="semiBold"
                            style={{
                                // backgroundColor: "#66a",
                                flex: 0,
                            }}
                        // color={"#fff"}
                        >
                            Add Local File (.LRC)
                        </MyAppText>
                    </View>
                </Button>
            </ViewGradient>
        </View>
    );
};
function mapStateToProps(state) {
    const currentTrack = state.tracks.byId[state.player.currentTrack];
    const lyricsId = currentTrack && currentTrack.lyricsId;
    return {
        currentTrack,
        trackLyrics: lyricsId && state.lyrics.byId[lyricsId],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addLyrics: (trackId, lyrics) => dispatch(addLyrics(trackId, lyrics))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(LyricsAddScreen));
/*

        <View style={[styles.parent, { backgroundColor: currentTheme.background }]}>
            <MyAppText style={{
                textAlign: "center"
            }}>
                LyricsAddScreen
            </MyAppText>
        </View>
*/