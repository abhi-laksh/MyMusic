import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, TextInput } from 'react-native';
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
import { addLyrics, modifyLyrics } from '../../../actions/lyrics';
import LyricsInput from './LyricsInput';
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
class LyricsEditScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { addLyrics, navigation, currentTrack, currentTheme, theme, trackLyrics, ...others } = this.props;
        const themeColor = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.secondary.main;

        // console.log("EDIT::::");

        return (
            <View style={[
                styles.parent,
                {
                    backgroundColor: currentTheme.background,
                    // alignItems: "center",
                    justifyContent: "center",
                }
            ]}>
                <LyricsInput navigation={navigation} />
            </View>
        );
    }
}

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
        modifyLyrics: (lyricsId, lyrics) => dispatch(modifyLyrics(lyricsId, lyrics))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(LyricsEditScreen));
/*

        <View style={[styles.parent, { backgroundColor: currentTheme.background }]}>
            <MyAppText style={{
                textAlign: "center"
            }}>
                LyricsEditScreen
            </MyAppText>
        </View>


                <Input
                    setRef={(ref) => { this._input = ref }}
                    gradientStyle={{
                        flex: 1,
                    }}
                    viewStyle={{
                        height: "auto",
                        // flex: 1,
                    }}
                    inputStyle={{
                        // backgroundColor: "#666",
                        // height: "100%",
                        textAlignVertical: "top",
                        paddingVertical: 0,
                    }}
                    placeholder="Enter/Paste Lyrics"
                    multiline
                    // value={this.state.lyrics}
                    onEndEditing={this._handleInput}
                    maxLength={100000}
                />
*/