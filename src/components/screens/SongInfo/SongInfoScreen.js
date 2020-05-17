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

const SongInfoScreen = ({ currentTheme, theme, route, ...props }) => {

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
                    value={track.title}
                    // onChangeText={handleInput("title")}
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
                    // autoFocus={true}
                    // placeholder={"Enter Playlist Name"}
                    value={track.album}
                    // onChangeText={handleInput("title")}
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
                    // autoFocus={true}
                    // placeholder={"Enter Playlist Name"}
                    value={track.artist}
                    // onChangeText={handleInput("title")}
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
                    // autoFocus={true}
                    // placeholder={"Enter Playlist Name"}
                    value={String(track.size)}
                    // onChangeText={handleInput("title")}
                    returnKeyType={"done"}
                    readOnly
                    multiline
                // disabled

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
                    // autoFocus={true}
                    // placeholder={"Enter Playlist Name"}
                    value={track.dirPath}
                    // onChangeText={handleInput("title")}
                    returnKeyType={"done"}
                    // disabled
                    readOnly
                    multiline
                />
            </InfoRow>
        </View>
    );
};

export default withTheme(SongInfoScreen);
/*

                <MyAppText
                    parentStyle={{
                        // paddingVertical: 10,
                        // paddingHorizontal: 0,
                        // backgroundColor: "#666",
                        // flex: 0,
                    }}
                    style={{
                        flex: 0,
                        textTransform: "capitalize",
                    }}
                    size={16}
                >
                    Song Name
                </MyAppText>
*/