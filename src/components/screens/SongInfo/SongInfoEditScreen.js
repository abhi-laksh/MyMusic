import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { withTheme } from '../../globals/ThemeProvider';
import MyAppText from '../../commons/MyAppText';
import ViewGradient from '../../commons/ViewGradient';
import InfoRow from './InfoRow';
import { TextInput } from 'react-native-gesture-handler';
import Input from '../../commons/Input';
import { formatTime } from '../../../constants/utils';
import Button from '../../commons/Button';
import { modifyMetadata } from '../../../actions/tracks';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    parent: {
        // flex: 1,
        padding: 16,
        // paddingBottom: 0,
    },
    fullFlex: {
        flex: 1,
    },
    autoHeight: {
        height: "auto"
    },
});

const SongInfoEditScreen = ({ currentTheme, modifyMetadata, theme, route, navigation, ...props }) => {
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

    const handleSubmit = () => {
        const id = track && track.id;
        modifyMetadata(id, values);
        navigation.navigate("Home");
    }

    const duration = formatTime(track.duration);



    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: currentTheme.background,
            }}
            contentContainerStyle={styles.parent}
        >
            <MyAppText
                size={13}
                // variant={"semiBold"}
                color={theme.pallete.error.main}
                parentStyle={{
                    marginBottom: 16,
                    paddingHorizontal: 0,
                }}
            >
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>Note :</Text> The changes will be reflected <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>in-app</Text> only. Original file will remain <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>unchanged</Text>.
            </MyAppText>
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
                    value={`${String(parseFloat(((track.size / 1024)) / 1024).toFixed(2))} MB`}
                    returnKeyType={"done"}
                    multiline
                    disabled
                    readOnly
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
                    value={`${duration.mm} : ${duration.ss}`}
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
            <ViewGradient
                gradientStyle={{
                    borderRadius: 36,
                    width: "60%",
                    marginTop: 24,
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                viewStyle={{
                    padding: 0,
                    borderRadius: 36,
                    overflow: "hidden",
                }}
            // onlyBorder
            >
                <Button
                    style={{
                        height: 36,
                    }}
                    onPress={handleSubmit}
                    // activeOpacity={0.7}
                    underlayColor={"rgba(255,255,255,0.08)"}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
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
                            color={"#fff"}
                        >
                            Save
                        </MyAppText>
                    </View>
                </Button>
            </ViewGradient>
        </ScrollView>
    );
};


function mapDispatchToProps(dispatch) {
    return {
        modifyMetadata: (trackId, newTrackInfo) => dispatch(modifyMetadata(trackId, newTrackInfo)),
        removeFromQueue: (trackId) => dispatch(removeFromQueue(trackId)),
    }
}


export default connect(null, mapDispatchToProps)(withTheme(SongInfoEditScreen));

/*
        <View style={[styles.parent, { backgroundColor: currentTheme.background }]}>


*/