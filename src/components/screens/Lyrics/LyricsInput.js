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

class LyricsInput extends React.PureComponent {
    constructor(props) {
        super(props);

        this._handleInput = this._handleInput.bind(this);
        this.editLyrics = this.editLyrics.bind(this);
        this._input = null;

        this.state = {
            lyrics: "",
            pointerEvents: "none"
        };
    }

    _handleInput(val) {
        this.setState(
            () => ({
                lyrics: val,
            }),
            () => {
                this._input.setNativeProps({ text: val });
            }
        );
    }

    editLyrics() {
        let lyricsId = this.props.trackLyrics && this.props.trackLyrics.id;
        let lyrics = this.props.trackLyrics && this.props.trackLyrics.lyrics;
        if ((this.state.lyrics && this.state.lyrics.length) && this.state.lyrics !== lyrics) {
            this.props.modifyLyrics(lyricsId, this.state.lyrics);
            this.props.navigation.navigate('LyricsScreen');
        } else {
            this.props.navigation.navigate('LyricsScreen');
        }
    }

    componentDidMount() {
        let lyrics = this.props.trackLyrics && this.props.trackLyrics.lyrics;
        // this._input.setNativeProps({ text: lyrics });

        this.setState(
            () => ({
                lyrics: lyrics,
            }),
            () => {
                this._input.setNativeProps({ text: lyrics });
            }
        );
    }



    render() {

        const { addLyrics, navigation, currentTrack, currentTheme, theme, trackLyrics, ...others } = this.props;
        const themeColor = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.secondary.main;

        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        // backgroundColor: "#666",
                        marginBottom: 16,
                        justifyContent: "space-between"
                    }}
                >
                    <MyAppText
                        parentStyle={{
                            paddingHorizontal: 0,
                        }}
                        style={{
                            flex: 0,
                        }}
                    >
                        Paste Here :
                    </MyAppText>
                    <Button
                        style={{
                            borderWidth: 1,
                            borderColor: themeColor,
                            padding: 4,
                            borderRadius: 6,
                        }}
                        onPress={this.editLyrics}
                    >
                        <View>

                            <MyAppText
                                style={{
                                    flex: 0,
                                }}
                                size={12}
                                color={themeColor}
                            >
                                Save
                            </MyAppText>
                        </View>
                    </Button>
                </View>
                <Input
                    setRef={(ref) => { this._input = ref }}
                    gradientStyle={{
                        // flex: 1,
                    }}
                    viewStyle={{
                        height: "auto",
                        // flex: 1,
                    }}
                    inputStyle={{
                        // backgroundColor: "#666",
                        // height: "100%",
                        textAlignVertical: "top",
                        // paddingVertical: 0,
                    }}
                    placeholder="Enter/Paste Lyrics"
                    multiline
                    // value={this.state.lyrics}
                    onChangeText={this._handleInput}
                />
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


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(LyricsInput));


/*

// <TextInput
            //     // selection={{ start: 0 }}
            //     ref={(ref) => { this._input = ref }}
            //     style={{
            //         textAlignVertical: "top",
            //         backgroundColor: currentTheme.background,
            //         borderColor: "#666",
            //         borderWidth: 1,
            //         color: currentTheme.text.primary,
            //         paddingHorizontal: 16,
            //     }}

            //     placeholder="Enter/Paste Lyrics"
            //     placeholderTextColor={"#666"}
            //     multiline
            //     // value={this.state.lyrics}
            //     // onEndEditing={this._handleInput}
            //     onChangeText={this._handleInput}
            // />
*/