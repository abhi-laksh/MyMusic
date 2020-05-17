import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from '../../globals/ThemeProvider';
import MyAppText from '../../commons/MyAppText';
import GradientText from '../../commons/GradientText';
import MaskedView from '@react-native-community/masked-view';
import ViewGradient from '../../commons/ViewGradient';
import FontelloIcon from '../../commons/FontelloIcon';
import SongDetails from './SongDetails';
import { connect } from 'react-redux';

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

const LyricsScreen = ({ currentTheme, currentTrack, ...props }) => {


    return (
        <View style={[styles.parent, { backgroundColor: currentTheme.background }]}>
            <SongDetails
                name={currentTrack ? currentTrack.title : undefined}
                artist={currentTrack ? currentTrack.artist : undefined}
            />
            <MyAppText
                style={{
                    flex: 1,
                    textAlign: "center"
                }}
                // numberOfLines={100}
                variant={"semiBold"}
            >
                Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Eaque quisquam mollitia quis ab et,
                provident inventore ex voluptatum at ratione ducimus
                possimus qui tenetur eius quam fugiat. Officia, sapiente consequatur?
            </MyAppText>
        </View>
    );
};

function mapStateToProps(state) {
    return {
        currentTrack: state.player.currentTrack,
    };
}

export default connect(mapStateToProps)(withTheme(LyricsScreen));