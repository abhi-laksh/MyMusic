import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from '../../globals/ThemeProvider';
import MyAppText from '../../commons/MyAppText';
import ThemeToggler from '../../commons/ThemeToggler';

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

const SettingScreen = ({ currentTheme, ...props }) => {
    return (
        <View style={[styles.parent, { backgroundColor: currentTheme.background }]}>
            <MyAppText style={{
                textAlign: "center"
            }}>
                SettingScreen
            </MyAppText>
            <ThemeToggler />
        </View>
    );
};

export default withTheme(SettingScreen);