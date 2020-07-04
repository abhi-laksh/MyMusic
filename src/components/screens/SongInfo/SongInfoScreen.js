import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { withTheme } from '../../globals/ThemeProvider';
import MyAppText from '../../commons/MyAppText';
import ViewGradient from '../../commons/ViewGradient';
import InfoRow from './InfoRow';
import { TextInput } from 'react-native-gesture-handler';
import Input from '../../commons/Input';
import { formatTime } from '../../../constants/utils';

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        padding: 16,
        paddingBottom: 0,
    },
    fullFlex: {
        flex: 1,
    },
    autoHeight: {
        height: "auto"
    },
});

const SongInfoScreen = ({ currentTheme, theme, route, navigation, ...props }) => {

    const contrast = currentTheme.name === "dark" ?
        theme.lightenDarken(0.5, theme.hexToRGB(currentTheme.background))
        : theme.lightenDarken(0.2, theme.hexToRGB(currentTheme.text.primary));

    const { params } = route;

    const track = (params && params.track) || ({
        title: "",
        album: "",
        artist: "",
        size: "",
        path: "",
    });

    // Manually go back as nested stack doesnt remember Drawer Nav Item
    const goBackHome = () => {
        // console.log();
        // console.log("NAV", navigation, navigation.state, (navigation.state && navigation.state.key));
        // console.log();
        navigation.navigate("Home")
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", goBackHome);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", goBackHome);
        }
    })

    const duration = formatTime(track.duration);

    return (
        <View style={[styles.parent, { backgroundColor: currentTheme.background }]}>
            <InfoRow
                contrast={contrast}
                currentTheme={currentTheme}
                label={"Title"}
            >
                <Input
                    gradientStyle={styles.fullFlex}
                    viewStyle={styles.autoHeight}
                    selectTextOnFocus={true}
                    value={track.title}
                    returnKeyType={"done"}
                    readOnly
                    multiline

                />
            </InfoRow>
            <InfoRow
                contrast={contrast}
                currentTheme={currentTheme}
                label={"album"}
            >
                <Input
                    gradientStyle={styles.fullFlex}
                    viewStyle={styles.autoHeight}
                    selectTextOnFocus={true}
                    value={track.album}
                    returnKeyType={"done"}
                    readOnly
                    multiline

                />
            </InfoRow>
            <InfoRow
                contrast={contrast}
                currentTheme={currentTheme}
                label={"artist"}
            >
                <Input
                    gradientStyle={styles.fullFlex}
                    viewStyle={styles.autoHeight}
                    selectTextOnFocus={true}
                    value={track.artist}
                    returnKeyType={"done"}
                    readOnly
                    multiline

                />
            </InfoRow>
            <InfoRow
                contrast={contrast}
                currentTheme={currentTheme}
                label={"size"}
            >
                <Input
                    gradientStyle={styles.fullFlex}
                    viewStyle={styles.autoHeight}
                    selectTextOnFocus={true}
                    value={`${String(parseFloat(((track.size / 1024)) / 1024).toFixed(2))} MB`}
                    returnKeyType={"done"}
                    readOnly
                    multiline
                />
            </InfoRow>
            <InfoRow
                contrast={contrast}
                currentTheme={currentTheme}
                label={"duration"}
            >
                <Input
                    gradientStyle={styles.fullFlex}
                    viewStyle={styles.autoHeight}
                    selectTextOnFocus={true}
                    value={`${duration.mm} : ${duration.ss}`}
                    returnKeyType={"done"}
                    readOnly
                    multiline
                />
            </InfoRow>
            <InfoRow
                contrast={contrast}
                currentTheme={currentTheme}
                label={"path"}
            >
                <Input
                    gradientStyle={styles.fullFlex}
                    viewStyle={styles.autoHeight}
                    selectTextOnFocus={true}
                    value={track.dirPath}
                    returnKeyType={"done"}
                    readOnly
                    multiline
                />
            </InfoRow>
        </View>
    );
};

export default withTheme(SongInfoScreen);