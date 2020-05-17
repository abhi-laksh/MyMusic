import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from '../../globals/ThemeProvider';
import MyAppText from '../../commons/MyAppText';
import ViewGradient from '../../commons/ViewGradient';
import InfoRow from './InfoRow';
import { TextInput } from 'react-native-gesture-handler';
import Input from '../../commons/Input';

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

const SongInfoEditScreen = ({ currentTheme, theme, route, ...props }) => {
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
    const [values, setValues] = useState({
        title: track.title,
        album: track.album,
        artist: track.artist,
        size: track.size,
        path: track.dirPath,
    })
    const handleInput = (name) => (value) => {
        setValues({ ...values, [name]: value });
    }

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
                    // autoFocus={true}
                    // placeholder={"Enter Playlist Name"}
                    value={values.title}
                    onChangeText={handleInput("title")}
                    returnKeyType={"done"}
                    multiline
                    blurOnSubmit

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
                    // autoFocus={true}
                    // placeholder={"Enter Playlist Name"}
                    value={values.album}
                    onChangeText={handleInput("album")}
                    returnKeyType={"done"}
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
                    placeholder={"Enter Artist"}
                    value={values.artist}
                    onChangeText={handleInput("artist")}
                    returnKeyType={"done"}
                    multiline
                    blurOnSubmit
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
                    value={String(values.size)}
                    returnKeyType={"done"}
                    multiline
                    disabled
                    readOnly
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
                    value={values.path}
                    disabled
                    readOnly
                    multiline
                />
            </InfoRow>
        </View>
    );
};

export default withTheme(SongInfoEditScreen);