import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from '../../globals/ThemeProvider';
import MyAppText from '../../commons/MyAppText';

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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

const LyricsEditScreen = ({ currentTheme, ...props }) => {
    return (
        <View style={[styles.parent, { backgroundColor: currentTheme.background }]}>
            <MyAppText style={{
                textAlign:"center"
            }}>
                LyricsEditScreen
            </MyAppText>
        </View>
    );
};

export default withTheme(LyricsEditScreen);