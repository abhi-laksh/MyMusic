import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { withTheme } from '../../globals/ThemeProvider';
import MyAppText from '../../commons/MyAppText';
import GradientText from '../../commons/GradientText';
import MaskedView from '@react-native-community/masked-view';
import ViewGradient from '../../commons/ViewGradient';
import FontelloIcon from '../../commons/FontelloIcon';
import SongDetails from './SongDetails';
import { connect } from 'react-redux';
import ErrorLyrics from './ErrorLyrics';

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 0,
        paddingBottom: 0,
    },
    childView: {
        // flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

const LyricsScreen = ({ currentTheme, theme, trackLyrics, navigation, currentTrack, lyrics, ...props }) => {

    // console.log(currentTrack);

    // console.log();
    // console.log("LYRICS:::", lyrics);
    // console.log();
    return (
        <View style={[styles.parent, { backgroundColor: currentTheme.background }]}>
            <SongDetails
                name={currentTrack ? currentTrack.title : undefined}
                artist={currentTrack ? currentTrack.artist : undefined}
                navigation={navigation}
            />
            {
                trackLyrics && trackLyrics.lyrics
                    ? (
                        <ScrollView
                            style={{
                                flex: 1,
                            }}
                            contentContainerStyle={{
                                padding: 16,
                                // flex: 1,
                            }}
                        >
                            <MyAppText
                                style={{
                                    // flex: 1,
                                    textAlign: "center"
                                }}
                                // numberOfLines={100}
                                variant={"semiBold"}
                            >
                                {trackLyrics.lyrics}
                            </MyAppText>
                        </ScrollView>
                    ) : (
                        <ErrorLyrics
                            errorStyle={{
                                flex: 0,
                            }}
                            color={theme.pallete.primary.light}
                            message={"No Lyrics Found !"}
                            size={20}
                            iconSize={48}
                            iconColor={currentTheme.text.primary}
                            navigation={navigation}
                        />
                    )
            }

        </View>
    );
};

function mapStateToProps(state) {
    const currentTrack = state.tracks.byId[state.player.currentTrack];
    const lyricsId = currentTrack && currentTrack.lyricsId;
    return {
        currentTrack,
        trackLyrics: lyricsId && state.lyrics.byId[lyricsId],
        lyrics: state.lyrics,
    };
}

export default connect(mapStateToProps)(withTheme(LyricsScreen));